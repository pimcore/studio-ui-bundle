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
import { ToolStrip } from '../../../toolstrip/tool-strip'
import { useFieldCollection } from './field-collection-provider'
import { useNumberedList } from '../numbered-list/provider/numbered-list/use-numbered-list'
import { useTranslation } from 'react-i18next'
import { IconButton } from '../../../icon-button/icon-button'
import { Space } from '../../../space/space'
import { FieldCollectionAddControl } from './field-collection-add-control'

export interface FieldCollectionItemToolStripProps {
  field: number
}

export const FieldCollectionItemToolStrip = (props: FieldCollectionItemToolStripProps): React.JSX.Element => {
  const { field } = props
  const { values, getValueByKey, operations } = useNumberedList()
  const value = getValueByKey(field.toString())
  const type = value?.type
  const { registry, maxItems, disallowAddRemove, disallowReorder } = useFieldCollection()
  const registryItem = registry.getItemByType(type as string)
  const { t } = useTranslation()
  const hasMaxItems = maxItems !== undefined && values.length >= maxItems

  if (registryItem === undefined) {
    throw new Error(`No registry item found for type "${type}"`)
  }

  return (
    <ToolStrip title={ t(registryItem.translationKey) }>
      <FieldCollectionAddControl
        disabled={ hasMaxItems || disallowAddRemove }
        field={ field }
      />

      <Space size="mini">
        <IconButton
          disabled={ disallowReorder }
          icon={ { value: 'move-down' } }
          onClick={ () => { operations.move(field, field + 1) } }
          size="small"
        />

        <IconButton
          disabled={ disallowReorder }
          icon={ { value: 'move-up' } }
          onClick={ () => { operations.move(field, field - 1) } }
          size="small"
        />
      </Space>

      <IconButton
        disabled={ disallowAddRemove }
        icon={ { value: 'trash' } }
        onClick={ () => { operations.remove(field) } }
        size="small"
      />
    </ToolStrip>
  )
}
