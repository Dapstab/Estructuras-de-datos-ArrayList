import {recipes} from "./data.js";

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

// class ArrayJS {
//   constructor(length = 0) {
//     this.array = [];
//     this.length = length;
//   }

//   insert(index, value) {
//     try {
//       if (index >= this.length || index < 0)
//         throw new Error("Index out of bounds");
//       else this.array[index] = value;
//     } catch (err) {
//       console.error(err);
//     }
//   }
// }

class arrayList {
  constructor(capacity) {
    this.size = 0;
    this.capacity = capacity;
    this.list = []; // Lista
  }

  isFull() {
    return this.size === this.capacity;
  }

  isEmpty() {
    return this.size === 0;
  }

  addEnd(value) {
    try {
      if (this.isFull()) throw new Error("Max capacity");
      this.list[this.size] = value;
      this.size++;
    } catch (err) {
      console.error(err);
    }
  }

  removeEnd() {
    try {
      if (this.isEmpty()) throw new Error("The list is empty");
      this.size--;
    } catch (err) {
      console.error(err);
    }
  }

  insert(index, value) {
    try {
      if (this.isFull) throw new Error("The list is full");
      if (index < 0 || index > this.capacity)
        throw new Error("Index out of bounds");
      for (let i = index; i < this.size; i++) {}
      this.list[index] = value;
      this.size++;
    } catch (err) {
      console.error(err);
    }
  }
}
class SinglyLinkedList {
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

  find(value) {
    let currentNode = this.head; // El objeto instanciado que proviene del model.js
    while (value !== currentNode.value.id) {
      currentNode = currentNode.next;
    }
    return currentNode;
  }

  findAll(value) {
    let recipes = [];
    let currentNode = this.head;
    while (currentNode !== this.tail) {
      if (currentNode.value.title === value) {
        recipes.push(currentNode.value);
      }
      currentNode = currentNode.next;
    }
    console.log("hola");
    return recipes;
  }

  verify(value, node) {
    let currentNode = this.head; // this es bookmarks
    if (this.length !== 0) {
      return false;
    } else {
      while (currentNode !== this.tail) {
        if (currentNode.value.id === value) {
          return true;
        }
        currentNode = currentNode.next;
      }
    }
    return false;
  }
}
export class Stack {
  constructor() {
    this.Stack = [];
  }

  push(element) {
    this.stack.push(element);
    return this.stack;
  }

  pop() {
    return this.stack.pop();
  }

  peek() {
    return this.stack[this.stack.length - 1];
  }
  size() {
    return this.stack.length;
  }
  print() {
    console.log(this.stack);
  }
}

export const recipesLl = new SinglyLinkedList();
recipes.forEach((rec) => recipesLl.pushBack(rec));



export const bookmarks = new SinglyLinkedList();
