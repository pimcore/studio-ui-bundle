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
  /** True when the frontend has an explicit label/i18n entry for this scope. */
  known: boolean
}

// Scopes the frontend knows how to describe. Unknown scopes are still shown
// (using their raw string) so nothing is ever silently granted.
const KNOWN_SCOPES = ['mcp:read', 'mcp:write']

/**
 * i18n keys must not contain ':' (i18next treats it as the namespace
 * separator), so scope strings are slugified for the key lookup:
 * `mcp:read` -> `oauth.consent.scope.mcp-read.label`.
 */
const toKeySegment = (scope: string): string => scope.replace(/:/g, '-')

export const useScopeDescriptions = (): ((scopes: string[]) => ScopeDescription[]) => {
  const { t } = useTranslation()

  return (scopes: string[]): ScopeDescription[] =>
    scopes.map((scope) => {
      const known = KNOWN_SCOPES.includes(scope)
      const segment = toKeySegment(scope)

      return {
        scope,
        known,
        label: known ? t(`oauth.consent.scope.${segment}.label`) : scope,
        description: known ? t(`oauth.consent.scope.${segment}.description`) : undefined
      }
    })
}
