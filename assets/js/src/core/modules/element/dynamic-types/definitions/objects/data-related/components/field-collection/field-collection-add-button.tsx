/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Dropdown, type DropdownMenuProps } from '@Pimcore/components/dropdown/dropdown'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import React from 'react'
import { type FieldCollectionProps } from './field-collection'
import { useTranslation } from 'react-i18next'
import { useNumberedList } from '@Pimcore/components/form/controls/numbered-list/provider/numbered-list/use-numbered-list'
import { useFieldCollection } from './providers/use-field-collection'

export interface FieldCollectionAddButtonProps {
  allowedTypes: FieldCollectionProps['allowedTypes']
}

export const FieldCollectionAddButton = (props: FieldCollectionAddButtonProps): React.JSX.Element => {
  const { allowedTypes } = props
  const { operations } = useNumberedList()
  const { t } = useTranslation()
  const fieldCollection = useFieldCollection()

  const fieldCollectionDropdownItems: DropdownMenuProps['items'] = allowedTypes.map((type) => {
    return {
      key: type,
      label: fieldCollection?.data?.items?.find(item => item.key === type)?.title === '' || fieldCollection?.data?.items?.find(item => item.key === type)?.title === undefined ? type : t(fieldCollection?.data?.items?.find(item => item.key === type).title as string),
      onClick: (e: any) => {
        e.domEvent.stopPropagation()
        operations.add({ type })
      }
    }
  })

  return (
    <Dropdown
      menu={ { items: fieldCollectionDropdownItems } }
    >
      <IconTextButton
        icon={ { value: 'new' } }
        onClick={ (e) => { e.stopPropagation() } }
      >{t('add')}</IconTextButton>
    </Dropdown>
  )
}
