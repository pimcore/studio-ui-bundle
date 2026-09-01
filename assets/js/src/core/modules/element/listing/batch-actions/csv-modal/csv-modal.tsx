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
import React, { useEffect } from 'react'
import { CreateCSVForm, type CSVFormValues } from './create-csv-form/create-csv-form'
import { CsvDownloadJob } from '@Pimcore/modules/execution-engine/jobs/download/csv-download-job'
import { ModalTitle } from '@Pimcore/components/modal/modal-title/modal-title'
import { useTranslation } from 'react-i18next'
import { useRowSelection } from '@Pimcore/modules/element/listing/decorators/row-selection/context-layer/provider/use-row-selection'
import { useSelectedColumns } from '@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/use-selected-columns'
import { useSettings } from '@Pimcore/modules/element/listing/abstract/settings/use-settings'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { type ExportCsvApiResponse, type ExportCsvFolderApiResponse, useExportCsvFolderMutation, useExportCsvMutation } from '@Pimcore/modules/element/export-api-slice.gen'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import { useClassDefinitionSelection } from '@Pimcore/modules/data-object/listing/decorator/class-definition-selection/context-layer/provider/use-class-definition-selection'
import { isNil } from 'lodash'
import { useExecutionEngine } from '@Pimcore/modules/execution-engine/hooks/use-execution-engine'
import { type GridColumnRequest } from '@sdk/api/asset'
import { Form } from '@sdk/components'
import { buildGridExportFileName } from '../export-file-name'

export interface CsvModalProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export const CsvModal = (props: CsvModalProps): React.JSX.Element => {
  const [form] = Form.useForm()
  const executionEngine = useExecutionEngine()
  const { id, elementType } = useElementContext()
  const [fetchCreateCsv, { isError: isCreateCsvError, error: createCsvError }] = useExportCsvMutation()
  const [fetchCreateFolderCsv, { isError: isCreateFolderCsvError, error: createFolderCsvError }] = useExportCsvFolderMutation()
  const { selectedRows } = useRowSelection()
  const numberedSelectedRows = selectedRows !== undefined ? Object.keys(selectedRows).map(Number) : []
  const { selectedColumns } = useSelectedColumns()
  const { useDataQueryHelper } = useSettings()
  const { getArgs } = useDataQueryHelper()
  const classDefinitionSelection = useClassDefinitionSelection(true)
  const selectedClassDefinition = classDefinitionSelection?.selectedClassDefinition
  const gridName = selectedClassDefinition?.name ?? elementType
  const initialFormValues: CSVFormValues = {
    delimiter: ';',
    header: 'name'
  }
  const { t } = useTranslation()

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
    const isFolderExport = numberedSelectedRows.length === 0
    const job = new CsvDownloadJob({
      action: async () => await getDownloadAction(values.delimiter, values.header),
      isFolderExport,
      title: t('jobs.download-csv-job.title-with-grid', { grid: gridName })
    })
    void executionEngine.runJob(job)

    props.setOpen(false)
  }

  async function getDownloadAction (delimiter: CSVFormValues['delimiter'], header: CSVFormValues['header']): Promise<number> {
    const fileName = buildGridExportFileName(gridName, 'csv')
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

      const promise = fetchCreateFolderCsv({
        id,
        body: {
          elementType,
          columns: extractedColumnsFromColumnArg,
          config: {
            delimiter,
            header,
            fileName
          } as any,
          filters: {
            ...filters
          },
          ...(!isNil(selectedClassDefinition?.id) && { classId: selectedClassDefinition.id })
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
            header,
            fileName
          } as any,
          ...(!isNil(selectedClassDefinition?.id) && { classId: selectedClassDefinition.id })
        }
      })

      const response = (await promise) as any
      const data = response.data as ExportCsvApiResponse
      return data.jobRunId
    }
  }
}
