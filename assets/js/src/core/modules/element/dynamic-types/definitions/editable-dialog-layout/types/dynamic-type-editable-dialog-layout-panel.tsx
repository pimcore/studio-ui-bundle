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
import { Space } from '@sdk/components'
import { isArray } from 'lodash'
import { DynamicTypeEditableDialogLayoutAbstract, type AbstractEditableDialogLayoutDefinition } from '../dynamic-type-editable-dialog-layout-abstract'

@injectable()
export class DynamicTypeEditableDialogLayoutPanel extends DynamicTypeEditableDialogLayoutAbstract {
  id: string = 'panel'

  getEditableDialogLayoutComponent (props: AbstractEditableDialogLayoutDefinition): React.ReactElement<AbstractEditableDialogLayoutDefinition> {
    const { configItem, onRenderNestedContent } = props

    if (!isArray(configItem.items)) {
      return <></>
    }

    return (
      <Space
        direction="vertical"
        size="medium"
        style={{ width: '100%' }}
      >
        {configItem.items.map((item, index) => (
          <div key={`panel-item-${index}`}>
            {onRenderNestedContent(item)}
          </div>
        ))}
      </Space>
    )
  }
}