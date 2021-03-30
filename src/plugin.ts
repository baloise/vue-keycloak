import { Plugin } from 'vue'
import Keycloak from 'keycloak-js'
import { defaultInitConfig } from './const'
import { createKeycloak, initKeycloak } from './keycloak'

interface VueKeycloakPluginConfig {
  config: Keycloak.KeycloakConfig
  init?: Keycloak.KeycloakInitOptions
}

export const vueKeycloak: Plugin = {
  async install(app, config: VueKeycloakPluginConfig) {
    const _keycloak = createKeycloak(config.config)
    app.config.globalProperties.$keycloak = _keycloak

    const initConfig: Keycloak.KeycloakInitOptions = config.init !== undefined ? config.init : defaultInitConfig
    await initKeycloak(initConfig)
  },
}
