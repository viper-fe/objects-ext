const { CountableSet } = require("../dist/libs");

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
  expect(cs.toString()).toBe(array.toString());
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
  expect(left).equal(right);
});
