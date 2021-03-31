/* ============
 * Keycloak
 * ============
 *
 * Keycloak comes with a client-side JavaScript library that can be used to secure HTML5/JavaScript applications.
 * The JavaScript adapter has built-in support for Cordova applications.
 *
 * https://www.keycloak.org/docs/latest/securing_apps/#_javascript_adapter
 */

export { getToken, getKeycloak, isTokenReady } from './keycloak'
export * from './composable'
export * from './plugin'
