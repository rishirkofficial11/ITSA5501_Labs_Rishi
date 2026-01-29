const assert = require('assert');
const { add, subtract, multiply, divide } = require('./index');

// Test for add function
assert.strictEqual(add(2, 3), 5, 'Addition of 2 and 3 should be 5');
assert.strictEqual(add(-1, 1), 0, 'Addition of -1 and 1 should be 0');
assert.strictEqual(add(0, 0), 0, 'Addition of 0 and 0 should be 0');

// Test for subtract function
assert.strictEqual(subtract(5, 3), 2, 'Subtraction of 3 from 5 should be 2');
assert.strictEqual(subtract(0, 0), 0, 'Subtraction of 0 from 0 should be 0');
assert.strictEqual(subtract(-1, -1), 0, 'Subtraction of -1 from -1 should be 0');

// Test for multiply function
assert.strictEqual(multiply(4, 5), 20, 'Multiplication of 4 and 5 should be 20');
assert.strictEqual(multiply(-1, 1), -1, 'Multiplication of -1 and 1 should be -1');
assert.strictEqual(multiply(0, 100), 0, 'Multiplication of 0 and 100 should be 0');

// Test for divide function
assert.strictEqual(divide(10, 2), 5, 'Division of 10 by 2 should be 5');
assert.strictEqual(divide(-6, -2), 3, 'Division of -6 by -2 should be 3');
assert.throws(() => divide(5, 0), /Division by zero is not allowed./, 'Division by zero should throw an error');

console.log('All tests passed!');