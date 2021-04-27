import { recipes } from "../data";

export class ArrayList {
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

  pop() {
    try {
      if (this.isEmpty()) throw new Error("The list is empty");
      this.size--;
      return this.list;
    } catch (err) {
      console.error(err);
    }
  }

  insert(index, value) {
    try {
      if (this.isFull()) throw new Error("The list is full");
      if (index < 0 || index > this.capacity)
        throw new Error("Index out of bounds");

      for (let i = this.size; i > index; i--) {
        this.list[i] = this.list[i - 1];
      }
      this.size++;
      this.list[index] = value;
    } catch (err) {
      console.error(err);
    }
  }

  pushBack(value) {
    try {
      if (this.isFull()) this.capacity++;
      this.list[this.size] = value;
      this.size++;
    } catch (err) {
      console.error(err);
    }
  }

  remove(index) {
    try {
      if (this.isEmpty()) throw new Error("The list is empty");
      if (index < 0 || index >= this.size)
        throw new Error("Index out of bounds");
      this.size--;
      for (let i = index; i < this.size; i++) {
        this.list[i] = this.list[i + 1];
      }
      return this.list;
    } catch (err) {
      console.error(err);
    }
  }

  find(value) {
    try {
      if (this.isEmpty()) throw new Error("List is empty");
      let count = 0;
      while (count < this.size) {
        if (this.list[count].id === value) {
          return this.list[count];
        }
        count++;
      }
      console.log("There is no value in the list");
      return;
    } catch (err) {
      console.error(err);
    }
  }

  slice(start, end = this.size) {
    try {
      if (start > end)
        throw new Error("Start index must be lower than end index");
      if (start < 0 || start > this.size || end < 0)
        throw new Error("Indexes out of bounds");
      if (end > this.size) end = this.size;
      const newArrayList = new ArrayList(end - start);
      for (let i = start; i < end; i++) {
        newArrayList.pushBack(this.list[i]);
      }
      return newArrayList.list;
    } catch (err) {
      console.error(err);
    }
  }

  map(handler) {
    const newArrayList = new ArrayList(this.size);
    for (let i = 0; i < this.size; i++) {
      newArrayList.pushBack(handler(this.list[i]));
    }
    return newArrayList.list;
  }

  some(condition) {
    try {
      if (this.isEmpty()) throw new Error("The list is empty");
      for (let i = 0; i < this.size; i++) {
        if (condition(this.list[i])) return true;
      }
      return false;
    } catch (err) {
      console.log(err);
    }
  }

  findIndex(handler) {
    let index = 0;
    while (index < this.size) {
      if (handler(this.list[index])) return index;
      index++;
    }
    return -1;
  }

  findAll(value) {
    let newArrayList = new ArrayList(0);
    let count = 0;
    while (count < this.size) {
      if (this.list[count].title === value) {
        newArrayList.capacity++;
        newArrayList.pushBack(this.list[count]);
      }
      count++;
    }
    return newArrayList.list;
  }
}

// PROBANDO LAS ARRAYLISTS

export const recipesAl = new ArrayList(0);
recipes.forEach((rec) => recipesAl.pushBack(rec));

export const results = new ArrayList(0);

// const list = new ArrayList(10);
// list.pushBack(1);
// list.pushBack(2);
// list.pushBack(3);
// list.pushBack(4);
// list.pushBack(5);
// list.pushBack(6);
// list.pushBack(6);
// list.pushBack(6);
// list.pushBack(6);
// list.pushBack(6);
// list.pushBack(6);
// console.log(list.size); 6
// list.pushBack(7); The list is full
// console.log(list.some((el) => el === 6)); true
// console.log(list.map((e) => e * 2)); // [2, 4, 6, 8, 10, 12]
// console.log(list.slice(0, 2));
// console.log(list.findIndex((el) => el === 6)); // 5
// console.log(list.remove(0)); [2, 3, 4, 5, 6, 6]
// console.log(list.size); 5
// console.log(list.find(5)); // 5
// console.log(list.findAll(6)); // [6, 6, 6, 6, 6]

// const arr = [1, 2, 3, 4, 5, 6];
// console.log(arr.slice(0, 2));
