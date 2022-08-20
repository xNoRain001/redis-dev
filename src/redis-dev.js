const redis = require('redis')

class RedisDev {
  constructor (port, host, password) {
    this.client = redis.createClient(port, host, {
      password
    })
  }
  
  set (key, value, expiration) {
    return new Promise((resolve, reject) => {
      if (expiration) {
        this.client.setex(key, expiration, value, (err, data) => {
          if (err) {
            reject(err)
          } else {
            resolve(data)
          }
        })
      } else {
        this.client.set(key, value, (err, data) => {
          if (err) {
            reject(err)
          } else {
            resolve(data)
          }
        })
      }
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
}

module.exports = RedisDev
