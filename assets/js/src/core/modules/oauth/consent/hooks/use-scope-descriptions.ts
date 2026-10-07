/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useTranslation } from 'react-i18next'

export interface ScopeDescription {
  /** The raw scope string as sent by the backend. */
  scope: string
  /** Human-readable label. Falls back to the raw scope for unknown values. */
  label: string
  /** Optional longer explanation. Undefined for unknown scopes. */
  description?: string
}

/**
 * i18n keys must not contain ':' (i18next treats it as the namespace
 * separator), so scope strings are slugified for the key lookup:
 * `mcp:read` -> `oauth.consent.scope.mcp-read.label`.
 */
const toKeySegment = (scope: string): string => scope.replaceAll(':', '-')

/**
 * Describes a scope from the translation catalogue, which is the only place a
 * scope has to be registered for this screen. A bundle declares its scopes as
 * the `scopesSupported` of a protected resource, contributed by a service
 * implementing `ProtectedResourceProviderInterface` in the Studio Backend
 * Bundle, and describes them here by shipping
 * `oauth.consent.scope.<slug>.label` / `.description` keys. A scope with no
 * keys is still shown, using its raw identifier, so nothing is ever granted
 * without appearing on the screen.
 *
 * `i18n.exists()` rather than `t()` with a default: the app runs i18next with
 * `saveMissing`, so looking a key up that does not exist would report every
 * third-party scope as a missing translation.
 */
export const useScopeDescriptions = (): ((scopes: string[]) => ScopeDescription[]) => {
  const { t, i18n } = useTranslation()

  return (scopes: string[]): ScopeDescription[] =>
    scopes.map((scope) => {
      const segment = toKeySegment(scope)
      const labelKey = `oauth.consent.scope.${segment}.label`
      const descriptionKey = `oauth.consent.scope.${segment}.description`

      return {
        scope,
        label: i18n.exists(labelKey) ? t(labelKey) : scope,
        description: i18n.exists(descriptionKey) ? t(descriptionKey) : undefined
      }
    })
}
