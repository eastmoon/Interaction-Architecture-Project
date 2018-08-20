// Library, march and assert
import Assert from "assert";
import {assertClass, assertFunction} from "utils/assert";

// Framework Library
import ImmutableAdapter, {MapAdapter, ListAdapter} from "framework/patterns/adapter/immutable";

// Test case
describe('Framework.Patterns.Adapter, Immutable', () => {
    it('Class method & Interface', () => {
        //
        assertFunction(ImmutableAdapter.prototype.set);
        assertFunction(ImmutableAdapter.prototype.get);
        //
        assertClass(MapAdapter);
        assertFunction(MapAdapter.prototype.get);
        //
        assertClass(ListAdapter);
        assertFunction(MapAdapter.prototype.get);
    });
    it('Inherent & Constructor.', () => {
    });
    it('Merge data with set function.', () => {
        const ad = new ImmutableAdapter();
        ad.set({a: 123, b: 456});
        Assert.equal(ad.a, 123);
        Assert.equal(ad.b, 456);
        ad.set({a: 789, c: 987});
        Assert.equal(ad.a, 789);
        Assert.equal(ad.c, 987);
    });
    describe('Adatper immutable get function with get accessor.', () => {
        it(`get nested structures`, () => {
            const ad = new ImmutableAdapter();
            ad.set({a: 123, b: 456, c: {x: "ABC", y: "DEF"}});
            Assert.equal(ad.a, 123);
            Assert.equal(ad.b, 456);
            Assert.equal(ad.c.x, "ABC");
            Assert.equal(ad.c.y, "DEF");
            Assert.ok(ad.c instanceof MapAdapter);
        });
        it(`get list structures`, () => {
            const ad = new ImmutableAdapter();
            ad.set({a: 123, b: 456, c: [1, 2, 3]});
            Assert.equal(ad.a, 123);
            Assert.equal(ad.b, 456);
            Assert.equal(ad.c[0], 1);
            Assert.equal(ad.c[1], 2);
            Assert.equal(ad.c[2], 3);
            Assert.ok(ad.c instanceof ListAdapter);
        });
    });
    describe('Adatper immutable set with set method.', () => {
        it('js object.', () => {
            const ad =new ImmutableAdapter();
            ad.set({a: 123, b: 456});
            const temp = ad.get().set('a', 789);
            Assert.equal(ad.a, 123);
            Assert.equal(ad.b, 456);
            Assert.equal(temp.get('a'), 789);
        });
        it('immutable object.', () => {
            const ad =new ImmutableAdapter();
            ad.set({a: 123, b: 456});
            const temp = ad.get().set('a', 789);
            Assert.equal(ad.a, 123);
            Assert.equal(ad.b, 456);
            Assert.equal(temp.get('a'), 789);
            ad.set(temp);
            Assert.equal(ad.a, 789);
            Assert.equal(ad.b, 456);
        });
    });
    describe('Adatper immutable set with set accessor.', () => {
        it('set number, string.', () => {
            const ad = new ImmutableAdapter();
            ad.set({a: 123, b: {x: 123, y: 123}});
            Assert.equal(ad.a, 123);
            Assert.equal(ad.b.x, 123);
            Assert.equal(ad.b.y, 123);
            ad.a = 456;
            ad.b.x = 789;
            ad.b.y = 987;
            Assert.equal(ad.a, 456);
            Assert.equal(ad.b.x, 789);
            Assert.equal(ad.b.y, 987);
        });
        it('set list structures.', () => {
            const ad = new ImmutableAdapter();
            ad.set({a: 123, b: 456, c: [1, 2, 3]});
            Assert.equal(ad.c[0], 1);
            Assert.equal(ad.c[1], 2);
            Assert.equal(ad.c[2], 3);
            ad.c[0] = 789;
            ad.c[2] = 987;
            Assert.equal(ad.c[0], 789);
            Assert.equal(ad.c[1], 2);
            Assert.equal(ad.c[2], 987);
        });
        it('set nested structures.', () => {
            const ad = new ImmutableAdapter();
            ad.set({a: 123, b: {x: 123, y: 123}});
            Assert.equal(ad.a, 123);
            Assert.equal(ad.b.x, 123);
            Assert.equal(ad.b.y, 123);
            ad.a = {i: 0, j: 1, k: 2};
            Assert.ok(ad.a instanceof MapAdapter);
            Assert.equal(ad.a.i, 0);
            Assert.equal(ad.a.j, 1);
            Assert.equal(ad.a.k, 2);
            ad.b.x = {i: 10, j:100};
            Assert.ok(ad.b.x instanceof MapAdapter);
            Assert.equal(ad.b.x.i, 10);
            Assert.equal(ad.b.x.j, 100);
        });
        it('set immutable object.', () => {
            const ad =new ImmutableAdapter();
            ad.set({a: 123, b: {x: 123, y: 123}});
            const temp = ad.b.get().set('x', 456).set('y', 789);
            Assert.equal(ad.a, 123);
            Assert.equal(ad.b.x, 123);
            Assert.equal(ad.b.y, 123);
            ad.b = temp;
            Assert.equal(ad.b.x, 456);
            Assert.equal(ad.b.y, 789);
        });
    });
    it('Adatper equals', () => {
        const ad = new ImmutableAdapter();
        ad.set({a: 123, b: 456, c: [1, 2, 3]});
        const temp1 = ad.get().set("a", 789).set("a", 123);
        Assert.ok(ad.equals(temp1));
        const temp2 = new ImmutableAdapter();
        temp2.set({a: 123, b: 456, c: [1, 2, 3]});
        Assert.ok(ad.equals(temp2));
        const temp3 = ad.get().set("a", 789);
        Assert.ok(!ad.equals(temp3));
    });
});
