/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { Title } from '@Pimcore/components/title/title'
import { t } from 'i18next'
import { Flex } from '@Pimcore/components/flex/flex'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Content } from '@Pimcore/components/content/content'
import { usePredefinedProperties } from './hooks/use-predefined-properties'
import { Table } from './table/table'
import { Box, IconTextButton } from '@sdk/components'
import { PredefinedPropertyProvider } from './predefined-properties-provider'
import { usePredefinedProperty } from './hooks/use-predefined-property'
import { useAppDispatch } from '@sdk/app'
import { invalidatingTags } from '@Pimcore/app/api/pimcore/tags'
import { api } from '@sdk/api/properties'

const PredefinedPropertiesContainerInner = (): React.JSX.Element => {
  const dispatch = useAppDispatch()
  const { predefinedProperties, isLoading: predefinedPropertiesLoading } = usePredefinedProperties()
  const { createProperty, createLoading } = usePredefinedProperty()

  return (
    <ContentLayout
      renderToolbar={
        <Toolbar theme="secondary">
          <IconButton
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
              loading={ createLoading }
              icon={ { value: 'new' } }
              onClick={ async () => { await createProperty() } }
            >{t('predefined-properties.new')}</IconTextButton>
          </Flex>
        </Toolbar>
        }
    >
      <Content
        loading={ predefinedPropertiesLoading }
        margin={ {
          x: 'extra-small',
          y: 'none'
        } }
        none={ predefinedProperties.length === 0 && !predefinedPropertiesLoading }
      >
        <Box
          margin={ {
            x: 'extra-small',
            y: 'none'
          } }
        >
          <Table />
        </Box>
      </Content>
    </ContentLayout>
  )
}

const PredefinedPropertiesContainer = (): React.JSX.Element => (
  <PredefinedPropertyProvider>
    <PredefinedPropertiesContainerInner />
  </PredefinedPropertyProvider>
)

export { PredefinedPropertiesContainer }
