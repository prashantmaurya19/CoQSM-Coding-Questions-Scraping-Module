const target = {
  message1: "hello",
  message2: "everyone",
};

const handler2 = {
  get(target, prop, receiver) {
    return ()=> 'innerfunction';
  },
};

const proxy2 = new Proxy(target, handler2);

console.log(proxy2.get());

