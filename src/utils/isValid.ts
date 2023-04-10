import { Node, linkedListToString, stringToLinkedList } from "./linkedList";
import {
  del,
  insert,
  isDeleteOperation,
  isInsertOperation,
  isOperationalTransformations,
  isSkipOperation,
  skip,
} from "./operationalTransformations";

export function isValid(stale: string, latest: string, otjson: string) {
  try {
    const operations = JSON.parse(otjson);

    if (!isOperationalTransformations(operations)) {
      return false;
    }

    const century = new Node("");
    let next = century;
    next.next = stringToLinkedList(stale);
    next = next.next;

    for (let operation of operations) {
      if (isSkipOperation(operation)) {
        next = skip(next, operation.count);
      } else if (isInsertOperation(operation)) {
        next = insert(next, operation.chars);
      } else if (isDeleteOperation(operation)) {
        next = del(next, operation.count);
      }
    }

    if (century.next === null && latest.length !== 0) {
      return false;
    }

    return century.next?.toString() === latest;
  } catch (error) {
    return false;
  }
}
