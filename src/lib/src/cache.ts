// import * as LRU from 'lru-cache'
//
// const categoryCache = new LRU({
// 	maxAge: 1000 * 10
//
// })
//

import { Maybe } from './types/Maybe'

interface CacheItem {
	value: any
	expireAt: number
	staleUntil: number
}

interface CacheHit {
	type: 'hit',
	value: any
	expireAt: number
	staleUntil: number
}

interface CacheOptions<V> {
	/**
	 * The maximum size of the cache, checked by applying the length
	 * function to all values in the cache. Either set this or maxAge,
	 * since that's the whole purpose of this lib.
	 * defaults to `Infinity`.
	 */
	max?: number;

	/**
	 * Maximum age in ms. Items are not pro-actively pruned out as they age,
	 * but if you try to get an item that is too old, it'll drop it and return
	 * undefined instead of giving it to you. Either set this or maxAge,
	 * since that's the whole purpose of this lib.
	 * defaults to `Infinity` .. meaning `Forever` or until no room left.
	 */
	maxAge?: number;

	/**
	 * Maximum age in ms. Items older than maxAge but younger than maxStaleAge
	 * are still returned. Must be longer than maxAge
	 * defaults to 0
	 */
	maxStaleAge?: number;

	/**
	 * alters ages in ms. When items are added the expiration is added jitter
	 * in order not to invalidate everything at the same time.
	 * The jitter is added +/- jitter/2.
	 * defaults to 0
	 */
	jitter?: number;

	/**
	 * Function that is used to calculate the length of stored items.
	 * If you're storing strings or buffers, then you probably want to do
	 * something like `function(n, key){return n.length}`. The default
	 * is `function(){return 1}`, which is fine if you want to store
	 * `max` like-sized things. The item is passed as the first argument,
	 * and the key is passed as the second argument.
	 */
	length?(value: V, key?: string): number;

	/**
	 * Function that is called on items when they are dropped from the cache.
	 * This can be handy if you want to close file descriptors or do other
	 * cleanup tasks when items are no longer accessible. Called with `key, value`.
	 * It's called before actually removing the item from the internal cache,
	 * so if you want to immediately put it back in, you'll have to do that in
	 * a `nextTick` or `setTimeout` callback or it won't do anything.
	 */
	dispose?(key: string, value: V): void;


	/**
	 * By default, if you set a `dispose()` method, then it'll be called whenever
	 * a `set()` operation overwrites an existing key. If you set this option,
	 * `dispose()` will only be called when a key falls out of the cache,
	 * not when it is overwritten.
	 */
	noDisposeOnSet?: boolean;
}

const DefaultCacheOptions: Partial<CacheOptions<any>> = {
	max: Infinity,
	maxAge: 1000 * 60 * 60 * 24, // 24 hours
	jitter: 1000, // 1 second
}

export class Cache<T> {
	constructor(private options: CacheOptions<T>) {
		this.options = { ...DefaultCacheOptions, ...options }
	}

	async get(key: string, producer: () => Maybe<T, string>): Promise<Maybe<T, string>> {
		return producer()
	}
}
