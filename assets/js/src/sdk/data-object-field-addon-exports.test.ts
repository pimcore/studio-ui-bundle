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
import type { DataObjectFieldAddonProps } from '@sdk/modules/data-object'
import type { componentConfig } from '@sdk/modules/app'

export type SdkPublicApi = [
  DataObjectFieldAddonProps,
  (typeof componentConfig)['dataObject']['editor']['field']['after'],
  (typeof componentConfig)['dataObject']['editor']['field']['below'],
  (typeof componentConfig)['dataObject']['editor']['field']['label']
]

const barrel = (path: string): string => readFileSync(join(__dirname, path), 'utf8')

describe('SDK exports for data object field addons', () => {
  it('exports the props of a field addon from the data object module barrel', () => {
    expect(barrel('modules/data-object/index.ts')).toContain('export type { DataObjectFieldAddonProps }')
  })
})
