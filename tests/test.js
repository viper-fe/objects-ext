const { CountableSet, TrendingArray } = require("../dist/libs");

test("CountableSet/create", () => {
  let cs = new CountableSet();
  expect(cs.size()).toBe(0);
});

test("CountableSet/add", () => {
  let cs = new CountableSet();
  cs.add("abcd");
  expect(cs.size()).toBe(1);
});

test("CountableSet/add2", () => {
  let cs = new CountableSet();
  cs.add("abcd");
  cs.add("abcd");
  expect(cs.size()).toBe(1);
});

test("CountableSet/add3", () => {
  let cs = new CountableSet();
  cs.add("abcd");
  cs.add("abcd");
  cs.add("abcde");
  expect(cs.size()).toBe(2);
});

test("CountableSet/add4", () => {
  let cs = new CountableSet((e, i) => e == i);
  cs.add("abcd");
  cs.add("abcd");
  cs.add("abcde");
  expect(cs.size()).toBe(2);
});

test("CountableSet/add5", () => {
  let cs = new CountableSet((e, i) => e.id == i.id);
  cs.add({ id: 1, name: "abcd" });
  cs.add({ id: 1, name: "abcde" });
  cs.add({ id: 1, name: "abcdf" });
  expect(cs.size()).toBe(1);
});

test("CountableSet/remove", () => {
  let cs = new CountableSet();
  cs.add("abcd");
  cs.add("abcd");
  cs.add("abcde");
  cs.remove("abcde");
  expect(cs.size()).toBe(1);
});

test("CountableSet/remove2", () => {
  let cs = new CountableSet();
  cs.add("abcd");
  cs.add("abcd");
  cs.add("abcde");
  cs.remove("abcd");
  expect(cs.size()).toBe(2);
});

test("CountableSet/remove3", () => {
  let cs = new CountableSet();
  cs.add("abcd");
  cs.add("abcd");
  cs.add("abcde");
  cs.remove("csrs");
  expect(cs.size()).toBe(2);
});

test("CountableSet/toString", () => {
  let cs = new CountableSet();
  cs.add("abcd");
  cs.add("abcd");
  cs.add("abcde");
  let array = [];
  array.push({ v: "abcd", c: 2 });
  array.push({ v: "abcde", c: 1 });
  let left = cs.toString();
  let arr = [];
  for (let i of array) {
    arr.push({ count: i.c, value: i.v });
  }
  let right = JSON.stringify(arr, null, 2);
  expect(left).toBe(right);
});

test("CountableSet/sortByCount", () => {
  let cs = new CountableSet();
  cs.add("abcd");
  cs.add("abcd");
  cs.add("abcde");
  cs.sortByCount();
  let array = [];
  array.push({ v: "abcd", c: 2 });
  array.push({ v: "abcde", c: 1 });
  const left = cs.first();
  const right = array[0];
  expect(left).toEqual(right);
});

test("CountableSet/toTable", () => {
  let cs = new CountableSet();
  cs.add("abcd");
  cs.add("abcd");
  cs.add("abcde");
  cs.sortByCount();
  let array = [];
  array.push({ v: "abcd", c: 2 });
  array.push({ v: "abcde", c: 1 });
  let arr = [];
  for (let i of array) {
    arr.push({ count: i.c, value: i.v });
  }
  expect(cs.toTable()).toEqual(arr);
});

test("CountableSet/toTable2", () => {
  let cs = new CountableSet((element, newElement) => {
    return element.v == newElement.v;
  });
  cs.add({ v: "abcd" });
  cs.add({ v: "abcd" });
  cs.add({ v: "abcde" });
  cs.sortByCount();
  let array = [];
  array.push({ v: "abcd", c: 2 });
  array.push({ v: "abcde", c: 1 });
  let arr = [];
  for (let i of array) {
    arr.push({ count: i.c, value: i.v });
  }
  const ex = cs.toTable((value) => {
    return { value: value.v };
  });
  expect(ex).toEqual(arr);
});

test("CountableSet/count1", () => {
  let cs = new CountableSet((e, i) => e.id == i.id);
  cs.add({ id: 1, name: "abcd" });
  cs.add({ id: 1, name: "abcde" });
  cs.add({ id: 1, name: "abcdf" });
  expect(cs.count()).toBe(3);
});

test("CountableSet/count2", () => {
  let cs = new CountableSet((e, i) => e.id == i.id);
  cs.add({ id: 1, name: "abcde" });
  cs.add({ id: 1, name: "abcde" });
  cs.add({ id: 1, name: "abcde" });
  expect(cs.count()).toBe(3);
});

// test("TrendingArray/toTable", () => {
//   const _predicate = (e, i) => e.id == i.id;
//   let cs1 = new CountableSet(_predicate);
//   cs1.add({ id: 1, name: "abcde" });
//   cs1.add({ id: 1, name: "abcde" });
//   cs1.add({ id: 2, name: "abcde1" });

//   let cs2 = new CountableSet(_predicate);
//   cs2.add({ id: 1, name: "abcde" });
//   cs2.add({ id: 2, name: "abcde1" });
//   cs2.add({ id: 2, name: "abcde1" });

//   let cs3 = new CountableSet(_predicate);
//   cs3.add({ id: 2, name: "abcde1" });
//   cs3.add({ id: 2, name: "abcde1" });
//   cs3.add({ id: 2, name: "abcde1" });

//   let ta = new TrendingArray([cs1, cs2, cs3], _predicate);
//   console.table(
//     ta.toTable((value) => {
//       return { ...value };
//     })
//   );
//   // expect(cs.count()).toBe(3);
// });
