const alias = prototype => {
  const aliasMap = {
    del: 'remove',
    flushall: 'clear'
  }

  const aliasKeys = Object.keys(aliasMap)

  for (let i = 0, l = aliasKeys.length; i < l; i++) {
    const key = aliasKeys[i]
    const value = aliasMap[key]
    prototype[key] = prototype[value]
  }

  const methods = Object.getOwnPropertyNames(prototype).slice(1)

  for (let i = 0, l = methods.length; i < l; i++) {
    const method = methods[i]
    prototype[method.toUpperCase()] = prototype[method]
  }
}

module.exports = alias
