class CountableSet {
  array = [];
  predicate = null;
  constructor(predicate) {
    this.predicate = predicate;
  }
  size() {
    return this.array.length;
  }
  add(item) {
    let found = this.array.find((e) => {
      if (this.predicate) {
        return this.predicate(e.v, item);
      }
      return e.v == item;
    });
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
    let found = this.array.find((e) => {
      if (this.predicate) {
        return this.predicate(e.v, item);
      }
      return e.v == item;
    });
    if (found) {
      found.c = found.c - 1;
      if (found.c == 0) {
        this.array.splice(this.array.indexOf(found), 1);
      }
    } else {
      console.warn(`${item} 不存在`);
    }
  }
  sortByCount() {
    this.array.sort((a, b) => {
      return b.c - a.c;
    });
  }
  first() {
    return this.array.at(0);
  }
  toString() {
    let arr = [];
    for (let i of this.array) {
      arr.push({ count: i.c, value: i.v });
    }
    return JSON.stringify(arr, null, 2);
  }
}

export default {
  CountableSet,
};
