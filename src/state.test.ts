import { state, setToken } from './state'

describe('state', () => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJteS1uYW1lIiwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm15LXJvbGUiXX0sInJlc291cmNlX2FjY2VzcyI6eyJteS1hcHAiOnsicm9sZXMiOlsibXktcm9sZSJdfX19.oAnF7H8DndIWOb2KeHntbzwf6h7VjZlxt5AR2KPZTBU'

  test('should have the correct inital values', () => {
    expect(state.isAuthenticated).toBe(false)
    expect(state.hasFailed).toBe(false)
    expect(state.isPending).toBe(false)
    expect(state.token).toBe('')
    expect(state.username).toBe('')
    expect(state.roles).toStrictEqual([])
    expect(state.resourceRoles).toStrictEqual({});
  })

  test('should update the state', () => {
    setToken(token)

    expect(state.token).toBe(token)
    expect(state.username).toBe('my-name')
    expect(state.roles).toStrictEqual(['my-role'])
    expect(state.resourceRoles).toStrictEqual({ 'my-app': ['my-role'] })
  })
})
