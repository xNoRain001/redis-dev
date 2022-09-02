const redis = require('redis')
const alias = require('./alias')
const getStrategies = require('./get-strategies')
const setStrategies = require('./set-strategies')
const delStrategies = require('./del-strategies')

class RedisDev {
  constructor (port, host, password) {
    this.client = redis.createClient(port, host, {
      password
    })
    this.subscribes = []
  }

  _set (pattern, key, fieldOrEntriesOrValue, value) {
    return setStrategies[pattern](this, key, fieldOrEntriesOrValue, value)
  }

  _get (pattern, key, startOrField, end = -1) {
    return getStrategies[pattern](this, key, startOrField, end)
  }

  _del (pattern, key, field) {
    return delStrategies[pattern](this, key, field)
  }

  set (key, value) {
    return new Promise((resolve, reject) => {
      this.client.set(key, value, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }

  get (key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }

  getrange (key, start, end = -1) {
    return new Promise((resolve, reject) => {
      this.client.getrange(key, start, end, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }

  del (key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }

  hset (key, field, value) {
    return new Promise((resolve, reject) => {
      this.client.hset(key, field, value, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }

  hget (key, field) {
    return new Promise((resolve, reject) => {
      this.client.hget(key, field, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }

  hmget (key, ...fields) {
    return new Promise((resolve, reject) => {
      this.client.hmget(key, ...fields, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }

  hgetall (key) {
    return new Promise((resolve, reject) => {
      this.client.hgetall(key, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }

  hdel (key, field) {
    return new Promise(async (resolve, reject) => {
      this.client.hdel(key, field, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }

  flushall () {
    return new Promise((resolve, reject) => {
      this.client.flushall((err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }

  expire (key, expiration) {
    return new Promise((resolve, reject) => {
      this.client.expire(key, expiration, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }

  ttl (key) {
    return new Promise((resolve, reject) => {
      this.client.ttl(key, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }

  type (key) {
    return new Promise((resolve, reject) => {
      this.client.type(key, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }

  keys (pattern = '*') {
    return new Promise((resolve, reject) => {
      this.client.keys(pattern, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }

  subscribe (channel, cb) {
    return new Promise((resolve, reject) => {
      this.client.subscribe(channel, (err, data) => {
        if (err) {
          reject(err)
        } else {
          this.subscribes.push({
            channel,
            cb
          })
          resolve(data)
        }
      })
    })
  }

  publish (channel, message) {
    return new Promise((resolve, reject) => {
      this.client.psubscribe(channel, message, (err, data) => {
        if (err) {
          reject(err)
        } else {
          const subscribes = this.subscribes.filter(sub => {
            return sub.channel === channel
          })

          for (let i = 0, l = subscribes.length; i < l; i++) {
            subscribes[i].cb(message)
          }
          
          resolve(data)
        }
      })
    })
  }
}

alias(RedisDev.prototype)

module.exports = RedisDev
