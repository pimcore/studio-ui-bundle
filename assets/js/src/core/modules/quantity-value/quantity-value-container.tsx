/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { getPrefix } from '@Pimcore/app/api/pimcore/route'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Content } from '@Pimcore/components/content/content'
import { Flex } from '@Pimcore/components/flex/flex'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { ImportModal } from '@Pimcore/components/import-modal'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import { ModalTitle } from '@Pimcore/components/modal/modal-title/modal-title'
import { Title } from '@Pimcore/components/title/title'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { Box, IconTextButton, Pagination, SearchInput, Split } from '@sdk/components'
import { uuid } from '@sdk/utils'
import { isNil, isUndefined } from 'lodash'
import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { type SortingState } from '@tanstack/react-table'
import trackError, { ApiError, GeneralError } from '../app/error-handler'
import { downloadFile } from '../app/utils/download'
import { useLazyUnitQuantityValueUnitsExportQuery, useUnitQuantityValueUnitsCollectionQuery } from '../data-object/unit-slice-enhanced'
import { type QuantityValueUnitRow, useQuantityValueUnit } from './hooks/use-quantity-value-unit'
import { Table } from './table/table'

/**
 * Maps camelCase column IDs from the TypeScript QuantityValueUnit type
 * to the actual database column names expected by the backend sort filter.
 */
const SORT_KEY_MAP: Record<string, string> = {
  longName: 'longname',
  baseUnit: 'baseunit'
}

function toSortKey (columnId: string): string {
  return SORT_KEY_MAP[columnId] ?? columnId
}

export const QuantityValueContainer = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { createUnit, createLoading } = useQuantityValueUnit()
  const modal = useFormModal()

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(20)
  const [sorting, setSorting] = useState<SortingState>([])
  const [filter, setFilter] = useState<string>('')

  const queryArgs = useMemo(() => ({
    body: {
      filters: {
        page: currentPage,
        pageSize,
        columnFilters: isNil(filter) ? [] : [{ type: 'search', filterValue: filter }],
        sortFilter: sorting.length > 0
          ? {
              key: toSortKey(sorting[0].id),
              direction: sorting[0].desc ? 'DESC' : 'ASC'
            }
          : {}
      }
    }
  }), [currentPage, pageSize, filter, sorting])

  const { data, isLoading, isFetching, error, refetch } = useUnitQuantityValueUnitsCollectionQuery(queryArgs, { refetchOnMountOrArgChange: true })

  const handleRefetch = (): void => {
    void refetch().catch(() => {
      trackError(new GeneralError('Error while reloading'))
    })
  }

  const handlePageChange = (page: number, newPageSize: number): void => {
    setCurrentPage(page)
    setPageSize(newPageSize)
  }

  const [triggerExport, { isLoading: exportLoading }] = useLazyUnitQuantityValueUnitsExportQuery()

  const handleExport = async (): Promise<void> => {
    try {
      const result = await triggerExport().unwrap()
      downloadFile('quantityvalue_unit_export.json', result)
    } catch {
      trackError(new GeneralError('Error while exporting'))
    }
  }

  const [quantityValueUnitRows, setQuantityValueUnitRows] = useState<QuantityValueUnitRow[]>([])
  const [isImportModalOpen, setIsImportModalOpen] = useState<boolean>(false)

  const items = data?.items
  const totalItems = data?.totalItems ?? 0

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

  const handleSortingChange = (newSorting: SortingState): void => {
    setSorting(newSorting)
    setCurrentPage(1)
  }

  const handleImportSuccess = (): void => {
    setIsImportModalOpen(false)
    handleRefetch()
  }

  const openCreateModal = (): void => {
    modal.input({
      title: <ModalTitle iconName='new'>{t('quantity-values.create-modal.title')}</ModalTitle>,
      label: t('quantity-values.create-modal.id-label'),
      rule: { required: true, message: t('quantity-values.create-modal.id-required') },
      onOk: async (value: string) => {
        const { success } = await onCreateUnit(value)
        if (!success) {
          throw new GeneralError('Failed to create unit')
        }
      }
    })
  }

  return (
    <ContentLayout
      renderToolbar={
        <Toolbar theme="secondary">
          <Flex
            align='center'
            justify='start'
          >
            <div>
              <IconTextButton
                disabled={ isFetching || exportLoading || quantityValueUnitRows.length < 1 }
                icon={ { value: 'download' } }
                loading={ exportLoading }
                onClick={ handleExport }
                type={ 'link' }
              >
                {t('quantity-values.export')}
              </IconTextButton>
              <IconTextButton
                disabled={ isFetching }
                icon={ { value: 'upload-import' } }
                onClick={ () => { setIsImportModalOpen(true) } }
                type={ 'link' }
              >
                {t('quantity-values.import')}
              </IconTextButton>
            </div>
          </Flex>
          {totalItems > 0
            ? (
              <Split>
                <Flex align='center'>
                  <IconButton
                    disabled={ isFetching }
                    icon={ { value: 'refresh' } }
                    onClick={ handleRefetch }
                    variant='minimal'
                  />
                </Flex>
                <Pagination
                  current={ currentPage }
                  onChange={ handlePageChange }
                  showSizeChanger
                  showTotal={ (total) => t('pagination.show-total', { total }) }
                  total={ totalItems }
                />
              </Split>
              )
            : (
              <Flex align='center'>
                <IconButton
                  disabled={ isFetching }
                  icon={ { value: 'refresh' } }
                  onClick={ handleRefetch }
                />
              </Flex>
              )}
        </Toolbar> }
      renderTopBar={
        <Toolbar
          justify='space-between'
          margin={ {
            x: 'extra-small',
            y: 'none'
          } }
          theme='secondary'
        >
          <Flex gap={ 'small' }>
            <Title>{t('widget.quantity-values')}</Title>
            <IconTextButton
              disabled={ isLoading || createLoading }
              icon={ { value: 'new' } }
              loading={ createLoading }
              onClick={ openCreateModal }
            >{t('quantity-values.new')}</IconTextButton>
          </Flex>
          <SearchInput
            loading={ isFetching }
            onSearch={ (value) => {
              setFilter(value)
              setCurrentPage(1)
            } }
            placeholder={ t('quantity-values.search') }
            withPrefix={ false }
            withoutAddon={ false }
          />
        </Toolbar>
      }
    >
      <Content
        loading={ isLoading }
        margin={ {
          x: 'extra-small',
          y: 'none'
        } }
        none={ !isLoading && (isUndefined(items) || items.length === 0) }
      >
        <Box
          margin={ {
            x: 'extra-small',
            y: 'none'
          } }
        >
          <Table
            onSortingChange={ handleSortingChange }
            quantityValueUnitRows={ quantityValueUnitRows }
            setQuantityValueUnitRows={ setQuantityValueUnitRows }
            sorting={ sorting }
          />
        </Box>
      </Content>
      <ImportModal
        accept=".json,application/json"
        acceptMimeTypes={ ['application/json'] }
        action={ `${getPrefix()}/unit/quantity-value/units/import` }
        onOpenChange={ setIsImportModalOpen }
        onUploadSuccess={ handleImportSuccess }
        open={ isImportModalOpen }
        title={ t('quantity-values.import-modal.title') }
      />
    </ContentLayout>
  )
}
