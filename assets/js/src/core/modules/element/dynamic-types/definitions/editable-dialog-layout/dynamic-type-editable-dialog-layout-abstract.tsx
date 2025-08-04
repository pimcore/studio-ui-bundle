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
import { DynamicTypeAbstract } from '../../registry/dynamic-type-registry-abstract'
import { type DialogConfigItem } from '@Pimcore/modules/document/editor/shared-tab-manager/tabs/edit/components/editables-dialog/types'

export interface AbstractEditableDialogLayoutDefinition {
  configItem: DialogConfigItem
  onRenderNestedContent: (configItem: DialogConfigItem) => ReactElement
}

@injectable()
export abstract class DynamicTypeEditableDialogLayoutAbstract extends DynamicTypeAbstract {
  abstract readonly id: string
  abstract getEditableDialogLayoutComponent (props: AbstractEditableDialogLayoutDefinition): ReactElement<AbstractEditableDialogLayoutDefinition>
}