// Library, march and assert
import Assert from "assert";

// Library
import Immutable from "immutable";

// Test case
describe('Library, Immutable', () => {
    it('Default declare', () => {
        const map1 = Immutable.Map({a:1, b:2, c:3});
        const map2 = map1.set('b', 50);
        Assert.equal(map1.get('b'), 2);
        Assert.equal(map2.get('b'), 50);
    });
    it('Immutable state.', () => {
        // Generate base map.
        const map1 = Immutable.Map({a:1, b:2, c:3});
        // Set value, but not change.
        const map2 = map1.set('b', 2);
        Assert.ok(map1.equals(map2));
        Assert.equal(map1, map2);
        // Set value, and change map.
        const map3 = map1.set('b', 50);
        Assert.ok(!map1.equals(map3));
        Assert.notEqual(map1, map3);
    });
    it(`Nested Structures`, () => {
        const nested1 = Immutable.fromJS({a:{b:{c:[3,4,5]}}});
        const nested2 = nested1.mergeDeep({a:{b:{d:6}}});
        Assert.equal(nested1.getIn(['a', 'b', 'c']).get(0), 3);
        Assert.equal(nested1.getIn(['a', 'b', 'c']).toArray()[0], 3);
        Assert.equal(nested2.getIn(['a', 'b', 'd']), 6);
    });
    it(`Map`, () => {
        let map = Immutable.Map({a:1, b:2, c:3});
        Assert.equal(map.get("b"), 2);
        map = map.set("c", 4);
        Assert.equal(map.get("c"), 4);
    });
    it(`list`, () => {

    });
});
