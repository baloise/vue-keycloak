import { useKeycloak } from './composable'
import { state } from './state'

describe('useKeycloak', () => {
  describe('state', () => {
    test('should return the state values as refs', () => {
      const { isAuthenticated, hasFailed, isPending, token, username, roles } = useKeycloak()

      expect(isAuthenticated.value).toBe(false)
      expect(hasFailed.value).toBe(false)
      expect(isPending.value).toBe(false)
      expect(token.value).toBe('')
      expect(username.value).toBe('')
      expect(roles.value).toStrictEqual([])
    })
  })
  describe('hasRole', () => {
    test('should tell if the user has the role or not and is authenticated', () => {
      state.isAuthenticated = true
      state.roles = ['my-role']
      const { hasRole } = useKeycloak()

      expect(hasRole('my-role')).toBe(true)
      expect(hasRole('not-my-role')).toBe(false)
      expect(hasRole(undefined)).toBe(false)
      expect(hasRole(null)).toBe(false)
    })
  })
  describe('hasRoles', () => {
    test('should tell if the user has the role or not and is authenticated', () => {
      state.isAuthenticated = true
      state.roles = ['my-role', 'my-other-role']
      const { hasRoles } = useKeycloak()

      expect(hasRoles(['my-role', 'my-other-role'])).toBe(true)
      expect(hasRoles(['my-role', 'not-my-role'])).toBe(false)
      expect(hasRoles(undefined)).toBe(false)
      expect(hasRoles(null)).toBe(false)
    })
  })
})
