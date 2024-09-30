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
import { useListColumns, useListSelectedRows } from '../../hooks/use-list'
import {
  type AssetCreateZipApiResponse,
  useAssetCreateZipMutation,
  useAssetGetByIdQuery
} from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { useJobs } from '@Pimcore/modules/execution-engine/hooks/useJobs'
import { defaultTopics, topics } from '@Pimcore/modules/execution-engine/topics'
import { createJob as createDownloadJob } from '@Pimcore/modules/execution-engine/jobs/download/factory'
import { useAsset } from '@Pimcore/modules/asset/hooks/use-asset'
import { CsvModal } from './csv-modal/csv-modal'
import { useTranslation } from 'react-i18next'
import { Dropdown, type DropdownMenuProps } from '@Pimcore/components/dropdown/dropdown'
import { useModal } from '@Pimcore/components/modal/useModal'
import { ModalFooter } from '@Pimcore/components/modal/footer/modal-footer'
import { Button } from '@Pimcore/components/button/button'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'

export const GridActions = (): React.JSX.Element => {
  const { selectedRows } = useListSelectedRows()
  const numberedSelectedRows = Object.keys(selectedRows).map(Number)
  const { dropDownMenu } = useListColumns()
  const hasSelectedItems = Object.keys(selectedRows).length > 0
  const [fetchCreateZip] = useAssetCreateZipMutation()
  const { id } = useAsset()
  const { data } = useAssetGetByIdQuery({ id: id! })
  const [jobTitle, setJobTitle] = useState<string>('Asset')
  const { addJob } = useJobs()
  const [csvModalOpen, setCsvModalOpen] = useState<boolean>(false)
  const { t } = useTranslation()
  const {
    showModal: showBatchEditModal,
    closeModal: closeBatchEditModal,
    renderModal: BatchEditModal
  } = useModal({
    type: 'basic'
  })

  useEffect(() => {
    if (data !== undefined) {
      setJobTitle(`${data.filename}`)
    }
  }, [data])

  function getFormattedDropDownMenu (): DropdownMenuProps['items'] {
    const formattedDropDownMenu: DropdownMenuProps['items'] = []
    let index = 0

    for (const [key, value] of Object.entries(dropDownMenu)) {
      formattedDropDownMenu.push({
        key: index++,
        label: t(`asset.listing.groups.${key}`),
        children: value.map((column) => ({
          key: column.key,
          label: t(`asset.listing.column.${column.key}`),
          onClick: () => { alert('column') }
        }))
      })
    }

    return formattedDropDownMenu
  }

  const menu: DropdownMenuProps = {
    items: [
      {
        key: '1',
        label: t('listing.actions.batch-edit'),
        icon: <Icon name={ 'grid' } />,
        onClick: () => {
          showBatchEditModal()
        }
      },
      {
        key: '2',
        label: t('listing.actions.export'),
        icon: <Icon name={ 'export' } />,
        children: [
          {
            key: '2.1',
            label: t('listing.actions.csv-export'),
            icon: <Icon name={ 'export' } />,
            onClick: () => {
              setCsvModalOpen(true)
            }
          }
        ]
      },
      {
        key: '3',
        label: t('listing.actions.zip-download'),
        icon: <Icon name={ 'download-02' } />,
        onClick: () => {
          createZip()
        }
      }
    ]
  }

  return (
    <>
      <Dropdown
        disabled={ !hasSelectedItems }
        menu={ menu }
      >
        <DropdownButton key={ 'dropdown-button' }>{t('listing.actions')}</DropdownButton>
      </Dropdown>

      <CsvModal
        open={ csvModalOpen }
        setOpen={ setCsvModalOpen }
      />

      <BatchEditModal
        footer={ <ModalFooter>
          <Dropdown menu={ { items: getFormattedDropDownMenu() } }>
            <IconTextButton
              icon='PlusCircleOutlined'
              type='link'
            >
              {t('listing.add-column')}
            </IconTextButton>
          </Dropdown>
          <IconTextButton
            icon='close'
            type='link'
          >
            {t('batch-edit.modal-footer.discard-all-changes')}</IconTextButton>
          <Button
            onClick={ closeBatchEditModal }
            type='primary'
          >{t('batch-edit.modal-footer.apply-changes')}</Button>
        </ModalFooter> }
        title={ t('batch-edit.modal-title') }
      >
        Lorem ipsum
      </BatchEditModal>
    </>
  )

  function createZip (): void {
    addJob(createDownloadJob({
      // @todo add api domain
      title: t('jobs.zip-job.title', { title: jobTitle }),
      topics: [topics['zip-download-ready'], ...defaultTopics],
      downloadUrl: '/studio/api/assets/download/zip/{jobRunId}',
      action: async () => {
        const promise = fetchCreateZip({ body: { items: numberedSelectedRows } })

        promise.catch(() => {
          console.error('Failed to create zip')
        })

        const response = (await promise) as any
        const data = response.data as AssetCreateZipApiResponse
        return data.jobRunId
      }
    }))
  }
}
