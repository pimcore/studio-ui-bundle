/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import { Dropdown, type DropdownMenuProps } from '@Pimcore/components/dropdown/dropdown'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import React from 'react'
import { type FieldCollectionProps } from './field-collection'
import { useTranslation } from 'react-i18next'
import { useNumberedList } from '@Pimcore/components/form/numbered-list/provider/numbered-list/use-numbered-list'

export interface FieldCollectionAddButtonProps {
  allowedTypes: FieldCollectionProps['allowedTypes']
}

export const FieldCollectionAddButton = (props: FieldCollectionAddButtonProps): React.JSX.Element => {
  const { allowedTypes } = props
  const { operations } = useNumberedList()
  const { t } = useTranslation()

  const fieldCollectionDropdownItems: DropdownMenuProps['items'] = allowedTypes.map((type) => {
    return {
      key: type,
      label: type,
      onClick: (e) => {
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
