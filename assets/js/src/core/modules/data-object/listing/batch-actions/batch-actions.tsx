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

import { DropdownButton } from '@Pimcore/components/dropdown-button/dropdown-button'
import React, { useState } from 'react'
import { Icon } from '@Pimcore/components/icon/icon'
import { useTranslation } from 'react-i18next'
import { Dropdown, type DropdownMenuProps } from '@Pimcore/components/dropdown/dropdown'
import { useRowSelectionOptional } from '@Pimcore/modules/element/listing/decorators/row-selection/context-layer/provider/use-row-selection-optional'
import { BatchEditProvider } from './batch-edit-modal/batch-edit-provider'
import { BatchEditModal } from './batch-edit-modal/batch-edit-modal'
import { CsvModal } from '@Pimcore/modules/element/listing/batch-actions/csv-modal/csv-modal'
import { XlsxModal } from '@Pimcore/modules/element/listing/batch-actions/xlsx-modal/xlsx-modal'

export const BatchActions = (): React.JSX.Element => {
  const rowSelection = useRowSelectionOptional()
  const [batchEditModalOpen, setBatchEditModalOpen] = useState<boolean>(false)
  const [csvModalOpen, setCsvModalOpen] = useState<boolean>(false)
  const [xlsxModalOpen, setXlsxModalOpen] = useState<boolean>(false)

  const { t } = useTranslation()

  if (rowSelection === undefined) {
    return <></>
  }

  const { selectedRows } = rowSelection
  const hasSelectedItems = selectedRows !== undefined ? Object.keys(selectedRows).length > 0 : false

  const menu: DropdownMenuProps = {
    items: [
      {
        key: '1',
        label: t('listing.actions.batch-edit'),
        icon: <Icon value={ 'batch-selection' } />,
        onClick: () => {
          setBatchEditModalOpen(true)
        }
      },
      {
        key: '2',
        label: t('listing.actions.export'),
        icon: <Icon value={ 'export' } />,
        children: [
          {
            key: '2.1',
            label: t('listing.actions.csv-export'),
            icon: <Icon value={ 'export' } />,
            onClick: () => {
              setCsvModalOpen(true)
            }
          },
          {
            key: '2.2',
            label: t('listing.actions.xlsx-export'),
            icon: <Icon value={ 'export' } />,
            onClick: () => {
              setXlsxModalOpen(true)
            }
          }
        ]
      }
    ]
  }

  return (
    <>
      <Dropdown
        menu={ menu }
      >
        <DropdownButton key={ 'dropdown-button' }>{hasSelectedItems ? t('listing.actions') : t('listing.non-selected.actions')}</DropdownButton>
      </Dropdown>

      <CsvModal
        open={ csvModalOpen }
        setOpen={ setCsvModalOpen }
      />

      <XlsxModal
        open={ xlsxModalOpen }
        setOpen={ setXlsxModalOpen }
      />

      <BatchEditProvider>
        <BatchEditModal
          batchEditModalOpen={ batchEditModalOpen }
          setBatchEditModalOpen={ setBatchEditModalOpen }
        />
      </BatchEditProvider>
    </>
  )
}
