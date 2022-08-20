## install

```
npm i redis-dev
```

## start

```js
const port = 6379
const host = '127.0.0.1'
const requirepass = 'foo'
const dev = new RedisDev(port, host, requirepass)
```

## APIs

### set

```js
/**
 * Set key and value.
 * 
 * @param {string} key - key
 * @param {string} value - value
 * @param {number} expiration - lift cycle
 * 
 * @returns {Promise}
 */
const res = await dev.set('foo', 'bar', 60)
```

### get

```js
/**
 * Get value by key.
 * 
 * @param {string} key - key
 * 
 * @returns {Promise}
 */
const res = await dev.get('foo')
```

### remove

```js
/**
 * Remove data by key.
 * 
 * @param {string} key - key
 * 
 * @returns {Promise}
 */
const res = await dev.remove('foo')
```

### clear

```js
/**
 * Clear all data.
 * 
 * @param {string} key - key
 * 
 * @returns {Promise}
 */
const res = await dev.clear()
```

### ttl

```js
/**
 * Get the remaining survival time of a data with an expiration time.
 * 
 * @param {string} key - key
 * 
 * @returns {Promise}
 */
const res = await dev.ttl(key)
```
