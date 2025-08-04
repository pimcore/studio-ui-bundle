/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ReactElement } from 'react'
import { injectable } from 'inversify'
import { DynamicTypeRegistryAbstract } from '../../registry/dynamic-type-registry-abstract'
import { type AbstractEditableDialogLayoutDefinition, type DynamicTypeEditableDialogLayoutAbstract } from './dynamic-type-editable-dialog-layout-abstract'

@injectable()
export class DynamicTypeEditableDialogLayoutRegistry extends DynamicTypeRegistryAbstract<DynamicTypeEditableDialogLayoutAbstract> {
  getComponent (id: string, props: AbstractEditableDialogLayoutDefinition): ReactElement<AbstractEditableDialogLayoutDefinition> {
    return this.getDynamicType(id).getEditableDialogLayoutComponent(props)
  }
}
