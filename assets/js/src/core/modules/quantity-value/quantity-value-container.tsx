/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useState } from 'react'
import { Title } from '@Pimcore/components/title/title'
import { t } from 'i18next'
import { Flex } from '@Pimcore/components/flex/flex'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Content } from '@Pimcore/components/content/content'
import { Table } from './table/table'
import { Box, IconTextButton } from '@sdk/components'
import { useUnitQuantityValueUnitsCollectionQuery, useLazyUnitQuantityValueUnitsExportQuery } from '../data-object/unit-slice-enhanced'
import trackError, { ApiError, GeneralError } from '../app/error-handler'
import { uuid } from '@sdk/utils'
import { type QuantityValueUnitRow, useQuantityValueUnit } from './hooks/use-quantity-value-unit'
import { isUndefined } from 'lodash'
import { CreateUnitModal } from './components/create-unit-modal'
import { downloadFile } from '../app/utils/download'
import { ImportModal } from '@Pimcore/components/import-modal'
import { getPrefix } from '@Pimcore/app/api/pimcore/route'

export const QuantityValueContainer = (): React.JSX.Element => {
  const { createUnit, createLoading } = useQuantityValueUnit()

  const { data, isLoading, isFetching, error, refetch } = useUnitQuantityValueUnitsCollectionQuery({ body: {} })

  const handleRefetch = (): void => {
    void refetch().catch(() => {
      trackError(new GeneralError('Error while reloading'))
    })
  }

  const [triggerExport, { isLoading: exportLoading }] = useLazyUnitQuantityValueUnitsExportQuery()

  const handleExport = async (): Promise<void> => {
    try {
      const result = await triggerExport().unwrap()
      downloadFile('quantityvalue_unit_export.json', result as Blob)
    } catch {
      trackError(new GeneralError('Error while exporting'))
    }
  }

  const [quantityValueUnitRows, setQuantityValueUnitRows] = useState<QuantityValueUnitRow[]>([])
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
  const [isImportModalOpen, setIsImportModalOpen] = useState<boolean>(false)

  const items = data?.items

  useEffect(() => {
    if (!isUndefined(items)) {
      setQuantityValueUnitRows(
        items.map(item => ({ ...item, rowId: uuid() }))
      )
    }
  }, [items])

  useEffect(() => {
    if (!isUndefined(error)) {
      trackError(new ApiError(error))
    }
  }, [error])

  const onCreateUnit = async (id: string): Promise<{ success: boolean }> => {
    const { success, data } = await createUnit(id)
    if (success && data !== undefined) {
      setQuantityValueUnitRows(prev =>
        [
          { ...data, rowId: uuid() },
          ...prev
        ]
      )
    }
    return { success }
  }

  const handleImportSuccess = (): void => {
    setIsImportModalOpen(false)
    handleRefetch()
  }

  return (
    <ContentLayout
      renderToolbar={
        <Toolbar theme="secondary">
          <Flex
            align='center'
            justify='start'
          >
            <IconButton
              disabled={isFetching}
              icon={{ value: 'refresh' }}
              onClick={handleRefetch}
            />
            <IconTextButton
              disabled={isFetching || exportLoading || quantityValueUnitRows.length < 1}
              icon={{ value: 'download' }}
              loading={exportLoading}
              onClick={handleExport}
              type={'link'}
            >
              {t('quantity-values.export')}
            </IconTextButton>
            <IconTextButton
              disabled={isFetching}
              icon={{ value: 'upload-import' }}
              onClick={() => { setIsImportModalOpen(true) }}
              type={'link'}
            >
              {t('quantity-values.import')}
            </IconTextButton>
          </Flex>
        </Toolbar>}
      renderTopBar={
        <Toolbar
          justify='space-between'
          margin={{
            x: 'mini',
            y: 'none'
          }}
          theme='secondary'
        >
          <Flex gap={'small'}>
            <Title>{t('widget.quantity-values')}</Title>
            <IconTextButton
              disabled={isLoading || createLoading}
              icon={{ value: 'new' }}
              loading={createLoading}
              onClick={() => { setIsCreateModalOpen(true) }}
            >{t('quantity-values.new')}</IconTextButton>
          </Flex>
        </Toolbar>
      }
    >
      <Content
        loading={isLoading || isFetching}
        margin={{
          x: 'extra-small',
          y: 'none'
        }}
        none={isUndefined(items) || items.length === 0}
      >
        <Box
          margin={{
            x: 'extra-small',
            y: 'none'
          }}
        >
          <Table
            quantityValueUnitRows={quantityValueUnitRows}
            setQuantityValueUnitRows={setQuantityValueUnitRows}
          />
        </Box>
      </Content>
      <CreateUnitModal
        createUnit={onCreateUnit}
        open={isCreateModalOpen}
        setOpen={setIsCreateModalOpen}
      />
      <ImportModal
        accept=".json,application/json"
        acceptMimeTypes={['application/json']}
        action={`${getPrefix()}/unit/quantity-value/units/import`}
        onOpenChange={setIsImportModalOpen}
        onUploadSuccess={handleImportSuccess}
        open={isImportModalOpen}
        title={t('quantity-values.import-modal.title')}
      />
    </ContentLayout>
  )
}
