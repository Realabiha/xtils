const PubSub = require("./pubsub");
describe("pubsub测试", () => {
  const pb = new PubSub();
  const fn = jest.fn(),
    fn2 = jest.fn();
  test("callback执行多次", () => {
    pb.on("test", fn);
    pb.emit("test", "1");
    expect(fn).toBeCalled();
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith("1");
    pb.emit("test", "2");
    pb.emit("test", "3");
    expect(fn).toHaveBeenCalledTimes(3);
  });
  test("callback移除监听", () => {
    pb.off("test");
    pb.emit('test', '4')
    expect(fn).not.toBeCalled();
  });
  test("callback执行一次", () => {
    pb.once("test", fn);
    pb.emit("test", "5");
    pb.emit("test", "6");
    expect(fn).toBeCalled();
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith("5");
    pb.off("test");
  });
  test("多个callback回调执行", () => {
    pb.on('test', fn)
    pb.on('test', fn2)
    pb.emit('test', '7')
    expect(fn).toHaveBeenCalledWith('7')
    expect(fn2).toHaveBeenCalledWith('7')
  });
  test('store属性不能修改或删除', () => {
    delete pb.store
    expect(pb.store).toBeDefined()
    pb.store = null
    expect(pb.store).toBeNull()
  })
});
