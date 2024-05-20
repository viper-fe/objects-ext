class CountableSet {
  array = [];
  constructor() {}
  size() {
    return this.array.length;
  }
  add(item) {
    let found = this.array.find((e) => e.v == item);
    if (found) {
      found.c = found.c + 1;
    } else {
      this.array.push({
        v: item,
        c: 1,
      });
    }
  }
  remove(item) {
    let found = this.array.find((e) => e.v == item);
    if (found) {
      found.c = found.c - 1;
      if (found.c == 0) {
        this.array.splice(this.array.indexOf(found), 1);
      }
    } else {
      console.warn(`${item} 不存在`);
    }
  }
  toString() {
    return this.array.toString();
  }
}

export default {
  CountableSet,
};
