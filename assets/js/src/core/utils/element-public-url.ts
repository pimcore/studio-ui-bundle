/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isNil } from 'lodash'

interface IBuildElementPublicUrlProps {
  fullPath: string
  currentDomain: string
  assetFrontendPrefix?: string | null
}

/**
 * `assetFrontendPrefix` (assets.frontend_prefixes.source) may be configured as a relative path
 * (e.g. '/dam'), a protocol-relative host (e.g. '//cdn.example.com') or an absolute URL
 * (e.g. 'https://cdn.example.com'). Resolving it against `currentDomain` via the URL constructor
 * covers all three: a relative/protocol-relative prefix is completed into an absolute URL, while
 * an already-absolute prefix passes through unchanged since the base is ignored.
 */
export function buildElementPublicUrl ({ fullPath, currentDomain, assetFrontendPrefix }: IBuildElementPublicUrlProps): string {
  if (!isNil(assetFrontendPrefix)) {
    return new URL(`${assetFrontendPrefix}${fullPath}`, currentDomain).toString()
  }

  return `${currentDomain}${fullPath}`
}
