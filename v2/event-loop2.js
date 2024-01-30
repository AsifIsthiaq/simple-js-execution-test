
console.log('Start of the script');
const fs = require('fs');
const { resolve } = require('path');
var path = require('path');

// Check Phase (setImmediate)
setImmediate(() => {
  console.log('setImmediate callback 1');
});

process.nextTick(() => {
  console.log('nextTick callback 1');
});

// Timers Phase
setTimeout(() => {
  console.log('Timer callback 1');
});
// Timers Phase
setTimeout(() => {
  console.log('Timer callback 1.1');
}, 0);

const promise = new Promise((resolve, reject) => {
  console.log("Creating Promise");
  setTimeout(() => {
    console.log("setTimeout inside promise")
    for (let i = 0; i <= 1000000000; i++) {
      if (i == 1000000000) resolve();
    }
  })
})

const promise2 = new Promise((resolve, reject) => {
  console.log("Creating Promise 2");
  resolve();
})

// I/O Callbacks Phase
fs.readFile(path.resolve(__dirname, 'event-loop.js'), 'utf8', (err, data) => {
  if (err) throw err;
  console.log('File read callback');
});

const promise3 = new Promise((resolve, reject) => {
  console.log("Creating Promise 3");
  // I/O Callbacks Phase
  fs.readFile(path.resolve(__dirname, 'event-loop.js'), 'utf8', (err, data) => {
    if (err) reject(err);
    console.log('File read callback inside promise');
    resolve();
  });
})

process.nextTick(() => {
  console.log('nextTick callback 2');
});

// Check Phase (setImmediate)
setImmediate(() => {
  console.log('setImmediate callback 2');
});

// Timers Phase
setTimeout(() => {
  console.log('Timer callback 2');
}, 0);

console.log('End of the script');

promise3.then(() => console.log("Promise 3 Resolved"))
promise.then(() => console.log("Promise 1 Resolved")).finally(() => console.log("Finally"))
promise2.then(() => console.log("Promise 2 Resolved"))

/*
nextTick
Promise
SetTimeout
SetImmediate
File Read Inside a Promise
File Read
*/