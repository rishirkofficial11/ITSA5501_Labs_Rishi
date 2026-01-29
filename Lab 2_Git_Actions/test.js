const assert = require('assert');
const { add, subtract, multiply } = require("./index.js");

assert.strictEqual(add(1, 2), 3, 'sum(1, 2) should be 3');
assert.strictEqual(subtract(2, 1), 1, 'subtract(2, 1) should be 1');
assert.strictEqual(multiply(2, 3), 6, 'multiply(2, 3) should be 6');
assert.strictEqual(add(-1, 1), 0, 'sum(-1, 1) should be 0');
assert.notStrictEqual(subtract(0, 0), 1, 'subtract(0, 0) should NOT be 1');
assert.strictEqual(multiply(-2, 3), -6, 'multiply(-2, 3) should be -6');

console.log("All tests passed.");
