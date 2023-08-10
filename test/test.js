/**
 * 手写Promise
 */

// 定义一个Promise方法
function Promise(executor) {
  // 添加属性
  this.PromiseState = "pending";
  this.PromiseResult = null;
  this.callbacks = [];

  const self = this;

  function resolve(data) {
    if (self.PromiseState !== "pending") return;
    self.PromiseState = "fulfilled";
    self.PromiseResult = data;
    self.callbacks.forEach((item) => {
      item.onResolved(data);
    });
  }

  function reject(data) {
    if (self.PromiseState !== "pending") return;
    self.PromiseState = "rejected";
    self.PromiseResult = data;
    self.callbacks.forEach((item) => {
      item.onRejected(data);
    });
  }

  try {
    executor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

// 添加 then 方法
Promise.prototype.then = function (onResolved, onRejected) {
  const self = this;
  return new Promise((resolve, reject) => {
    // 封装函数
    function callback(type) {
      try {
        let result = type(self.PromiseResult);
        if (result instanceof Promise) {
          result.then(
            (v) => {
              resolve(v);
            },
            (r) => {
              reject(r);
            }
          );
        } else {
          resolve(result);
        }
      } catch (e) {
        reject(e);
      }
    }

    if (this.PromiseState === "fulfilled") {
      callback(onResolved);
    }

    if (this.PromiseState === "rejected") {
      callback(onRejected);
    }

    if (this.PromiseState === "pending") {
      this.callbacks.push({
        onResolved: function () {
          callback(onResolved);
        },
        onRejected: function () {
          callback(onRejected);
        },
      });
    }
  });
};
