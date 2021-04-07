import Keycloak from 'keycloak-js'
import { hasFailed, isAuthenticated, isPending, setToken } from './state'
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
  return updateToken()
}

export async function isLoggedIn(): Promise<boolean> {
  try {
    if (!$keycloak.authenticated) {
      return false
    }
    await this.updateToken()
    return true
  } catch (error) {
    return false
  }
}

export async function updateToken(): Promise<string> {
  if (!$keycloak) {
    throw new Error('Keycloak is not initialized.')
  }

  try {
    await $keycloak.updateToken(10)
    setToken($keycloak.token as string)
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
      setToken($keycloak.token as string)
    }

    $keycloak.onAuthRefreshSuccess = () => setToken($keycloak.token as string)
    $keycloak.onTokenExpired = () => updateToken()
  } catch (error) {
    hasFailed(true)
    isAuthenticated(false)
    throw new Error('Could not read access token')
  } finally {
    isPending(false)
  }
}
