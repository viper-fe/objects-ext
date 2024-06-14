class CountableSet {
  _array = [];
  _predicate = null;
  _count = 0;
  constructor(predicate) {
    this._predicate = predicate;
  }
  size() {
    return this._array.length;
  }
  count() {
    return this._count;
  }
  add(item) {
    let found = this._array.find((e) => {
      if (this._predicate) {
        return this._predicate(e.v, item);
      }
      return e.v == item;
    });
    this._count = this._count + 1;
    if (found) {
      found.c = found.c + 1;
    } else {
      this._array.push({
        v: item,
        c: 1,
      });
    }
  }
  remove(item) {
    let found = this._array.find((e) => {
      if (this._predicate) {
        return this._predicate(e.v, item);
      }
      return e.v == item;
    });
    if (found) {
      found.c = found.c - 1;
      if (found.c == 0) {
        this._array.splice(this._array.indexOf(found), 1);
      }
      this.count = this.count - 1;
    } else {
      console.warn(`${item} 不存在`);
    }
  }
  sortByCount() {
    this._array.sort((a, b) => {
      return b.c - a.c;
    });
  }
  first() {
    return this._array.at(0);
  }
  toString() {
    let arr = [];
    for (let i of this._array) {
      arr.push({ count: i.c, value: i.v });
    }
    return JSON.stringify(arr, null, 2);
  }
  toTable(spliter) {
    let arr = [];
    for (let i of this._array) {
      let item = { count: i.c };
      if (spliter) {
        item = Object.assign({}, item, spliter(i.v));
      } else {
        item = Object.assign({}, item, {
          value: i.v,
        });
      }
      arr.push(item);
    }
    return arr;
  }
}

export default {
  CountableSet,
};
