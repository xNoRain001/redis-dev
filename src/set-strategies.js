const { isPlainObject } = require("./utils")

const setStrategies = {
  string (redis, key, value) {
    return new Promise((resolve, reject) => {
      try {
        const res = redis.set(key, value)
        resolve(res)
      } catch (err) {
        reject(err)
      }
    })
  },

  hash (redis, key, fieldOrEntries, value) {
    return new Promise(async (resolve, reject) => {
      if (isPlainObject(fieldOrEntries)) {
        try {
          const entries = Object.entries(fieldOrEntries)
  
          for (let i = 0, l = entries.length; i < l; i++) {
            const entry = entries[i]
            await redis.hset(key, entry[0], entry[1])
          }
  
          resolve(true)
        } catch (error) {
          reject(false)      
        }
      } else {
        try {
          const res = redis.hset(key, fieldOrEntries, value)
          resolve(res)
        } catch (err) {
          reject(err)
        }
      }
    })
  }
}

module.exports = setStrategies
