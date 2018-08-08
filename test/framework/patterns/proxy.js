// Library, march and assert
//import Assert from "assert";
//import {assertFunction} from "utils/assert";

class A {
      constructor() {
          // 1. Retrieve proxy defined in class.
          this._dataSet = this.constructor.proxyDefined;
          // 2. Register dynamice accessor.
          Object.keys(this._dataSet).forEach((key) => {
              Object.defineProperty(this, key, {
                  get() {return this._dataSet[key]},
                  set(value) {this._dataSet[key] = value},
                  configurable: true,
                  enumerable: true
              });
          });
      }[]
}

class B extends A {
    constructor() {
        super();
    }
}

A.proxyDefined = {
    var1: 123,
    var2: 456
}

B.proxyDefined = {
    var3: 999
}

const t = new A();
const o = new A();
console.log(t.var1);
console.log(t.var2);
t.var1 = 789
console.log(o.var1);
const z = new B();
console.log(z.var1);
console.log(z.var2);
console.log(z.var3);
console.log(o.var1);

// Test case
describe('Framework.Patterns.Proxy, ProgressController', () => {
    it('Class method & Interface', () => {
    });
    it('Inherent & Constructor.', () => {
    });
});
