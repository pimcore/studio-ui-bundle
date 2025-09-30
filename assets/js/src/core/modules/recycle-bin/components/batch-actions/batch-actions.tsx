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

interface BatchActionsProps {
  items: RecycleBin[]
}

export const BatchActions = ({ items }: BatchActionsProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { selectedRows } = useSelectedRowsContext()
  const { removeItems, restoreItems } = useRecycleBin()

  const getItemToSelectedRowsId = (): RecycleBin[] => {
    return Object.keys(selectedRows)
      .map((key) => {
        return items.find((item) => item.id === parseInt(key, 10))
      })
      .filter((item): item is RecycleBin => item !== undefined)
  }

  const removeItemsFromSelectedRows = (itemsToRestore: RecycleBin[]): void => {
    Object.keys(selectedRows).forEach((key) => {
      const itemId = parseInt(key, 10)
      if (itemsToRestore.find((item) => item.id === itemId)) {
        delete selectedRows[itemId]
      }
    })
  }

  const menu: DropdownMenuProps = {
    items: [
      {
        key: '1',
        label: t('recycle-bin.actions.delete'),
        icon: <Icon value={'trash'} />,
        onClick: () => {
          const itemsToDelete = getItemToSelectedRowsId()

          void removeItems(itemsToDelete, () => {
            removeItemsFromSelectedRows(itemsToDelete)
          })
        }
      },
      {
        key: '2',
        label: t('recycle-bin.actions.restore'),
        icon: <Icon value={'restore'} />,
        onClick: () => {
          const itemsToRestore = getItemToSelectedRowsId()

          void restoreItems(itemsToRestore, () => {
            removeItemsFromSelectedRows(itemsToRestore)
          })
        }
      }
    ]
  }

  return (
    <Dropdown
      menu={menu}
    >
      <DropdownButton key={'dropdown-button'}>{t('listing.actions')}</DropdownButton>
    </Dropdown>
  )
}
