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
import { type IFieldWidthContext } from '@sdk/modules/element'

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
  defaultFieldWidth: IFieldWidthContext
}

export type GridCellColumnMeta = ColumnMetaType & { type: string }

@injectable()
export abstract class DynamicTypeDocumentEditableAbstract implements DynamicTypeAbstract {
  abstract readonly id: string
  // if true, the editable will be rendered inside a shadow DOM with embedded styles. if false, it will be rendered in the normal DOM and styles need to be applied individually
  useShadowDom: boolean = true

  abstract getEditableDataComponent (props: AbstractDocumentEditableDefinition): ReactElement<AbstractDocumentEditableDefinition>

  transformValue (value: any, props: AbstractDocumentEditableDefinition): any {
    return value
  }

  getLabel (props: AbstractDocumentEditableDefinition): React.ReactElement | undefined {
    return undefined
  }
}
