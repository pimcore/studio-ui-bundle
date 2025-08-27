/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Alert, Modal, Space, Form } from 'antd'
import React, { useEffect, useState } from 'react'
import { CreateCSVForm, type CSVFormValues } from './create-csv-form/create-csv-form'
import { useJobs } from '@Pimcore/modules/execution-engine/hooks/useJobs'
import { createJob as createDownloadJob } from '@Pimcore/modules/execution-engine/jobs/download/factory'
import { defaultTopics, topics } from '@Pimcore/modules/execution-engine/topics'
import { ModalTitle } from '@Pimcore/components/modal/modal-title/modal-title'
import { useTranslation } from 'react-i18next'
import { appConfig } from '@Pimcore/app/config/app-config'
import { useRowSelection } from '@Pimcore/modules/element/listing/decorators/row-selection/context-layer/provider/use-row-selection'
import { useSelectedColumns } from '@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/use-selected-columns'
import { useSettings } from '@Pimcore/modules/element/listing/abstract/settings/use-settings'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { type ExportCsvApiResponse, type ExportCsvFolderApiResponse, useExportCsvFolderMutation, useExportCsvMutation } from '@Pimcore/modules/element/export-api-slice.gen'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import { useElementDraft } from '@Pimcore/modules/element/hooks/use-element-draft'

export interface CsvModalProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export const CsvModal = (props: CsvModalProps): React.JSX.Element => {
  const [form] = Form.useForm()
  const { addJob } = useJobs()
  const { id, elementType } = useElementContext()
  const { element } = useElementDraft(id, elementType)
  const [jobTitle, setJobTitle] = useState<string>('Element')
  const [fetchCreateCsv, { isError: isCreateCsvError, error: createCsvError }] = useExportCsvMutation()
  const [fetchCreateFolderCsv, { isError: isCreateFolderCsvError, error: createFolderCsvError }] = useExportCsvFolderMutation()
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
    if (element === undefined) {
      return
    }

    if ('filename' in element) {
      setJobTitle(element.filename as string)
    }

    if ('key' in element) {
      setJobTitle(element.key as string)
    }
  }, [element])

  useEffect(() => {
    if (isCreateCsvError) {
      trackError(new ApiError(createCsvError))
    }
  }, [isCreateCsvError])

  useEffect(() => {
    if (isCreateFolderCsvError) {
      trackError(new ApiError(createFolderCsvError))
    }
  }, [isCreateFolderCsvError])

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
      downloadUrl: '/pimcore-studio/api/export/download/csv/{jobRunId}',
      action: async () => await getDownloadAction(values.delimiter, values.header)
    }))

    props.setOpen(false)
  }

  async function getDownloadAction (delimiter: CSVFormValues['delimiter'], header: CSVFormValues['header']): Promise<number> {
    const argColumns = getArgs().body.columns ?? []
    const extractedColumnsFromColumnArg = selectedColumns.map(column => {
      let currentColumn = argColumns.find(argColumn => argColumn.key === column.key && argColumn.locale === column.locale)

      if (currentColumn.type === 'dataobject.advanced') {
        currentColumn = argColumns.find(argColumn => column.originalApiDefinition?.__meta?.advancedColumnConfig?.title === argColumn?.config?.title)
      }

      currentColumn = currentColumn ?? column

      return {
        key: currentColumn.key,
        type: currentColumn.type,
        locale: currentColumn.locale,
        config: currentColumn.config
      }
    })

    if (numberedSelectedRows.length === 0) {
      const promise = fetchCreateFolderCsv({
        body: {
          folders: [id],
          elementType,
          columns: extractedColumnsFromColumnArg,
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

      const response = (await promise) as any
      const data = response.data as ExportCsvFolderApiResponse
      return data.jobRunId
    } else {
      const promise = fetchCreateCsv({
        body: {
          elements: numberedSelectedRows,
          elementType,
          columns: extractedColumnsFromColumnArg,
          config: {
            delimiter,
            header
          }
        }
      })

      const response = (await promise) as any
      const data = response.data as ExportCsvApiResponse
      return data.jobRunId
    }
  }
}
