const redis = require('redis')
const getStrategies = require('./get-strategies')
const setStrategies = require('./set-strategies')
const { keys, isNumber, isPlainObject } = require('./utils')

class RedisDev {
  constructor (port, host, password) {
    this.client = redis.createClient(port, host, {
      password
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

  clear () {
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
  
  set (pattern, key, value) {
    return setStrategies[pattern](this.client, key, value)
  }

  get (pattern, key, startOrField, end = -1) {
    return getStrategies[pattern](this.client, key, startOrField, end)
  }

  remove (key) {
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
}

module.exports = RedisDev
