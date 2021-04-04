import { state, updateToken } from './state'

describe('state', () => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJteS1uYW1lIiwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm15LXJvbGUiXX19.caCXjtPtGJ84gjyWZRZwOPJE0hfMYpbD34KJhA_aASU'

  test('should have the correct inital values', () => {
    expect(state.isAuthenticated).toBe(false)
    expect(state.hasFailed).toBe(false)
    expect(state.isPending).toBe(false)
    expect(state.token).toBe('')
    expect(state.username).toBe('')
    expect(state.roles).toStrictEqual([])
  })

  test('should update the state', () => {
    updateToken(token)

    expect(state.token).toBe(token)
    expect(state.username).toBe('my-name')
    expect(state.roles).toStrictEqual(['my-role'])
  })
})
