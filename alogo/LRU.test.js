const LRUCache = require('./LRU')
describe('LRUCache测试', () => {
    const lc = new LRUCache(3)
    test('init', () => {
        expect(lc).toEqual({max: 3, cache: {}, keys: []})
    })
    test('set', () => {
        lc.set('a', '1')
        lc.set('b', '2')
        lc.set('c', '3')
        lc.set('d', '4')
        expect(lc).toEqual({max: 3, cache: {a: null, b: '2', c: '3', d: '4'}, keys: ['b', 'c', 'd']})
        lc.set('c', '0')
        expect(lc).toEqual({max: 3, cache: {a: null, b: '2', c: '0', d: '4'}, keys: ['b', 'd', 'c']})
    })
    test('get', () => {
        const a = lc.get('a')
        expect(a).toBe(null)
        const c = lc.get('c')
        expect(c).toBe('0')
        expect(lc).toEqual({max: 3, cache: {a: null, b: '2', c: '0', d: '4'}, keys: ['b', 'd', 'c']})
    })
})