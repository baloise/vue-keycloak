import { isPromise, isFunction, isNil } from './utils'

describe('util', () => {
  const obj = {}
  const fun = (): void => undefined
  const prom = new Promise(() => undefined)

  describe('isPromise', () => {
    test('should return true if it is a valid promise', () => {
      expect(isPromise(prom)).toBe(true)
      expect(isPromise(fun)).toBe(false)
      expect(isPromise(obj)).toBe(false)
      expect(isPromise(undefined)).toBe(false)
      expect(isPromise(null)).toBe(false)
    })
  })

  describe('isFunction', () => {
    test('should return true if it is a valid function', () => {
      expect(isFunction(fun)).toBe(true)
      expect(isFunction(prom)).toBe(false)
      expect(isFunction(obj)).toBe(false)
      expect(isFunction(undefined)).toBe(false)
      expect(isFunction(null)).toBe(false)
    })
  })

  describe('isNil', () => {
    test('should return true if it is null or undefined', () => {
      expect(isNil(undefined)).toBe(true)
      expect(isNil(null)).toBe(true)
      expect(isNil(fun)).toBe(false)
      expect(isNil(prom)).toBe(false)
      expect(isNil(obj)).toBe(false)
    })
  })
})
