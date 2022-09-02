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
 * @param {string} pattern - pattern, now supported types are string and hash.
 * @param {string} key - key
 * @param {string} value - value
 * 
 * @returns {Promise}
 */
const res = await dev.set('string', 'foo', 'foo')
const ret = await dev.set('hash', 'bar', {
  baz: 'baz'
})
```

### get

```js
/**
 * Get value by key.
 * 
 * @param {string} pattern - pattern
 * @param {string} key - key
 * @param {number} [startOrField=undefined] - start index or field
 * @param {number} [end=-1] - end index
 * 
 * @returns {Promise}
 */
const res1 = await dev.get('string', 'foo') // output: 'foo'
const res2 = await dev.get('string', 'foo', 1) // output: 'oo'
const ret1 = await dev.get('hash', 'bar') // output: { baz: 'baz' }
const ret2 = await dev.get('hash', 'bar', 'bar') // output: 'baz'
```

### remove(or del)

```js
/**
 * Remove data by key.
 * alias: del(DEL)
 * 
 * @param {string} key - key
 * 
 * @returns {Promise}
 */
const res = await dev.remove('foo')
const ret = await dev.del('foo')
```

### clear(or flushall)

```js
/**
 * Clear all data.
 * alias: flushall(FLUSHALL)
 * 
 * @param {string} key - key
 * 
 * @returns {Promise}
 */
const res = await dev.clear()
const ret = await dev.flushall()
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

### type

```js
/**
 * Get the type of data.
 * 
 * @param {string} key - key
 * 
 * @returns {Promise}
 */
const res = await dev.type(key)
```

### keys

```js
/**
 * Get data by pattern.
 * 
 * @param {string} [pattern=*] - pattern
 * 
 * @returns {Promise}
 */
const res = await dev.keys('*')
```

### expire

```js
/**
 * Set expiration time.
 * 
 * @param {string} key - key
 * @param {number} expiration - duration time
 */
const res = await dev.expire('foo', 60)
```

### subscribe

```js
/**
 * Subscribe channel.
 * 
 * @param {string} channel - channel
 * @param {Function} cb - callback
 */
const res = await dev.subscribe('foo', message => console.log(message))
```

### publish

```js
/**
 * Puslish message.
 * 
 * @param {string} channel - channel
 * @param {Function} message - message
 */
const res = await dev.publisj('foo', 'Published message')
```
