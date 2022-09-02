const setStrategies = {
  string (client, key, value) {
    return new Promise((resolve, reject) => {
      client.set(key, value, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  },

  hash (client, key, value) {
    return new Promise(async (resolve, reject) => {
      try {
        const entries = Object.entries(value)

        for (let i = 0, l = entries.length; i < l; i++) {
          const entry = entries[i]
          client.hset(key, entry[0], entry[1])
        }

        resolve(true)
      } catch (error) {
        reject(false)      
      }
    })
  }
}

module.exports = setStrategies
