/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useTranslation } from 'react-i18next'
import { Select, type SelectProps } from '../../../select/select'
import { useFieldCollection } from './field-collection-provider'
import { useNumberedList } from '../numbered-list/provider/numbered-list/use-numbered-list'
import React from 'react'

export interface FieldCollectionAddControlProps {
  size?: SelectProps['size']
  field?: number
  disabled?: boolean
  addLabel?: string
}

export const FieldCollectionAddControl = (props: FieldCollectionAddControlProps): React.JSX.Element => {
  const { size = 'small' } = props
  const { registry } = useFieldCollection()
  const { operations } = useNumberedList()
  const { t } = useTranslation()

  const items = registry.getItems()
  const selectOptions: SelectProps['options'] = items.map(item => ({
    label: t(item.translationKey),
    value: item.type
  }))

  const onSelect: SelectProps['onSelect'] = (value) => {
    operations.add({ type: value, data: {} }, props.field !== undefined ? props.field + 1 : undefined)
  }

  return (
    <Select
      disabled={ props.disabled }
      dropdownStyle={ { width: 200 } }
      onSelect={ onSelect }
      options={ selectOptions }
      placeholder={ props.addLabel ?? t('field-collection.add.default') }
      showSearch
      size={ size }
      style={ { width: 150 } }
      value={ null }
    />
  )
}
