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

A small wrapper library for the [Keycloak JavaScript adapter](https://www.keycloak.org/docs/latest/securing_apps/#_javascript_adapter).

> The library is made for [Vue 3.x.x](https://v3.vuejs.org/) and the [Composiotion API](https://v3.vuejs.org/api/composition-api.html).

## Instalation

Install the [keycloak-js](https://www.keycloak.org/docs/latest/securing_apps/#_javascript_adapter) package , [jwt-decode](https://www.npmjs.com/package/jwt-decode) to decode the jwt token and our wrapper library with npm.

```bash
npm install keycloak-js jwt-decode @baloise/vue-keycloak
```

## Use plugin

Import the library into your `src/main.ts` file or any other entry point.

```typescript
import { vueKeycloak } from '@baloise/vue-keycloak'
```

Apply the library to the vue app instance.

```typescript
const app = createApp(App)

app.use(vueKeycloak, {
  initOptions: {
    flow: 'standard', // default
    checkLoginIframe: false, // default
    onLoad: 'login-required', // default
  }
  config: {
    url: 'http://keycloak-server/auth',
    realm: 'myrealm',
    clientId: 'myapp'
  }
})
```

Or use a JSON file with the configs.

```typescript
app.use(vueKeycloak, '/keycloak.json')
```

### Configuration

| Config      | Type                           | Description                              |
| ----------- | ------------------------------ | ---------------------------------------- |
| initOptions | `Keycloak.KeycloakInitOptions` | `initOptions` is Keycloak init options.  |
| config      | `Keycloak.KeycloakConfig`      | `config` are the Keycloak configuration. |

Use the example below to generate dynamic Keycloak conifiguration.

```typescript
app.use(vueKeycloak, async () => {
  return {
    config: {
      url: (await getAuthBaseUrl()) + '/auth',
      realm: 'myrealm',
      clientId: 'myapp',
    },
    initOptions: {
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
    },
  }
})
```

> It is also possible to access the keycloak instance with `getKeycloak()`

## Use Token

We export two helper functions for the token.

### getToken

This function checks if the token is still valid and will update it if it is expired.

> Have a look at our [vueAxios](https://github.com/baloise/vue-axios) plugin.

```typescript
import { $axios } from '@baloise/vue-axios'
import { getToken } from '@baloise/vue-keycloak'

const axiosApiInstance = $axios.create()

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async config => {
    const token = await getToken()
    config.headers = {
      Authorization: `Bearer ${token}`,
    }
    return config
  },
  error => {
    Promise.reject(error)
  },
)
```

## Composition API

```typescript
import { computed, defineComponent } from 'vue'
import { useKeycloak } from '@baloise/vue-keycloak'

export default defineComponent({
  setup() {
    const { hasRoles, isPending } = useKeycloak()

    const hasAccess = computed(() => hasRoles(['RoleName']))

    return {
      hasAccess,
    }
  },
})
```

### useKeycloak

The `useKeycloak` function exposes the following reactive state.

```typescript
import { useKeycloak } from '@baloise/vue-keycloak'

const {
  isAuthenticated,
  isPending,
  hasFailed,
  token,
  decodedToken,
  username,
  roles,
  resourceRoles,
  keycloak,

  // Functions
  hasRoles,
  hasResourceRoles,
} = useKeycloak()
```

| State           | Type                           | Description                                                         |
| --------------- | ------------------------------ | ------------------------------------------------------------------- |
| isAuthenticated | `Ref<boolean>`                 | If `true` the user is authenticated.                                |
| isPending       | `Ref<boolean>`                 | If `true` the authentication request is still pending.              |
| hasFailed       | `Ref<boolean>`                 | If `true` authentication request has failed.                        |
| token           | `Ref<string>`                  | `token` is the raw value of the JWT token.                          |
| decodedToken    | `Ref<T>`                       | `decodedToken` is the decoded value of the JWT token.               |
| username        | `Ref<string>`                  | `username` the name of our user.                                    |
| roles           | `Ref<string[]>`                | `roles` is a list of the users roles.                               |
| resourceRoles   | `Ref<Record<string, string[]>` | `resourceRoles` is a list of the users roles in specific resources. |
| keycloak        | `Keycloak.KeycloakInstance`    | `keycloak` is the instance of the keycloak-js adapter.              |

#### Functions

| Function         | Type                                             | Description                                                                        |
| ---------------- | ------------------------------------------------ | ---------------------------------------------------------------------------------- |
| hasRoles         | `(roles: string[]) => boolean`                   | `hasRoles` returns true if the user has all the given roles.                       |
| hasResourceRoles | `(roles: string[], resource: string) => boolean` | `hasResourceRoles` returns true if the user has all the given roles in a resource. |

# License

Apache-2.0 Licensed | Copyright © 2021-present Gery Hirschfeld & Contributors
