// Library, march and assert
//import Assert from "assert";
//import {assertFunction} from "utils/assert";

// Framework Library
import ImmutableAdapter from "framework/patterns/adapter/immutable";

const ad = new ImmutableAdapter();
ad.setState({a: 123, b: 456, c: {x: "ABC", y: "DEF"}});

console.log(ad.getState());
console.log(ad.a);
console.log(ad.b);
console.log(ad.c, ad.c.getState, ad.c.setState);
console.log(ad.c.getState());
//ad.c.setState({x: "abc", z: "hyz"});
console.log(ad.c.x);
console.log(ad.c.y);
ad.a = {i: "III", j: "JJJ"};
console.log(ad.a);
console.log(ad.a.i);
ad.a.i = {k: "KKK", l: "LLL"};
console.log(ad.a.i);
console.log(ad.a.i.k);
console.log(ad.getState());
ad.a = 789;
console.log(ad.a);
console.log(ad.getState());

// Test case
describe('Framework.Patterns.Proxy, ProgressController', () => {
    it('Class method & Interface', () => {
    });
    it('Inherent & Constructor.', () => {
    });
});
