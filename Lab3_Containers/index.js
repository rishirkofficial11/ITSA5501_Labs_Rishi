function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error('Division by zero is not allowed.');
  }
  return a / b;
}

console.log(`Addition of 14 and 8 is : ${add(14, 8)}`);
console.log(`Subtraction of 10 and 7 is : ${subtract(10, 7)}`);
console.log(`Multiplication of 4 and 6 is : ${multiply(4, 6)}`);
console.log(`Division of 20 and 4 is : ${divide(20, 4)}`);

// Export functions for testing
module.exports = { add, subtract, multiply, divide };