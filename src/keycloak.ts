import Keycloak from 'keycloak-js'
import { state, updateState } from './state'

type KeycloakInstance = Keycloak.KeycloakInstance | undefined

let $keycloak: KeycloakInstance = undefined

export function getKeycloak(): Keycloak.KeycloakInstance {
  return $keycloak as Keycloak.KeycloakInstance
}

export async function getToken(): Promise<string> {
  if ($keycloak === undefined) {
    throw new Error('Keycloak was not initialized.')
  }
  try {
    await $keycloak.updateToken(10)
    updateState($keycloak.token as string)
  } catch (error) {
    state.hasFailed = true
    throw new Error('Failed to refresh the token, or the session has expired')
  }
  return state.token
}

export function createKeycloak(config: Keycloak.KeycloakConfig): Keycloak.KeycloakInstance {
  $keycloak = Keycloak(config)
  return getKeycloak()
}

export async function initKeycloak(initConfig: Keycloak.KeycloakInitOptions): Promise<void> {
  try {
    state.isPending = true
    state.isAuthenticated = await $keycloak.init(initConfig)
    if ($keycloak.token !== undefined && $keycloak.token !== null && $keycloak.token.length > 0) {
      updateState($keycloak.token as string)
    }
  } catch (error) {
    state.hasFailed = true
    state.isAuthenticated = false
    console.error('Could not read access token', error)
  } finally {
    state.isPending = false
  }
}
