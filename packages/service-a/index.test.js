const assert = require('assert');
const { getUserStatus } = require('./index');

assert.strictEqual(getUserStatus().status, 'active');
console.log('Service A tests passed!');
