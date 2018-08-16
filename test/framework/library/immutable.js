// Library, march and assert
import Assert from "assert";

// Library
import Immutable, {fromJS} from "immutable";

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
    describe(`Type check`, ()=> {
        it(`Collection include Map, List, Set`, () => {
            // In immutable.js ver 3.8.2, isImmutable and other type check function is not exposed.
            // Ref : https://github.com/facebook/immutable-js/issues/1165
            // Fix it, using Collection, which is the base class for all collection in immutable
            // Ref : https://facebook.github.io/immutable-js/docs/#/Collection/Indexed
            Assert.ok(Immutable.Map() instanceof Immutable.Collection);
            Assert.ok(Immutable.List() instanceof Immutable.Collection);
            Assert.ok(Immutable.Set() instanceof Immutable.Collection);
        });
        it(`Seq isn't inherence Collection`, () => {
            // Immutable.Seq is not inherence of Immutable.Collection
            // Even Seq could translation to other Immutable.Collection, but if auto-translation, it may broken the data structure with original data.
            const oddSquares = Immutable.Seq([ 1, 2, 3, 4, 5, 6, 7, 8 ])
            .filter(x => x % 2 !== 0)
            .map(x => x * x);
            Assert.ok(oddSquares instanceof Immutable.Seq);
            Assert.ok(!(oddSquares instanceof Immutable.Collection));
            Assert.ok(oddSquares.toMap() instanceof Immutable.Collection);
            Assert.ok(oddSquares.toMap() instanceof Immutable.Map);
            Assert.ok(oddSquares.toList() instanceof Immutable.List);
            Assert.ok(oddSquares.toSet() instanceof Immutable.Set);

            // If want to translation to Immutable.Collection, use toJS to JS object, then use fromJS translation to Immutable.Collection object.
            Assert.ok(fromJS(oddSquares.toJS()) instanceof Immutable.Collection);
        });

    })
});
