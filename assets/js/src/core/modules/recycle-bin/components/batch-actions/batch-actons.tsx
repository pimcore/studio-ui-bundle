/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { DropdownButton } from '@Pimcore/components/dropdown-button/dropdown-button'
import { Dropdown, type DropdownMenuProps } from '@Pimcore/components/dropdown/dropdown'
import { Icon } from '@Pimcore/components/icon/icon'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelectedRowsContext } from '../../context/selected-items-context'
import { useRecycleBin } from '../../hooks/use-recycle-bin'

export const BatchActions = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { selectedRows } = useSelectedRowsContext()
  const { removeItems, restoreItems } = useRecycleBin()

  const menu: DropdownMenuProps = {
    items: [
      {
        key: '1',
        label: t('recycle-bin.actions.delete'),
        icon: <Icon value={ 'trash' } />,
        onClick: () => {
          void removeItems(
            Object.keys(selectedRows).map(Number),
            () => {
              console.log('Items removed from recycle bin')
            }
          )
        }
      },
      {
        key: '2',
        label: t('recycle-bin.actions.restore'),
        icon: <Icon value={ 'restore' } />,
        onClick: () => {
          void restoreItems(
            Object.keys(selectedRows).map(Number),
            () => {
              console.log('Items restored from recycle bin')
            }
          )
        }
      }
    ]
  }

  return (
    <Dropdown
      menu={ menu }
    >
      <DropdownButton key={ 'dropdown-button' }>{t('listing.actions')}</DropdownButton>
    </Dropdown>
  )
}
