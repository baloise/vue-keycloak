import { Plugin } from 'vue'
import Keycloak from 'keycloak-js'
import { defaultInitConfig } from './const'
import { createKeycloak, initKeycloak } from './keycloak'
import { isPromise, isFunction, isNil } from './utils'

type KeycloakConfigFactory = () => Keycloak.KeycloakConfig
type KeycloakConfigAsyncFactory = () => Promise<Keycloak.KeycloakConfig>

interface VueKeycloakPluginConfig {
  config: Keycloak.KeycloakConfig | KeycloakConfigFactory | KeycloakConfigAsyncFactory
  init?: Keycloak.KeycloakInitOptions
}

export const vueKeycloak: Plugin = {
  async install(app, options: VueKeycloakPluginConfig) {
    let keycloakConfig: Keycloak.KeycloakConfig
    if (isNil(options) || isNil(options.config)) {
      throw new Error('The Keycloak.KeycloakConfig are requried')
    }

    if (isPromise(options.config)) {
      keycloakConfig = await (options.config as KeycloakConfigAsyncFactory)()
    } else {
      if (isFunction(options.config)) {
        keycloakConfig = (options.config as KeycloakConfigFactory)()
      } else {
        keycloakConfig = options.config as Keycloak.KeycloakConfig
      }
    }

    if (isNil(keycloakConfig)) {
      throw new Error('The Keycloak.KeycloakConfig are requried')
    }

    if (isNil(keycloakConfig.clientId)) {
      throw new Error('Client ID is missing in Keycloak.KeycloakConfig')
    }

    if (isNil(keycloakConfig.realm)) {
      throw new Error('REALM is missing in Keycloak.KeycloakConfig')
    }

    if (isNil(keycloakConfig.url)) {
      throw new Error('URL is missing in Keycloak.KeycloakConfig')
    }

    const _keycloak = createKeycloak(keycloakConfig)
    app.config.globalProperties.$keycloak = _keycloak

    const initConfig: Keycloak.KeycloakInitOptions = !isNil(options.init) ? options.init : {}
    await initKeycloak({
      ...defaultInitConfig,
      ...initConfig,
    })
  },
}
