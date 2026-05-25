/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Alert, Modal, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { CreateXLSXForm, type XLSXFormValues } from './create-xlsx-form/create-xlsx-form'
import { XlsxDownloadJob } from '@Pimcore/modules/execution-engine/jobs/download/xlsx-download-job'
import { ModalTitle } from '@Pimcore/components/modal/modal-title/modal-title'
import { useTranslation } from 'react-i18next'
import { useRowSelection } from '@Pimcore/modules/element/listing/decorators/row-selection/context-layer/provider/use-row-selection'
import { useSelectedColumns } from '@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/use-selected-columns'
import { useSettings } from '@Pimcore/modules/element/listing/abstract/settings/use-settings'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { type ExportXlsxApiResponse, type ExportXlsxFolderApiResponse, useExportXlsxFolderMutation, useExportXlsxMutation } from '@Pimcore/modules/element/export-api-slice.gen'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import { useElementDraft } from '@Pimcore/modules/element/hooks/use-element-draft'
import { useClassDefinitionSelection } from '@Pimcore/modules/data-object/listing/decorator/class-definition-selection/context-layer/provider/use-class-definition-selection'
import { getPrefix } from '@Pimcore/app/api/pimcore/route'
import { isNil } from 'lodash'
import { useExecutionEngine } from '@Pimcore/modules/execution-engine/hooks/use-execution-engine'
import { type GridColumnRequest } from '@sdk/api/data-object'
import { Form } from '@sdk/components'

export interface XlsxModalProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export const XlsxModal = (props: XlsxModalProps): React.JSX.Element => {
  const [form] = Form.useForm()
  const executionEngine = useExecutionEngine()
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
  const classDefinitionSelection = useClassDefinitionSelection(true)
  const selectedClassDefinition = classDefinitionSelection?.selectedClassDefinition
  const initialFormValues: XLSXFormValues = {
    header: 'name',
    sheetName: 'Sheet1'
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
    const isFolderExport = numberedSelectedRows.length === 0
    const job = new XlsxDownloadJob({ action: async () => await getDownloadAction(values.header, values.sheetName), isFolderExport })
    void executionEngine.runJob(job)

    props.setOpen(false)
  }

  async function getDownloadAction (header: XLSXFormValues['header'], sheetName: XLSXFormValues['sheetName']): Promise<number> {
    const extractedColumnsFromColumnArg: GridColumnRequest[] = []
    const columns = getArgs()?.body?.columns ?? []

    for (const column of columns) {
      if (selectedColumns.find((selectedColumn) => selectedColumn.key === column.key) === undefined) {
        continue
      }

      extractedColumnsFromColumnArg.push({
        key: column.key,
        type: column.type,
        group: column.group as unknown as string[] | undefined,
        locale: column.locale,
        config: column.config
      })
    }

    if (numberedSelectedRows.length === 0) {
      const filters = getArgs()?.body?.filters ?? {}

      if (filters !== undefined) {
        delete filters.page
        delete filters.pageSize
      }

      const promise = fetchCreateFolderXlsx({
        id,
        body: {
          elementType,
          columns: extractedColumnsFromColumnArg,
          config: {
            header,
            sheetName
          } as any,
          filters: {
            ...filters
          },
          ...(!isNil(selectedClassDefinition?.id) && { classId: selectedClassDefinition.id })
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
          columns: extractedColumnsFromColumnArg,
          config: {
            header,
            sheetName
          } as any,
          ...(!isNil(selectedClassDefinition?.id) && { classId: selectedClassDefinition.id })
        }
      })

      const response = (await promise) as any
      const data = response.data as ExportXlsxApiResponse
      return data.jobRunId
    }
  }
}
