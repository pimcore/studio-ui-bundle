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

import { Alert, Modal, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { CreateCSVForm, type CSVFormValues } from './create-csv-form/create-csv-form'
import { useForm } from 'antd/es/form/Form'
import { useJobs } from '@Pimcore/modules/execution-engine/hooks/useJobs'
import { createJob as createDownloadJob } from '@Pimcore/modules/execution-engine/jobs/download/factory'
import { useAsset } from '@Pimcore/modules/asset/hooks/use-asset'
import {
  type AssetExportCsvAssetApiResponse,
  type AssetExportCsvFolderApiResponse,
  useAssetExportCsvAssetMutation,
  useAssetExportCsvFolderMutation,
  useAssetGetByIdQuery
} from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { defaultTopics, topics } from '@Pimcore/modules/execution-engine/topics'
import { useListColumns, useListFilterOptions, useListSelectedRows } from '../../../hooks/use-list'
import { ModalTitle } from '@Pimcore/components/modal/modal-title/modal-title'
import { useTranslation } from 'react-i18next'
import { appConfig } from '@Pimcore/app/config/app-config'

export interface CsvModalProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export const CsvModal = (props: CsvModalProps): React.JSX.Element => {
  const [form] = useForm()
  const { addJob } = useJobs()
  const { id } = useAsset()
  const { data } = useAssetGetByIdQuery({ id })
  const [jobTitle, setJobTitle] = useState<string>('Asset')
  const [fetchCreateCsv] = useAssetExportCsvAssetMutation()
  const [fetchCreateFolderCsv] = useAssetExportCsvFolderMutation()
  const { selectedRows } = useListSelectedRows()
  const numberedSelectedRows = Object.keys(selectedRows).map(Number)
  const { columns } = useListColumns()
  const { filterOptions } = useListFilterOptions()
  const initialFormValues: CSVFormValues = {
    delimiter: ';',
    header: 'name'
  }
  const { t } = useTranslation()

  useEffect(() => {
    if (data !== undefined) {
      setJobTitle(`${data.filename}`)
    }
  }, [data])

  return (
    <Modal
      onCancel={ () => { props.setOpen(false) } }
      onOk={ () => { form.submit() } }
      open={ props.open }
      title={ (
        <ModalTitle iconName='export'>{ t('export-csv-form.modal-title') }</ModalTitle>
      ) }
    >
      <Space
        direction='vertical'
        size={ 10 }
        style={ { paddingTop: 10 } }
      >
        <Alert
          message={ t('export-csv-form.export-notice') }
          showIcon
          type='warning'
        />

        <CreateCSVForm
          form={ form }
          initialValues={ initialFormValues }
          onFinish={ onFinish }
        />
      </Space>
    </Modal>
  )

  function onFinish (values: CSVFormValues): void {
    addJob(createDownloadJob({
      // @todo add api domain
      title: t('jobs.csv-job.title', { title: jobTitle }),
      topics: [topics['csv-download-ready'], ...defaultTopics],
      downloadUrl: '/studio/api/assets/download/csv/{jobRunId}',
      action: async () => await getDownloadAction(values.delimiter, values.header)
    }))

    props.setOpen(false)
  }

  async function getDownloadAction (delimiter: CSVFormValues['delimiter'], header: CSVFormValues['header']): Promise<number> {
    if (numberedSelectedRows.length === 0) {
      const promise = fetchCreateFolderCsv({
        body: {
          folders: [id],
          columns: columns.map((column) => {
            return {
              key: column.key,
              type: column.type,
              group: column.group,
              config: [] // @todo add config after schema update
            }
          }),
          config: {
            delimiter,
            header
          },
          filters: {
            page: 1,
            pageSize: appConfig.maxPageSize,
            ...filterOptions
          }
        }
      })

      promise.catch(() => {
        console.error('Failed to create csv')
      })

      const response = (await promise) as any
      const data = response.data as AssetExportCsvFolderApiResponse
      return data.jobRunId
    } else {
      const promise = fetchCreateCsv({
        body: {
          assets: numberedSelectedRows,
          columns: columns.map((column) => {
            return {
              key: column.key,
              type: column.type,
              group: column.group,
              config: [] // @todo add config after schema update
            }
          }),
          config: {
            delimiter,
            header
          }
        }
      })

      promise.catch(() => {
        console.error('Failed to create csv')
      })

      const response = (await promise) as any
      const data = response.data as AssetExportCsvAssetApiResponse
      return data.jobRunId
    }
  }
}
