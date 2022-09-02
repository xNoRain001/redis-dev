const alias = prototype => {
  const map = {
    del: 'remove',
    flushall: 'clear'
  }

  const keys = Object.keys(map)

  for (let i = 0, l = keys.length; i < l; i++) {
    const key = keys[i]
    const value = map[key]
    prototype[key] = prototype[key.toUpperCase()] = prototype[value]
  }
}

module.exports = alias
