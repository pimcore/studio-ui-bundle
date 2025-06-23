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
import { t } from 'i18next'
import trackError, { ApiError } from '../app/error-handler'
import { useAppDispatch } from '@sdk/app'
import { useDocumentDocTypeListQuery, api } from '../document/document-api-slice-enhanced'
import { type DocumentTypeRow, useDocumentType } from './hooks/use-document-type'
import { useDocumentConfig } from './hooks/use-document-config'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { Flex } from '@Pimcore/components/flex/flex'
import { Title } from '@Pimcore/components/title/title'
import { Content } from '@Pimcore/components/content/content'
import { Box, IconButton, IconTextButton } from '@sdk/components'
import { invalidatingTags } from '@Pimcore/app/api/pimcore/tags'
import { uuid } from '@sdk/utils'
import { isUndefined } from 'lodash'
import { Table } from './table/table'

export const DocumentTypesContainer = (): React.JSX.Element => {
  const dispatch = useAppDispatch()
  const { createNewDocumentType, createLoading } = useDocumentType()
  const config = useDocumentConfig()

  const { data, isLoading: documentTypesLoading, isFetching: documentTypesFetching, isError, error } = useDocumentDocTypeListQuery({})

  const [documentTypeRows, setDocumentTypeRows] = useState<DocumentTypeRow[]>([])

  const documentTypes = data?.items ?? []

  const sortedRows = [...documentTypeRows].sort((a, b) => {
    const dateA = a.creationDate ?? 0
    const dateB = b.creationDate ?? 0
    return dateB - dateA
  })
  useEffect(() => {
    if (!isUndefined(documentTypes)) {
      setDocumentTypeRows(
        documentTypes.map(item => ({ ...item, rowId: uuid() }))
      )
    }
  }, [documentTypes])

  const onCreateDocumentType = async (): Promise<void> => {
    const { success, data } = await createNewDocumentType()
    if (success && data !== undefined) {
      setDocumentTypeRows(prev =>
        [
          { ...data, rowId: uuid() },
          ...prev
        ]
      )
    }
  }

  useEffect(() => {
    if (isError) {
      trackError(new ApiError(error))
    }
  }, [isError])

  return (
    <ContentLayout
      renderToolbar={
        <Toolbar theme="secondary">
          <IconButton
            disabled={ documentTypesFetching }
            icon={ { value: 'refresh' } }
            onClick={ () =>
              dispatch(
                api.util.invalidateTags(
                  invalidatingTags.DOCUMENT_TYPES()
                )
              )
            }
          ></IconButton>
        </Toolbar> }
      renderTopBar={
        <Toolbar
          justify='space-between'
          margin={ {
            x: 'mini',
            y: 'none'
          } }
          theme='secondary'
        >
          <Flex gap={ 'small' }>
            <Title>{t('widget.document-types')}</Title>
            <IconTextButton
              disabled={ documentTypesLoading ?? createLoading }
              icon={ { value: 'new' } }
              loading={ createLoading }
              onClick={ onCreateDocumentType }
            >{t('document-types.new')}</IconTextButton>
          </Flex>
        </Toolbar>
        }
    >
      <Content
        loading={ documentTypesLoading || documentTypesFetching }
        margin={ {
          x: 'extra-small',
          y: 'none'
        } }
        none={ isUndefined(documentTypes) ?? documentTypes.length === 0 }
      >
        <Box
          margin={ {
            x: 'extra-small',
            y: 'none'
          } }
        >
          <Table
            config={ config }
            documentTypeRows={ sortedRows }
            setDocumentTypeRows={ setDocumentTypeRows }
          />        </Box>
      </Content>
    </ContentLayout>
  )
}
