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
import { type CollectionAddButtonProps } from '../collection/collection'
import React from 'react'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { useTranslation } from 'react-i18next'

export interface ObjectBrickAddButtonProps extends CollectionAddButtonProps {
  allowedTypes: string[]
}

export const ObjectBrickAddButton = (props: ObjectBrickAddButtonProps): React.JSX.Element => {
  const { operation, allowedTypes } = props
  const { t } = useTranslation()

  // @todo filter allowedTypes based on the current assigned bricks
  const dropdownItems: DropdownMenuProps['items'] = allowedTypes.map((type) => {
    return {
      key: type,
      label: type,
      onClick: (e) => {
        e.domEvent.stopPropagation()
        operation.add({ type })
      }
    }
  })

  return (
    <Dropdown
      menu={ { items: dropdownItems } }
    >
      <IconTextButton
        icon={ { value: 'new' } }
        onClick={ (e) => { e.stopPropagation() } }
      >{t('add')}</IconTextButton>
    </Dropdown>
  )
}
