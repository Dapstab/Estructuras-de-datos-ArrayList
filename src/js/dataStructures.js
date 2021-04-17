export class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

export class SinglyLinkedList {
  constructor() {
    this.length = 0;
    this.head = null;
    this.tail = null;
  }

  pushBack(value) {
    const newNode = new Node(value);
    if (this.length > 0) {
      this.tail.next = newNode;
    } else {
      this.head = newNode;
    }
    this.tail = newNode;
    this.length += 1;
    return newNode;
  }

  get(index) {
    if (index < 0 || index >= this.length) {
      return null;
    } else {
      let currentNode = this.head;
      let count = 0;

      while (count < index) {
        currentNode = currentNode.next;
        count += 1;
      }

      return currentNode;
    }
  }
}

export default new SinglyLinkedList();
console.log("hola");