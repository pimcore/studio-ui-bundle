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
import type {
  ClassificationStoreFieldPickerProvider,
  ClassificationStoreFieldValue,
  useClassificationStoreFieldPicker
} from '@sdk/modules/element'

export type SdkPublicApi = [
  typeof ClassificationStoreFieldPickerProvider,
  typeof useClassificationStoreFieldPicker,
  ClassificationStoreFieldValue
]

type OpenPickerArgs = Parameters<ReturnType<typeof useClassificationStoreFieldPicker>['openPicker']>[0]

// Pins the picker's signature: adding, removing or retyping a member fails `check-types`.
export const openArgs = {
  storeId: 1,
  fieldName: 'field',
  classId: 'class',
  onPick: (value: ClassificationStoreFieldValue) => value
} satisfies OpenPickerArgs

export const fieldValue = { groupId: 1, keyId: 2, keyName: 'key' } satisfies ClassificationStoreFieldValue

const barrel = (path: string): string => readFileSync(join(__dirname, path), 'utf8')

describe('SDK exports for opening the classification store field picker', () => {
  it('exports the picker provider, hook and value type from the element barrel', () => {
    const source = barrel('modules/element/index.ts')
    const path = "'@Pimcore/modules/element/dynamic-types/definitions/pipelines/grid/source-fields/classification-store/classification-store-field-picker-provider'"

    expect(source).toContain(`export { ClassificationStoreFieldPickerProvider, useClassificationStoreFieldPicker } from ${path}`)
    expect(source).toContain(`export type { ClassificationStoreFieldValue } from ${path}`)
  })
})
