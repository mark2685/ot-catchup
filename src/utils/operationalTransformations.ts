import { Node, stringToLinkedList } from "./linkedList";

export interface SkipOperation {
  op: "skip";
  count: number;
}

export interface InsertOperation {
  op: "insert";
  chars: string;
}

export interface DeleteOperation {
  op: "delete";
  count: number;
}

export type OperationalTransformations = (
  | SkipOperation
  | InsertOperation
  | DeleteOperation
)[];

export const isSkipOperation = (
  operation: SkipOperation | InsertOperation | DeleteOperation
): operation is SkipOperation => {
  return (
    (operation as SkipOperation).op === "skip" &&
    typeof (operation as SkipOperation).count === "number"
  );
};

export const isInsertOperation = (
  operation: SkipOperation | InsertOperation | DeleteOperation
): operation is InsertOperation => {
  return (
    (operation as InsertOperation).op === "insert" &&
    typeof (operation as InsertOperation).chars === "string"
  );
};

export const isDeleteOperation = (
  operation: SkipOperation | InsertOperation | DeleteOperation
): operation is DeleteOperation => {
  return (
    (operation as DeleteOperation).op === "delete" &&
    typeof (operation as DeleteOperation).count === "number"
  );
};

export const isOperationalTransformations = (
  operations: OperationalTransformations
): operations is OperationalTransformations => {
  let isValid = true;

  for (let op of operations) {
    if (isSkipOperation(op)) {
      continue;
    }

    if (isInsertOperation(op)) {
      continue;
    }

    if (isDeleteOperation(op)) {
      continue;
    }

    return false;
  }

  return isValid;
};

export const skip = (list: Node<string>, count: number): Node<string> => {
  let next = list;

  for (let i = 1; i < count; i = i + 1) {
    if (next.next === null) {
      throw new Error("skip past end of line");
    }

    next = next.next;
  }

  return next;
};

export const del = (list: Node<string>, count: number): Node<string> => {
  // NOTE: Watch out: delete operations are applied forward while keeping the
  // cursor in place. Crazy, we know.
  if (count <= 0) {
    return list;
  }

  let next = list.next;

  if (next === null) {
    throw new Error("delete past end of line");
  }

  for (let i = 0; i < count; i = i + 1) {
    if (next.next === null) {
      throw new Error("delete past end of line");
    }

    next = next.next;
  }

  list.next = next;

  return next;
};

export const insert = (list: Node<string>, chars: string): Node<string> => {
  const charsList = stringToLinkedList(chars);

  let cursor = charsList;

  while (cursor.next !== null) {
    cursor = cursor.next;
  }

  const temp = list.next;
  let next = charsList;

  while (next !== null && next.next !== null) {
    next = next.next;
  }

  list.next = charsList;
  next.next = temp;

  return cursor;
};
