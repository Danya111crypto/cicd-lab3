const assert = require('assert');
const { calculateTotal } = require('./index');

assert.strictEqual(calculateTotal(100, 20), 120);
console.log('Service B tests passed!');
