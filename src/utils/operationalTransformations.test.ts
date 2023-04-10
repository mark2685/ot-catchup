import { describe, expect, test } from "@jest/globals";
import { Node, stringToLinkedList } from "./linkedList";
import {
  del,
  insert,
  isOperationalTransformations,
  skip,
} from "./operationalTransformations";

describe("operational transformations", () => {
  test("isOperationalTransformations", () => {
    expect(
      isOperationalTransformations([
        {
          op: "skip",
          count: 40,
        },
        {
          op: "delete",
          count: 40,
        },
        {
          op: "insert",
          chars: "test",
        },
      ])
    ).toBe(true);

    expect(
      isOperationalTransformations([
        {
          op: "skip",
          count: 40,
        },
        {
          op: "delete",
          count: 40,
        },
        {
          // @ts-expect-error
          op: "foo",
          chars: "test",
        },
      ])
    ).toBe(false);
  });

  describe("insert", () => {
    test("insert to empty string", () => {
      const list = new Node<string>("");

      const cursor = insert(list, "Hello, human!");

      expect(list.toString()).toEqual("Hello, human!");
      expect(cursor.value).toEqual("!");
    });

    test("insert into string", () => {
      const list = stringToLinkedList("Hello, human!");

      let cursor = list;

      while (cursor.value !== "," && cursor.next !== null) {
        cursor = cursor.next;
      }

      cursor = insert(cursor, " silly");

      expect(list.toString()).toEqual("Hello, silly human!");
      expect(cursor.value).toEqual("y");
    });
  });

  describe("del", () => {
    test("delete from list", () => {
      const list = stringToLinkedList("Hello, human!");

      const cursor = del(list, 7);

      expect(list.toString()).toEqual("Human!");
      expect(cursor.value).toEqual("u");
    });
  });

  describe("skip", () => {
    test("moves the cursor", () => {
      const list = stringToLinkedList("Hello, human!");

      const cursor = skip(list, 5);

      expect(cursor.value).toEqual("o");
    });
  });
});
