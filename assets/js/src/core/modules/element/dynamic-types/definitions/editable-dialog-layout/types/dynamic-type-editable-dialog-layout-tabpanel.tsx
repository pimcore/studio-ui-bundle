/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { injectable } from 'inversify'
import { Tabs } from '@sdk/components'
import { isArray } from 'lodash'
import { DynamicTypeEditableDialogLayoutAbstract, type AbstractEditableDialogLayoutDefinition } from '../dynamic-type-editable-dialog-layout-abstract'

@injectable()
export class DynamicTypeEditableDialogLayoutTabpanel extends DynamicTypeEditableDialogLayoutAbstract {
  id: string = 'tabpanel'

  getEditableDialogLayoutComponent (props: AbstractEditableDialogLayoutDefinition): React.ReactElement<AbstractEditableDialogLayoutDefinition> {
    const { configItem, onRenderNestedContent } = props

    if (!isArray(configItem.items)) {
      return <></>
    }

    const tabItems = configItem.items.map((item, index) => ({
      key: `tab-${index}`,
      label: item.title ?? `Tab ${index + 1}`,
      children: onRenderNestedContent(item)
    }))

    return (
      <Tabs
        items={tabItems}
        type="card"
      />
    )
  }
}