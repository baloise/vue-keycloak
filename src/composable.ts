import { KeycloakInstance } from 'keycloak-js'
import { toRefs, Ref } from 'vue'
import { getKeycloak } from './keycloak'
import { KeycloakState, state } from './state'
import { isNil } from './utils'

export interface KeycloakComposable {
  isAuthenticated: Ref<boolean>
  hasFailed: Ref<boolean>
  isPending: Ref<boolean>
  token: Ref<string>
  username: Ref<string>
  roles: Ref<string[]>
  resourceRoles: Ref<Record<string, string[]>>
  keycloak: KeycloakInstance
  hasRoles: (roles: string[]) => boolean
  hasResourceRoles: (roles: string[], resource: string) => boolean
}

export const useKeycloak = (): KeycloakComposable => {
  return {
    ...toRefs<KeycloakState>(state),
    keycloak: getKeycloak(),
    hasRoles: (roles: string[]) =>
      !isNil(roles) && state.isAuthenticated && roles.every(role => state.roles.includes(role)),
    hasResourceRoles: (roles: string[], resource: string) =>
      !isNil(roles) &&
      !isNil(resource) &&
      state.isAuthenticated &&
      roles.every(role => state.resourceRoles[resource].includes(role)),
  }
}
