import { Plugin, isVue3, Vue2 } from 'vue-demi'
import Keycloak from 'keycloak-js'
import { defaultInitConfig } from './const'
import { createKeycloak, initKeycloak } from './keycloak'
import { isPromise, isFunction, isNil, isString } from './utils'
import { loadJsonConfig } from './config'

interface KeycloakPluginConfig {
  config: Keycloak.KeycloakConfig
  initOptions?: Keycloak.KeycloakInitOptions
}

type KeycloakConfigFactory = () => KeycloakPluginConfig
type KeycloakConfigAsyncFactory = () => Promise<KeycloakPluginConfig>

type VueKeycloakPluginConfig = string | KeycloakPluginConfig | KeycloakConfigFactory | KeycloakConfigAsyncFactory

export const vueKeycloak: Plugin = {
  async install(app, options: VueKeycloakPluginConfig) {
    if (isNil(options)) {
      throw new Error('The Keycloak.KeycloakConfig are requried')
    }

    let keycloakPluginConfig: KeycloakPluginConfig
    if (isString(options)) {
      keycloakPluginConfig = await loadJsonConfig(options as string)
    } else if (isPromise(options) || isFunction(options)) {
      keycloakPluginConfig = await (options as KeycloakConfigAsyncFactory)()
    } else {
      keycloakPluginConfig = options as KeycloakPluginConfig
    }

    const keycloakConfig = keycloakPluginConfig.config
    const keycloakInitOptions: Keycloak.KeycloakInitOptions = !isNil(keycloakPluginConfig.initOptions)
      ? { ...defaultInitConfig, ...keycloakPluginConfig.initOptions }
      : defaultInitConfig

    const _keycloak = createKeycloak(keycloakConfig)
    if (isVue3) {
      app.config.globalProperties.$keycloak = _keycloak
    } else {
      Vue2.prototype.$keycloak = _keycloak
    }

    await initKeycloak(keycloakInitOptions)
  },
}
