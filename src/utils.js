const isUndef = v => v === undefined

const isArray = v => Array.isArray(v)

const isNumber = v => typeof v === 'number'

const { toString } = Object.prototype

const isPlainObject = v => toString.call(v).slice(8, -1) === 'Object'

module.exports = {
  isUndef,
  isArray,
  isNumber,
  isPlainObject
}
