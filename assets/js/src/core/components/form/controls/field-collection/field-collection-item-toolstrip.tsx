/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useCallback } from 'react'
import { ToolStrip } from '../../../toolstrip/tool-strip'
import { useFieldCollection } from './field-collection-provider'
import { useNumberedListContext, useNumberedListSelector, useNumberedListValue } from '../numbered-list/provider/numbered-list/use-numbered-list-value'
import { useTranslation } from 'react-i18next'
import { IconButton } from '../../../icon-button/icon-button'
import { Space } from '../../../space/space'
import { FieldCollectionAddControl } from './field-collection-add-control'

export interface FieldCollectionItemToolStripProps {
  field: number
}

const selectCount = (values: any[]): number => values?.length ?? 0

export const FieldCollectionItemToolStrip = React.memo((props: FieldCollectionItemToolStripProps): React.JSX.Element => {
  const { field } = props
  const { operations } = useNumberedListContext()
  const value = useNumberedListValue([field])
  const count = useNumberedListSelector(selectCount)
  const type = value?.type
  const { registry, maxItems, disallowAddRemove, disallowReorder, addLabel } = useFieldCollection()
  const registryItem = registry.getItemByType(type as string)
  const { t } = useTranslation()
  const hasMaxItems = maxItems !== undefined && count >= maxItems

  const handleMoveDown = useCallback(() => { operations.move(field, field + 1) }, [operations, field])
  const handleMoveUp = useCallback(() => { operations.move(field, field - 1) }, [operations, field])
  const handleRemove = useCallback(() => { operations.remove(field) }, [operations, field])

  if (registryItem === undefined) {
    throw new Error(`No registry item found for type "${type}"`)
  }

  return (
    <ToolStrip title={ t(registryItem.translationKey) }>
      <FieldCollectionAddControl
        addLabel={ addLabel }
        disabled={ hasMaxItems || disallowAddRemove }
        field={ field }
      />

      <Space size="mini">
        <IconButton
          disabled={ disallowReorder }
          icon={ { value: 'chevron-down' } }
          onClick={ handleMoveDown }
          size="small"
        />

        <IconButton
          disabled={ disallowReorder }
          icon={ { value: 'chevron-up' } }
          onClick={ handleMoveUp }
          size="small"
        />
      </Space>

      <IconButton
        disabled={ disallowAddRemove }
        icon={ { value: 'trash' } }
        onClick={ handleRemove }
        size="small"
      />
    </ToolStrip>
  )
})
FieldCollectionItemToolStrip.displayName = 'FieldCollectionItemToolStrip'
