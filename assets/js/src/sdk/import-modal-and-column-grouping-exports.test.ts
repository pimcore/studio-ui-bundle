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
  FileDropZone,
  FileDropZoneProps,
  FileUploadStatus,
  SelectedFileView,
  SelectedFileViewProps
} from '@sdk/components'
import type { buildColumnPickerGroups } from '@sdk/modules/element'

export type SdkPublicApi = [
  typeof FileDropZone,
  FileDropZoneProps,
  typeof SelectedFileView,
  SelectedFileViewProps,
  FileUploadStatus,
  typeof buildColumnPickerGroups
]

const barrel = (path: string): string => readFileSync(join(__dirname, path), 'utf8')

describe('SDK exports for building an own file step and field picker', () => {
  it('exports the import modal parts from the components barrel', () => {
    const source = barrel('components/index.ts')

    expect(source).toContain("export * from '@Pimcore/components/import-modal/components/file-drop-zone/file-drop-zone'")
    expect(source).toContain("export * from '@Pimcore/components/import-modal/components/selected-file-view/selected-file-view'")
    expect(source).toContain("export type { FileUploadStatus } from '@Pimcore/components/import-modal/hooks/use-file-upload'")
  })

  it('exports the column grouping from the element barrel', () => {
    expect(barrel('modules/element/index.ts')).toMatch(/export \{ buildColumnPickerGroups \} from '[^']*\/available-columns-provider'/)
  })
})
