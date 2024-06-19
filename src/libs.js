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
  toRawArray() {
    return this._array;
  }
}

class TrendingArray {
  _array;
  _predicate = null;
  constructor(array, predicate) {
    this._array = array;
    this._predicate = predicate;
    if (!this._predicate) {
      throw Error("must set _predicate");
    }
  }

  toTable(spliter) {
    let arr = [];
    let tableIndex = 0;
    for (let item of this._array) {
      tableIndex = tableIndex + 1;
      let key = `c${tableIndex}`;
      let _array = item.toRawArray(); // 得到的已经是去重的数据了
      for (let _item of _array) {
        //多个数组中的去重数据再去重
        let found = arr.find((e) => {
          return this._predicate(e, _item.v);
        });
        if (found) {
          found[key] = _item.c;
        } else {
          let _obj = {};
          if (spliter) {
            _obj = Object.assign({}, _obj, spliter(_item.v));
          } else {
            _obj = Object.assign({}, _obj, {
              value: _item.v,
            });
          }
          _obj[key] = _item.c;
          arr.push(_obj);
        }
      }
    }
    return arr;
  }
}

export default {
  CountableSet,
  TrendingArray,
};
