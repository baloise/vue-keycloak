import { reactive } from '@vue/reactivity'
import jwtDecode from 'jwt-decode'

export interface KeycloakState {
  isAuthenticated: boolean
  hasFailed: boolean
  isPending: boolean
  token: string
  username: string
  roles: string[]
}

export const state = reactive<KeycloakState>({
  isAuthenticated: false,
  hasFailed: false,
  isPending: false,
  token: '',
  username: '',
  roles: [] as string[],
})

export const updateState = (token: string): void => {
  state.token = token
  const content = jwtDecode<any>(state.token)
  state.roles = content.realm_access.roles
  state.username = content.preferred_username
}
