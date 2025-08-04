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

@injectable()
export abstract class DynamicTypeDocumentEditableAbstract implements DynamicTypeAbstract {
  abstract readonly id: string

  abstract getEditableDataComponent (props: AbstractDocumentEditableDefinition): ReactElement<AbstractDocumentEditableDefinition>

  transformValue (value: any, props: AbstractDocumentEditableDefinition): any {
    return value
  }

  transformValueForApi (value: any, props: AbstractDocumentEditableDefinition): any {
    return value
  }

  getLabel (props: AbstractDocumentEditableDefinition): React.ReactElement | undefined {
    return undefined
  }

  protected hasReloadConfig (props: AbstractDocumentEditableDefinition): boolean {
    return Boolean(props.config?.reload)
  }

  reloadOnChange (props: AbstractDocumentEditableDefinition, oldValue?: any, newValue?: any): boolean {
    return this.hasReloadConfig(props)
  }
}
