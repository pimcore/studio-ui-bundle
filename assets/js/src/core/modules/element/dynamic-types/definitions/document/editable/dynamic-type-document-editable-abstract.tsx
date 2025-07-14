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
  containerRef?: React.RefObject<HTMLDivElement>
}

export type GridCellColumnMeta = ColumnMetaType & { type: string }

@injectable()
export abstract class DynamicTypeDocumentEditableAbstract implements DynamicTypeAbstract {
  abstract readonly id: string

  abstract getEditableDataComponent (props: AbstractDocumentEditableDefinition): ReactElement<AbstractDocumentEditableDefinition>

  transformValue (value: any, props: AbstractDocumentEditableDefinition): any {
    return value
  }

  getLabel (props: AbstractDocumentEditableDefinition): React.ReactElement | undefined {
    return undefined
  }

  /**
   * Helper method to check if the editable has reload config enabled
   */
  protected hasReloadConfig (props: AbstractDocumentEditableDefinition): boolean {
    return Boolean(props.config?.reload)
  }

  /**
   * Determines if the editable should trigger immediate auto-save and reload on change
   * @param props The editable props
   * @returns true if should reload on change, false for normal debounced auto-save
   */
  reloadOnChange (props: AbstractDocumentEditableDefinition): boolean {
    return this.hasReloadConfig(props)
  }
}
