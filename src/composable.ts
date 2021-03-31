import { toRefs, Ref } from 'vue'
import { KeycloakState, state } from './state'

export interface KeycloakComposable {
  isAuthenticated: Ref<boolean>
  hasFailed: Ref<boolean>
  isPending: Ref<boolean>
  token: Ref<string>
  username: Ref<string>
  roles: Ref<string[]>
  hasRole: (role: string) => boolean
  hasRoles: (roles: string[]) => boolean
}

export const useKeycloak = (): KeycloakComposable => {
  return {
    ...toRefs<KeycloakState>(state),
    hasRole: (role: string) => state.isAuthenticated && state.roles.includes(role),
    hasRoles: (roles: string[]) => state.isAuthenticated && roles.every(role => state.roles.includes(role)),
  }
}
