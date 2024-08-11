/*
 * Write a function that halts the JS thread (make it busy wait) for a given number of milliseconds.
 * During this time the thread should not be able to do anything else.
 * the function should return a promise just like before
 */

function sleep(milliseconds) {
  const time1 = new Date().getTime();
  let time2;
  const promise = new Promise((res,rej) => {
  while (true) {
      time2 = new Date().getTime();
      if (time2 - time1 === milliseconds) {
        res()
        break;
      }
    }
  });
  return promise;
}

module.exports = sleep;
