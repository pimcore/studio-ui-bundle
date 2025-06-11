/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { injectable } from 'inversify'
import { type DynamicTypeAbstract } from '../../../registry/dynamic-type-registry-abstract'
import { type ReactElement } from 'react'
import { type ColumnMetaType } from '@Pimcore/components/grid/grid'


export interface AbstractDocumentEditableDefinition {
  id: string
  name: string
  realName: string
  data: any
  config: any
  type: string
  inherited: boolean
  inDialogBox: string | null
  value?: any
  onChange?: (value: any) => void
}

export type GridCellColumnMeta = ColumnMetaType & { type: string }

@injectable()
export abstract class DynamicTypeDocumentEditableAbstract implements DynamicTypeAbstract {
  abstract readonly id: string
  initializeInIframe: boolean = false

  abstract getEditableDataComponent (props: AbstractDocumentEditableDefinition): ReactElement<AbstractDocumentEditableDefinition>

}
