const { isUndef, isNumber, isArray } = require("./utils")

const getStrategies = {
  string (redis, key, start, end) {
    return new Promise(async (resolve, reject) => {
      if (isNumber(start) && isNumber(end)) {
        try {
          const res = await redis.getrange(key, start, end)
          resolve(res)
        } catch (err) {
          reject(err)
        }
      } else {
        try {
          const res = await redis.get(key)
          resolve(res)
        } catch (err) {
          reject(err)
        }
      }
    })
  },

  hash (redis, key, field) {
    return new Promise(async (resolve, reject) => {
      if (isArray(field)) {
        try {
          const res = await redis.hmget(key, ...field)
          resolve(res)
        } catch (err) {
          reject(err)
        }

        return
      }

      if (isUndef(field)) {
        try {
          const res = await redis.hgetall(key)
          resolve(res)
        } catch (err) {
          reject(err)
        }

        return
      }

      try {
        const res = await redis.hget(key, field)
        resolve(res)
      } catch (err) {
        reject(err)
      }
    })
  }
}

module.exports = getStrategies
