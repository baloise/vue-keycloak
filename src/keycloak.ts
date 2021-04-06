import Keycloak from 'keycloak-js'
import { hasFailed, isAuthenticated, isPending, updateToken } from './state'
import { isNil } from './utils'

type KeycloakInstance = Keycloak.KeycloakInstance | undefined

let $keycloak: KeycloakInstance = undefined

export async function isTokenReady(): Promise<void> {
  return new Promise(resolve => checkToken(resolve))
}

const checkToken = (resolve: () => void) => {
  if (!isNil($keycloak) && !isNil($keycloak.token)) {
    resolve()
  } else {
    setTimeout(() => checkToken(resolve), 500)
  }
}

export function getKeycloak(): Keycloak.KeycloakInstance {
  return $keycloak as Keycloak.KeycloakInstance
}

export async function getToken(): Promise<string> {
  await isTokenReady()

  try {
    await $keycloak.updateToken(10)
    updateToken($keycloak.token as string)
  } catch (error) {
    hasFailed(true)
    throw new Error('Failed to refresh the token, or the session has expired')
  }
  return $keycloak.token
}

export function createKeycloak(config: Keycloak.KeycloakConfig | string): Keycloak.KeycloakInstance {
  $keycloak = Keycloak(config)
  return getKeycloak()
}

export async function initKeycloak(initConfig: Keycloak.KeycloakInitOptions): Promise<void> {
  try {
    isPending(true)
    const _isAuthenticated = await $keycloak.init(initConfig)
    isAuthenticated(_isAuthenticated)
    if (!isNil($keycloak.token)) {
      updateToken($keycloak.token as string)
    }
  } catch (error) {
    hasFailed(true)
    isAuthenticated(false)
    throw new Error('Could not read access token')
  } finally {
    isPending(false)
  }
}
