## install

```
npm i redis-dev
```

## start

```js
const port = 6379
const host = '127.0.0.1'
const requirepass = 'foo'
const redis = new RedisDev(port, host, requirepass)
```

## APIs

### common

#### _set

```js
/**
 * Set key and value.
 * 
 * @param {string} pattern - 'string' or 'hash'
 * @param {string} key
 * @param {(string|Object)} fieldOrEntriesOrValue
 * @param {string} [value=undefined]
 * @returns {Promise}
 */
await redis._set('string', 'foo', 'foo') 

await redis._set('hash', 'foo', 'bar', 'bar') // foo: { bar: 'bar' }
await redis._set('hash', 'foo', { // foo: { bar: 'bar', baz: 'baz' }
  bar: 'bar',
  baz: 'baz'
})
```

#### _get

```js
/**
 * Get value by key.
 * 
 * @param {string} pattern - 'string' or 'hash'
 * @param {string} key
 * @param {(string|number)} startOrField
 * @param {number} [end=-1]
 * @returns {Promise}
 */
await redis._get('string', 'foo') // output: 'foo'
await redis._get('string', 'foo', 0) // output: 'foo'
await redis._get('string', 'foo', 1) // output: 'oo'
await redis._get('string', 'foo', 0, 1) // output: 'fo'

await redis._get('hash', 'foo') // output: { foo: 'foo', bar: 'bar' }
await redis._get('hash', 'foo', 'foo') // output: 'foo'
await redis._get('hash', 'foo', ['foo', 'bar']) // output: ['foo', 'bar']
```

#### _del

```js
/**
 * Remove data by key.
 * 
 * @param {string} pattern - 'string' or 'hash'
 * @param {string} key
 * @param {string} field
 * @returns {Promise}
 */
await redis._del('string', 'foo')

await redis._del('hash', 'foo', 'foo')
```

#### flushall

```js
/**
 * Clear all data.
 * 
 * @returns {Promise}
 */
await redis.flushall()
```

#### ttl

```js
/**
 * Get the remaining survival time of a data with an expiration time.
 * 
 * @param {string} key - key
 * @returns {Promise}
 */
await redis.ttl(key)
```

#### type

```js
/**
 * Get the type of data.
 * 
 * @param {string} key - key
 * @returns {Promise}
 */
await redis.type(key)
```

#### keys

```js
/**
 * Get data by pattern.
 * 
 * @param {string} [pattern=*] - pattern
 * @returns {Promise}
 */
await redis.keys('*')
```

#### expire

```js
/**
 * Set expiration time.
 * 
 * @param {string} key - key
 * @param {number} expiration - duration time
 * @returns {Promise}
 */
await redis.expire('foo', 60)
```

#### subscribe

```js
/**
 * Subscribe channel.
 * 
 * @param {string} channel - channel
 * @param {Function} cb - callback
 * @returns {Promise}
 */
await redis.subscribe('foo', message => console.log(message))
```

#### publish

```js
/**
 * Puslish message.
 * 
 * @param {string} channel - channel
 * @param {string} message - message
 * @returns {Promise}
 */
await redis.publisj('foo', 'Published message')
```

### for string

#### set

```js
/**
 * Set key and value.
 * 
 * @param {string} key - key
 * @param {string} value - value
 * @returns {Promise}
 */
await redis.set('foo', 'foo')
```

#### get

```js
/**
 * Get value by key.
 * 
 * @param {string} key - key
 * @returns {Promise}
 */
await redis.get('foo')
```

#### getrange

```js
/**
 * Get range value by key.
 * 
 * @param {string} key - key
 * @param {number} start - start index
 * @param {number} [end=-1] - end index
 * @returns {Promise}
 */
await redis.getrange('foo')
```

#### del

```js
/**
 * Remove data by key.
 * 
 * @param {string} key - key
 * @returns {Promise}
 */
await redis.del('foo')
```

### for hash

#### hset

```js
/**
 * Set key and field and value.
 * 
 * @param {string} key - key
 * @param {string} field - field
 * @param {string} value - value
 * @returns {Promise}
 */
await redis.hset('foo', 'foo', 'foo')
```

#### hget

```js
/**
 * Get value by field.
 * 
 * @param {string} key - key
 * @param {string} field - field
 * @returns {Promise}
 */
await redis.hget('foo', 'foo')
```

#### hmget

```js
/**
 * Get multiple values by fields.
 * 
 * @param {string} key - key
 * @param {...string} fields - fields
 * @returns {Promise}
 */
await redis.hmget('foo', 'foo', 'bar', 'baz')
```

#### hgetall

```js
/**
 * Get all fields and values by key.
 * 
 * @param {string} key - key
 * @returns {Promise}
 */
await redis.hgetall('foo')
```

#### hdel

```js
/**
 * Remove data by key.
 * 
 * @param {string} key - key
 * @param {string} field - field
 * @returns {Promise}
 */
await redis.hdel('foo', 'foo')
```
