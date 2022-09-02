const alias = prototype => {
  const methods = Object.getOwnPropertyNames(prototype).slice(1)

  for (let i = 0, l = methods.length; i < l; i++) {
    const method = methods[i]
    prototype[method.toUpperCase()] = prototype[method]
  }
}

module.exports = alias
