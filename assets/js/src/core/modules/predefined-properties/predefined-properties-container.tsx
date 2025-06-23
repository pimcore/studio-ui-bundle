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
import { useAppDispatch } from '@sdk/app'
import { invalidatingTags } from '@Pimcore/app/api/pimcore/tags'
import { api } from '@sdk/api/properties'
import { usePropertyGetCollectionQuery } from '../element/editor/shared-tab-manager/tabs/properties/properties-api-slice.gen'
import trackError, { ApiError } from '../app/error-handler'
import { uuid } from '@sdk/utils'
import { type PredefinedPropertyRow, usePredefinedProperty } from './hooks/use-predefined-property'
import { isUndefined } from 'lodash'

export const PredefinedPropertiesContainer = (): React.JSX.Element => {
  const dispatch = useAppDispatch()
  const { createNewProperty, createLoading } = usePredefinedProperty()
  const { data, isLoading: predefinedPropertiesLoading, isFetching: predefinedPropertiesFetching, isError, error, refetch } = usePropertyGetCollectionQuery({})

  useEffect(() => {
    refetch()
  }, [])

  const [predefinedPropertyRows, setPredefinedPropertyRows] = useState<PredefinedPropertyRow[]>([])

  const predefinedProperties = data?.items

  const sortedRows = [...predefinedPropertyRows].sort((a, b) => b.creationDate - a.creationDate)

  useEffect(() => {
    if (!isUndefined(predefinedProperties)) {
      setPredefinedPropertyRows(
        predefinedProperties.map(item => ({ ...item, rowId: uuid() }))
      )
    }
  }, [predefinedProperties])

  const onCreateProperty = async (): Promise<void> => {
    const { success, data } = await createNewProperty()
    if (success && data !== undefined) {
      setPredefinedPropertyRows(prev =>
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
            disabled={ predefinedPropertiesFetching }
            icon={ { value: 'refresh' } }
            onClick={ () => dispatch(
              api.util.invalidateTags(
                invalidatingTags.GLOBAL_PROPERTIES()
              )
            )
          }
          />
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
            <Title>{t('widget.predefined-properties')}</Title>
            <IconTextButton
              disabled={ predefinedPropertiesLoading || createLoading }
              icon={ { value: 'new' } }
              loading={ createLoading }
              onClick={ onCreateProperty }
            >{t('predefined-properties.new')}</IconTextButton>
          </Flex>
        </Toolbar>
        }
    >
      <Content
        loading={ predefinedPropertiesLoading || predefinedPropertiesFetching }
        margin={ {
          x: 'extra-small',
          y: 'none'
        } }
        none={ isUndefined(predefinedProperties) || predefinedProperties.length === 0 }
      >
        <Box
          margin={ {
            x: 'extra-small',
            y: 'none'
          } }
        >
          <Table
            predefinedPropertyRows={ sortedRows }
            setPredefinedPropertyRows={ setPredefinedPropertyRows }
          />
        </Box>
      </Content>
    </ContentLayout>
  )
}
