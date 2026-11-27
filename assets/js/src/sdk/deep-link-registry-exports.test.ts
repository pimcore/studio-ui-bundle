/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { readFileSync } from 'fs'
import { join } from 'path'
// Type-only: the barrels pull in untranspiled antd-style, which Jest cannot load; `check-types` fails if a name leaves the SDK.
import type { DeepLinkHandler, DeepLinkRegistry, DeepLinkRegistryInterface } from '@sdk/modules/app'
import type { serviceIds } from '@sdk/app'

export type SdkPublicApi = [
  DeepLinkHandler,
  DeepLinkRegistryInterface,
  typeof DeepLinkRegistry,
  (typeof serviceIds)['App/DeepLinkRegistry/DeepLinkRegistry']
]

const barrel = (path: string): string => readFileSync(join(__dirname, path), 'utf8')

describe('SDK exports for registering a deep link handler', () => {
  it('exports the deep link registry from the app module barrel', () => {
    expect(barrel('modules/app/index.ts')).toContain("export * from '@Pimcore/modules/app/deep-link-registry'")
  })
})
