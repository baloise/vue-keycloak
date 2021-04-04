<table align="center" cellspacing="0" cellpadding="0" style="border: none;">
<tr style="border: none;">
  <td style="border: none;">
    <img width="200px" src="https://vuejs.org/images/logo.png" />
  </td>
  <td style="border: none;">
    <h1 style="font-size: 10em">+</h1>
  </td>
  <td style="border: none;">
    <img width="200px" src="https://www.keycloak.org/resources/images/keycloak_logo_480x108.png" />
  </td>
</tr>
</table>

# vue-keycloak

Keycloak plugin for Vue3 and Composition API

## Instalation

Install the [keycloak-js](https://www.keycloak.org/docs/latest/securing_apps/#_javascript_adapter) package , [jwt-decode](https://www.npmjs.com/package/jwt-decode) to decode the jwt token and our wrapper library.

```bash
npm install keycloak-js jwt-decode @baloise/vue-keycloak
```

## Use plugin

```typescript
import { createApp } from 'vue'
import { vueKeycloak } from '@baloise/vue-keycloak'
import App from './app/App.vue'

createApp(App).use(vueKeycloak, {
  init: {
    flow: 'standard', // default
    checkLoginIframe: false, // default
    onLoad: 'login-required', // default
  }
  config: {
    url: 'http://keycloak-server/auth',
    realm: 'myrealm',
    clientId: 'myapp'
  }
}).mount('#app')
```

## Composable

```typescript
import { computed, defineComponent } from 'vue'
import { useKeycloak } from '@baloise/vue-keycloak'

export default defineComponent({
  setup() {
    const { hasRole, isPending } = useKeycloak()

    const hasAccess = computed(() => hasRole('RoleName'))

    return {
      hasAccess,
    }
  },
})
```

# License

Apache-2.0 Licensed | Copyright © 2021-present Gery Hirschfeld & Contributors
