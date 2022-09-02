const isNumber = v => typeof v === 'number'
const isUndef = v => v === undefined

const { toString } = Object.prototype
const isPlainObject = v => toString.call(v).slice(8, -1) === 'Object'

const keys = v => Object.keys(v)

module.exports = {
  keys,
  isUndef,
  isNumber,
  isPlainObject
}
