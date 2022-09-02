const delStrategies = {
  string (redis, key) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await redis.del(key)
        resolve(res)
      } catch (err) {
        reject(err)
      }
    })
  },

  hash (redis, key, field) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await redis.hdel(key, field)
        resolve(res)
      } catch (err) {
        reject(err)
      }
    })
  }
}

module.exports = delStrategies
