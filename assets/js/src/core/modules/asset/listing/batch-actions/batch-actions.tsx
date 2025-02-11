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
import React, { useEffect, useState } from 'react'
import { Icon } from '@Pimcore/components/icon/icon'
import {
  useAssetGetByIdQuery
} from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { useAsset } from '@Pimcore/modules/asset/hooks/use-asset'
import { CsvModal } from './csv-modal/csv-modal'
import { useTranslation } from 'react-i18next'
import { Dropdown, type DropdownMenuProps } from '@Pimcore/components/dropdown/dropdown'
import { useZipDownload } from '@Pimcore/modules/asset/actions/zip-download/use-zip-download'
import { useRowSelectionOptional } from '@Pimcore/modules/element/listing/decorators/row-selection/context-layer/provider/use-row-selection-optional'
import { useSettings } from '@Pimcore/modules/element/listing/abstract/settings/use-settings'
import { BatchEditProvider } from './batch-edit-modal/batch-edit-provider'
import { BatchEditModal } from './batch-edit-modal/batch-edit-modal'

export const BatchActions = (): React.JSX.Element => {
  const rowSelection = useRowSelectionOptional()
  const { id } = useAsset()
  const { useDataQueryHelper } = useSettings()
  const { getArgs } = useDataQueryHelper()

  const { createZipDownload: createZipFolderDownload } = useZipDownload({ type: 'folder' })
  const { createZipDownload: createZipAssetListDownload } = useZipDownload({ type: 'asset-list' })
  const { data } = useAssetGetByIdQuery({ id })

  const [jobTitle, setJobTitle] = useState<string>('Asset')
  const [csvModalOpen, setCsvModalOpen] = useState<boolean>(false)
  const [batchEditModalOpen, setBatchEditModalOpen] = useState<boolean>(false)

  const { t } = useTranslation()

  useEffect(() => {
    if (data !== undefined) {
      setJobTitle(`${data.filename}`)
    }
  }, [data])

  if (rowSelection === undefined) {
    return <></>
  }

  const { selectedRows } = rowSelection

  const numberedSelectedRows = selectedRows !== undefined ? Object.keys(selectedRows).map(Number) : []
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
          }
        ]
      },
      {
        key: '3',
        label: t('listing.actions.zip-download'),
        icon: <Icon value={ 'download' } />,
        onClick: () => {
          createZip()
        }
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

      <BatchEditProvider>
        <BatchEditModal
          batchEditModalOpen={ batchEditModalOpen }
          setBatchEditModalOpen={ setBatchEditModalOpen }
        />
      </BatchEditProvider>
    </>
  )

  function createZip (): void {
    if (hasSelectedItems) {
      createZipAssetListDownload({ jobTitle, requestData: { body: { assets: numberedSelectedRows } } })
    } else {
      createZipFolderDownload({
        jobTitle,
        requestData: {
          body: {
            folders: [id],
            filters: {
              includeDescendants: true,
              ...getArgs().body.filters ?? {},
              page: 1,
              pageSize: 999999999990
            }
          }
        }
      })
    }
  }
}
