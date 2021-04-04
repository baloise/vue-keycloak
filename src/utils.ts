// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export function isPromise(promise: any): boolean {
  return !!promise && typeof promise.then === 'function'
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export function isFunction(fun: any): boolean {
  return !!fun && typeof fun === 'function'
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export function isNil(value: any): boolean {
  return value === undefined || value === null
}
