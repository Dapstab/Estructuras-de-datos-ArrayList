import { recipes } from "../data.js";

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
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
    try {
      if (index < 0 || index >= this.length)
        throw new Error("Index out of bounds");

      let currentNode = this.head;
      let count = 0;

      while (count < index) {
        currentNode = currentNode.next;
        count += 1;
      }

      return currentNode;
    } catch (err) {
      console.error(err);
    }
  }

  some(condition) {
    try {
      if (!this.length) throw new Error("The list is empty");
      let currentNode = this.head;
      let count = 0;
      while (count < this.length) {
        if (condition(currentNode.value)) return true;
        currentNode = currentNode.next;
        count++;
      }
      return false;
    } catch (err) {
      console.log(err); // No es para tanto como para poner la consola en rojo, ya que siempre va a estar en un inicio bookmarks vacio.
    }
  }

  find(value) {
    let currentNode = this.head; // El objeto instanciado que proviene del model.js
    while (value !== currentNode.value.id) {
      currentNode = currentNode.next;
    }
    return currentNode;
  }

  //   findAll(value) {
  //     let recipes = [];
  //     let currentNode = this.head;
  //     while (currentNode !== this.tail) {
  //       if (currentNode.value.title === value) {
  //         recipes.push(currentNode.value);
  //       }
  //       currentNode = currentNode.next;
  //     }
  //     console.log("hola");
  //     return recipes;
  //   }

  findAll(value) {
    let newLinkedList = new SinglyLinkedList();
    let currentNode = this.head;
    let count = 0;
    while (count < this.length) {
      if (currentNode.value.title === value) {
        newLinkedList.pushBack(currentNode.value);
      }
      currentNode = currentNode.next;
      count++;
    }
    return newLinkedList;
  }

  removeBeggining() {
    try {
      if (!this.length) throw new Error("The list is empty");
      this.head = this.head.next;
      this.length--;
      if (!this.tail) this.tail = null; // Actualizamos la cola si la lista llega a quedar vacia.
      return this;
    } catch (err) {
      console.error(err);
    }
  }

  map(handler) {
    let count = 0;
    let newLinkedList = new SinglyLinkedList();
    let currentNode = this.head;
    while (count < this.length) {
      newLinkedList.pushBack(handler(currentNode.value));
      currentNode = currentNode.next;
      count++;
    }
    return newLinkedList;
  }

  slice(start, end = this.length) {
    try {
      if (start > end)
        throw new Error("Start index must be lower than end index");
      if (start < 0 || start > this.length || end < 0)
        throw new Error("Indexes out of bounds");
      if (end > this.length) end = this.length;
      let newLinkedList = new SinglyLinkedList();
      let currentNode = this.head;
      let count = 1;
      while (count < start) {
        currentNode = currentNode.next;
        count++;
      }
      count = 0;
      newLinkedList.head = currentNode;
      while (count < end - start) {
        newLinkedList.pushBack(currentNode.value);
        currentNode = currentNode.next;
        count++;
      }
      return newLinkedList;
    } catch (err) {
      console.error(err);
    }
  }
  findIndex(handler) {
    let index = 0;
    let currentNode = this.head;
    while (index < this.length) {
      if (handler(currentNode.value)) return index;
      currentNode = currentNode.next;
      index++;
    }
    return -1;
  }

  pop() {
    // Recordar que para una single linked list tanto pop como remove son O(n) debido a que no tienen un puntero al nodo anterior.
    try {
      if (!this.length) throw new Error("The list is empty");

      let currentNode = this.head;
      // secondToLastNode es el penultimo nodo cuyo .next va a ser null y se va a convertir en la nueva cola.
      let secondToLastNode = this.head;
      let count = 0;
      while (count < this.length) {
        secondToLastNode = currentNode; // Primero asiganmos
        currentNode = currentNode.next; // Despues nos vamos al siguiente nodo, no puede ser al contrario. Con esto nos aseguramos que secondToLastNode va a ser el penultimo nodo.
        count++;
      }
      secondToLastNode.next = null;
      this.tail = secondToLastNode;
      this.length--;
      if (!this.length) {
        this.head = null;
        this.tail = null;
      }
      return this;
    } catch (err) {
      console.error(err);
    }
  }

  remove(index) {
    // console.log(this, "INICIO"); Sucede algo raro y es que pareciera que ejecuta el pop al momento de llamar esta linea aun asi el length se mantiene en 6. Pasa cuando llamamos a index = this.length - 1
    try {
      if (index < 0 || index >= this.length)
        throw new Error("Index out of bounds");
      if (index === this.length - 1) return this.pop();

      if (index === 0) return this.removeBeggining();

      const prevNodeToRemove = this.get(index - 1);
      const nodeToRemove = prevNodeToRemove.next;

      prevNodeToRemove.next = nodeToRemove.next;
      this.length--;
      console.log(this, "FINAL");
      return this;
    } catch (err) {
      console.error(err);
    }
  }
}

export const recipesLl = new SinglyLinkedList();
recipes.forEach((rec) => recipesLl.pushBack(rec));

export const results = new SinglyLinkedList();

export const bookmarks = new SinglyLinkedList();

// PROBANDO LAS SINGLYLINKEDLIST
// results.pushBack(1);
// results.pushBack(2);
// results.pushBack(3);
// results.pushBack(4);
// results.pushBack(5);
// results.pushBack(6);

// console.log(results.pop(), "POP");
// console.log(results.remove(0));
// console.log(results.pop() === results.remove(5));

// console.log(results.some((el) => el === 7)); // el ya es el.value????
// console.log(results);
// console.log(results.map((el) => el * 2)); // el ya es el.value????
// console.log(results.slice(2, 20));

// console.log(recipesLl);
// recipesLl.slice(2, 5);
// const filter = recipesLl.findAll("pizza");
// console.log(filter);
// console.log(filter.map((el) => console.log(el)));
