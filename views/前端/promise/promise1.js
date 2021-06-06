const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECT = "REJECT";
function resolvePromise(x, promise2, resolve, reject) {
  if (promise2 === x) {
    reject(new TypeError("error"));
  }
  if ((typeof x === "object" && x !== null) || typeof x === "function") {
    const then = x.then;
    if (typeof then === "function") {
      then.call(x, resolve, reject);
    } else {
      resolve(x);
    }
  } else {
    resolve(x);
  }
}
class MyPromise {
  constructor(executor) {
    this.value = undefined;
    this.reason = undefined;
    this.status = PENDING;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];
    const resolve = (val) => {
      if (this.status === PENDING) {
        this.value = val;
        this.status = FULFILLED;
        this.onFulfilledCallbacks.forEach((f) => f());
      }
    };
    const reject = (reason) => {
      if (this.status === PENDING) {
        this.reason = reason;
        this.status = REJECT;
        this.onRejectedCallbacks.forEach((f) => f());
      }
    };
    executor(resolve, reject);
  }
  then(onFulfilled, onRejected) {
    const promise2 = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        const x = onFulfilled(this.value);
        setTimeout(() => {
          resolvePromise(x, promise2, resolve, reject);
        });
      } else if (this.status === REJECT) {
        const x = onRejected(this.reason);
        setTimeout(() => {
          resolvePromise(x, promise2, resolve, reject);
        });
      } else {
        this.onFulfilledCallbacks.push(() => {
          const x = onFulfilled(this.value);
          setTimeout(() => {
            resolvePromise(x, promise2, resolve, reject);
          });
        });
        this.onRejectedCallbacks.push(() => {
          const x = onRejected(this.reason);
          setTimeout(() => {
            resolvePromise(x, promise2, resolve, reject);
          });
        });
      }
    });
    return promise2;
  }
}

function test() {
  const p = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(new P());
    }, 1000);
  });
  const p2 = p.then(
    (data) => {
      console.log(data);
      return p2;
    },
    (r) => {
      console.error("1-->", r);
    }
  );
  p2.then(
    (data) => {
      console.log("2-->", data);
    },
    (r) => {
      console.error("3-->", r);
    }
  );
}

test();
