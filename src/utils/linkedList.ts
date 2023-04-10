export class Node<T> {
  value: T;
  next: Node<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }

  toString(): string {
    const arr = [];

    if (this.value === null) {
      return "";
    }

    arr.push(this.value);

    let next = this.next;

    while (next !== null) {
      arr.push(next.value);
      next = next.next;
    }

    return arr.join("");
  }
}

export const stringToLinkedList = (str: string): Node<string> => {
  const century = new Node<string>("");
  let next = century;

  for (let char of str) {
    next.next = new Node<string>(char);
    next = next.next;
  }

  return century.next as Node<string>;
};

export const linkedListToString = (list: Node<string>): string => {
  const arr = [];

  let next: Node<string> | null = list;

  while (next !== null) {
    arr.push(next.value);
    next = next.next;
  }

  return arr.join("");
};
