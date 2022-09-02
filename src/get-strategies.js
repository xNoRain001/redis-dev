const { isUndef, isNumber } = require("./utils")

const getStrategies = {
  string (client, key, start, end) {
    return new Promise((resolve, reject) => {
      if (isNumber(start) && isNumber(end)) {
        client.getrange(key, start, end, (err, data) => {
          if (err) {
            reject(err)
          } else {
            resolve(data)
          }
        })
      } else {
        client.get(key, (err, data) => {
          if (err) {
            reject(err)
          } else {
            resolve(data)
          }
        })
      }
    })
  },

  hash (client, key, field) {
    return new Promise(async (resolve, reject) => {
      if (isUndef(field)) {
        client.hgetall(key, (err, data) => {
          if (err) {
            reject(err)
          } else {
            resolve(data)
          }
        })
      } else {
        client.hget(key, field, (err, data) => {
          if (err) {
            reject(err)
          } else {
            resolve(data)
          }
        })
      }
    })
  }
}

module.exports = getStrategies
