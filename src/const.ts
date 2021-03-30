import Keycloak from 'keycloak-js'

export const defaultInitConfig: Keycloak.KeycloakInitOptions = {
  flow: 'standard',
  checkLoginIframe: false,
  onLoad: 'login-required',
}
