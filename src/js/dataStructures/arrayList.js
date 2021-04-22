import recipes from "../data.js";

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

  push(value) {
    try {
      if (this.isFull()) throw new Error("The list is full");
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
        if (this.list[count] === value) {
          return this.list[count];
        } else count++;
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
        newArrayList.push(this.list[i]);
      }
      return newArrayList.list;
    } catch (err) {
      console.error(err);
    }
  }

  map(handler) {
    const newArrayList = new ArrayList(this.size);
    for (let i = 0; i < this.size; i++) {
      newArrayList.push(handler(this.list[i]));
    }
    console.log(newArrayList);
    return newArrayList;
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
}

// PROBANDO LAS ARRAYLISTS
// const list = new ArrayList(6);
// list.push(1);
// list.push(2);
// list.push(3);
// list.push(4);
// list.push(5);
// list.push(6);
// console.log(list.some((el) => el === 7));
// list.map((e) => e * 2);

// const arr = [1, 2, 3, 4, 5, 6];
// console.log(arr.slice(0, 2));
