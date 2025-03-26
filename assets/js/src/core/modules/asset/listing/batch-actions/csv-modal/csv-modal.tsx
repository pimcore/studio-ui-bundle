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

import { Alert, Modal, Space, Form } from 'antd'
import React, { useEffect, useState } from 'react'
import { CreateCSVForm, type CSVFormValues } from './create-csv-form/create-csv-form'
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
import { ModalTitle } from '@Pimcore/components/modal/modal-title/modal-title'
import { useTranslation } from 'react-i18next'
import { appConfig } from '@Pimcore/app/config/app-config'
import { useRowSelection } from '@Pimcore/modules/element/listing/decorators/row-selection/context-layer/provider/use-row-selection'
import { useSelectedColumns } from '@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/use-selected-columns'
import { useSettings } from '@Pimcore/modules/element/listing/abstract/settings/use-settings'

export interface CsvModalProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export const CsvModal = (props: CsvModalProps): React.JSX.Element => {
  const [form] = Form.useForm()
  const { addJob } = useJobs()
  const { id } = useAsset()
  const { data } = useAssetGetByIdQuery({ id })
  const [jobTitle, setJobTitle] = useState<string>('Asset')
  const [fetchCreateCsv] = useAssetExportCsvAssetMutation()
  const [fetchCreateFolderCsv] = useAssetExportCsvFolderMutation()
  const { selectedRows } = useRowSelection()
  const numberedSelectedRows = selectedRows !== undefined ? Object.keys(selectedRows).map(Number) : []
  const { selectedColumns } = useSelectedColumns()
  const { useDataQueryHelper } = useSettings()
  const { getArgs } = useDataQueryHelper()
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
      downloadUrl: '/pimcore-studio/api/assets/download/csv/{jobRunId}',
      action: async () => await getDownloadAction(values.delimiter, values.header)
    }))

    props.setOpen(false)
  }

  async function getDownloadAction (delimiter: CSVFormValues['delimiter'], header: CSVFormValues['header']): Promise<number> {
    if (numberedSelectedRows.length === 0) {
      const promise = fetchCreateFolderCsv({
        body: {
          folders: [id],
          columns: selectedColumns.map((column) => {
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
            ...getArgs().body.filters ?? {},
            page: 1,
            pageSize: appConfig.maxPageSize,
            includeDescendants: true
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
          columns: selectedColumns.map((column) => {
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
