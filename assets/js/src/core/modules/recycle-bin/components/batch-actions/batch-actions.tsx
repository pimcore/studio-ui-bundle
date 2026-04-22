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
import { type RecycleBin } from '../../recycle-bin-api-slice.gen'

export const BatchActions = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { selectedRows, selectedRowsTypes, resetSelectedRows } = useSelectedRowsContext()
  const { removeItems, restoreItems } = useRecycleBin()

  const getSelectedItems = (): Array<Pick<RecycleBin, 'id' | 'type'>> => {
    return Object.keys(selectedRows).map((id): Pick<RecycleBin, 'id' | 'type'> => ({
      id: Number.parseInt(id, 10),
      type: selectedRowsTypes[id] ?? ''
    }))
  }

  const menu: DropdownMenuProps = {
    items: [
      {
        key: '1',
        label: t('recycle-bin.actions.delete'),
        icon: <Icon value={ 'trash' } />,
        onClick: () => {
          void removeItems(getSelectedItems(), () => {
            resetSelectedRows()
          })
        }
      },
      {
        key: '2',
        label: t('recycle-bin.actions.restore'),
        icon: <Icon value={ 'restore' } />,
        onClick: () => {
          void restoreItems(getSelectedItems(), () => {
            resetSelectedRows()
          })
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
