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
import { CreateXLSXForm, type XLSXFormValues } from './create-xlsx-form/create-xlsx-form'
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
import { type ExportXlsxApiResponse, type ExportXlsxFolderApiResponse, useExportXlsxFolderMutation, useExportXlsxMutation } from '@Pimcore/modules/element/export-api-slice.gen'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import { useElementDraft } from '@Pimcore/modules/element/hooks/use-element-draft'

export interface XlsxModalProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export const XlsxModal = (props: XlsxModalProps): React.JSX.Element => {
  const [form] = Form.useForm()
  const { addJob } = useJobs()
  const { id, elementType } = useElementContext()
  const { element } = useElementDraft(id, elementType)
  const [jobTitle, setJobTitle] = useState<string>('Element')
  const [fetchCreateXlsx, { isError: isCreateXlsxError, error: createXlsxError }] = useExportXlsxMutation()
  const [fetchCreateFolderXlsx, { isError: isCreateFolderXlsxError, error: createFolderXlsxError }] = useExportXlsxFolderMutation()
  const { selectedRows } = useRowSelection()
  const numberedSelectedRows = selectedRows !== undefined ? Object.keys(selectedRows).map(Number) : []
  const { selectedColumns } = useSelectedColumns()
  const { useDataQueryHelper } = useSettings()
  const { getArgs } = useDataQueryHelper()
  const initialFormValues: XLSXFormValues = {
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
    if (isCreateXlsxError) {
      trackError(new ApiError(createXlsxError))
    }
  }, [isCreateXlsxError])

  useEffect(() => {
    if (isCreateFolderXlsxError) {
      trackError(new ApiError(createFolderXlsxError))
    }
  }, [isCreateFolderXlsxError])

  return (
    <Modal
      onCancel={ () => { props.setOpen(false) } }
      onOk={ () => { form.submit() } }
      open={ props.open }
      title={ (
        <ModalTitle iconName='export'>{ t('export-xlsx-form.modal-title') }</ModalTitle>
      ) }
    >
      <Space
        direction='vertical'
        size={ 10 }
        style={ { paddingTop: 10 } }
      >
        <Alert
          message={ t('export-xlsx-form.export-notice') }
          showIcon
          type='warning'
        />

        <CreateXLSXForm
          form={ form }
          initialValues={ initialFormValues }
          onFinish={ onFinish }
        />
      </Space>
    </Modal>
  )

  function onFinish (values: XLSXFormValues): void {
    addJob(createDownloadJob({
      // @todo add api domain
      title: t('jobs.xlsx-job.title', { title: jobTitle }),
      topics: [topics['xlsx-download-ready'], ...defaultTopics],
      downloadUrl: '/pimcore-studio/api/export/download/xlsx/{jobRunId}',
      action: async () => await getDownloadAction(values.header)
    }))

    props.setOpen(false)
  }

  async function getDownloadAction (header: XLSXFormValues['header']): Promise<number> {
    if (numberedSelectedRows.length === 0) {
      const promise = fetchCreateFolderXlsx({
        body: {
          folders: [id],
          elementType,
          columns: selectedColumns.map((column) => {
            return {
              key: column.key,
              type: column.type,
              group: column.group,
              config: [] // @todo add config after schema update
            }
          }),
          config: {
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
      const data = response.data as ExportXlsxFolderApiResponse
      return data.jobRunId
    } else {
      const promise = fetchCreateXlsx({
        body: {
          elements: numberedSelectedRows,
          elementType,
          columns: selectedColumns.map((column) => {
            return {
              key: column.key,
              type: column.type,
              group: column.group,
              config: [] // @todo add config after schema update
            }
          }),
          config: {
            header
          }
        }
      })

      const response = (await promise) as any
      const data = response.data as ExportXlsxApiResponse
      return data.jobRunId
    }
  }
}
