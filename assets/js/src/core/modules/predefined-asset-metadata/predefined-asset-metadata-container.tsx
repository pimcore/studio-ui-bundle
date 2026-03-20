/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useRef, useState } from 'react'
import { Title } from '@Pimcore/components/title/title'
import { t } from 'i18next'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Content } from '@Pimcore/components/content/content'
import { Table } from './table/table'
import { Box, IconTextButton, SearchInput, type InputRef } from '@sdk/components'
import { useLazyMetadataGetCollectionQuery } from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/custom-metadata/metadata-api-slice-enhanced'
import trackError, { ApiError, ErrorKeyTypes } from '@Pimcore/modules/app/error-handler'
import { uuid } from '@sdk/utils'
import { type PredefinedAssetMetadataRow, usePredefinedAssetMetadata } from './hooks/use-predefined-asset-metadata'
import { isNil, isUndefined } from 'lodash'
import { useModal } from '@Pimcore/components/modal/useModal'
import { Button } from 'antd'
import { ModalFooter } from '@Pimcore/components/modal/footer/modal-footer'

export const PredefinedAssetMetadataContainer = (): React.JSX.Element => {
  const { createNewMetadata, createLoading } = usePredefinedAssetMetadata()
  const { showModal: showDuplicateModal, closeModal: closeDuplicateModal, renderModal: DuplicateModal } = useModal({ type: 'error' })

  const [predefinedAssetMetadataRows, setPredefinedAssetMetadataRows] = useState<PredefinedAssetMetadataRow[]>([])
  const [isDataLoading, setIsDataLoading] = useState<boolean>(true)
  const searchInputRef = useRef<InputRef>(null)

  const [triggerQuery, { error }] = useLazyMetadataGetCollectionQuery()

  // RTK Query structural sharing can turn arrays into objects with numeric keys.
  // This helper safely extracts the items as an array in all cases.
  const extractItems = (responseData: { items?: unknown } | undefined): PredefinedAssetMetadataRow[] => {
    if (responseData?.items === undefined || responseData.items === null) return []

    const items = Array.isArray(responseData.items)
      ? responseData.items
      : Object.values(responseData.items as Record<string, unknown>)

    return items.map((item: any) => ({ ...item, rowId: item.id }))
  }

  const fetchMetadata = async (search?: string): Promise<void> => {
    setIsDataLoading(true)
    const { data: responseData } = await triggerQuery({ body: { searchTerm: search ?? null } })
    setPredefinedAssetMetadataRows(extractItems(responseData))
    setIsDataLoading(false)
  }

  useEffect(() => {
    if (!isUndefined(error)) {
      trackError(new ApiError(error))
    }
  }, [error])

  // Initial load
  useEffect(() => {
    void fetchMetadata()
  }, [])

  const handleSearch = (value: string): void => {
    void fetchMetadata(value.length > 0 ? value : undefined)
  }

  const handleRefresh = (): void => {
    const inputEl = searchInputRef.current?.input
    if (!isNil(inputEl)) {
      inputEl.value = ''
    }
    void fetchMetadata()
  }

  const sortedRows = [...predefinedAssetMetadataRows].sort((a, b) => b.creationDate - a.creationDate)

  const showNone = !isDataLoading && predefinedAssetMetadataRows.length === 0

  const onCreateMetadata = async (): Promise<void> => {
    const defaultName = 'New Definition'
    const hasDuplicate = predefinedAssetMetadataRows.some(row =>
      row.name === defaultName &&
      (row.language ?? null) === null &&
      (row.targetSubType ?? null) === null
    )

    if (hasDuplicate) {
      showDuplicateModal()
      return
    }

    const { success, data, errorKey } = await createNewMetadata()
    if (success && data !== undefined) {
      setPredefinedAssetMetadataRows(prev =>
        [
          { ...data, rowId: uuid() },
          ...prev
        ]
      )
    } else if (errorKey === ErrorKeyTypes.INVALID_ARGUMENT) {
      showDuplicateModal()
    }
  }

  return (
    <ContentLayout
      renderToolbar={ (
        <Toolbar justify="space-between">
          <IconButton
            disabled={ isDataLoading }
            icon={ { value: 'refresh' } }
            onClick={ handleRefresh }
          />

          <IconTextButton
            disabled={ isDataLoading || createLoading }
            icon={ { value: 'new' } }
            loading={ createLoading }
            onClick={ onCreateMetadata }
          >{t('predefined-asset-metadata.new')}</IconTextButton>
        </Toolbar>
      ) }
      renderTopBar={
        <Toolbar
          justify='space-between'
          margin={ {
            x: 'mini',
            y: 'none'
          } }
          theme='secondary'
        >
          <Title>{t('widget.predefined-asset-metadata')}</Title>
          <SearchInput
            loading={ isDataLoading }
            onClear={ () => { handleSearch('') } }
            onSearch={ handleSearch }
            placeholder="Search"
            ref={ searchInputRef }
            withPrefix={ false }
            withoutAddon={ false }
          />
        </Toolbar>
        }
    >
      <Content
        loading={ isDataLoading }
        margin={ {
          x: 'extra-small',
          y: 'none'
        } }
        none={ showNone }
      >
        <Box
          margin={ {
            x: 'extra-small',
            y: 'none'
          } }
        >
          <Table
            predefinedAssetMetadataRows={ sortedRows }
            setPredefinedAssetMetadataRows={ setPredefinedAssetMetadataRows }
          />
        </Box>
      </Content>

      <DuplicateModal
        footer={ <ModalFooter>
          <Button
            onClick={ closeDuplicateModal }
            type='primary'
          >{t('button.ok')}</Button>
        </ModalFooter> }
        title={ t('predefined-asset-metadata.duplicate-entry.title') }
      >
        <p>{t('predefined-asset-metadata.duplicate-entry.error')}</p>
        <div style={ { marginTop: 8 } }>
          <div><strong>{t('predefined-asset-metadata.columns.name')}:</strong> New Definition</div>
          <div><strong>{t('predefined-asset-metadata.columns.language')}:</strong> —</div>
        </div>
      </DuplicateModal>
    </ContentLayout>
  )
}
