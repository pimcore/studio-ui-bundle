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

export type Mode = 'create' | 'update'

export interface TreeAction {
  key: string
  icon: string
}

const PredefinedPropertiesContainer = (): React.JSX.Element => {

 const {predefinedProperties, isLoading} = usePredefinedProperties()

  return (
    <ContentLayout
      renderToolbar={
        <Toolbar theme="secondary">
          <IconButton
            icon={ { value: 'refresh' } }
            onClick={ () => {
        console.log("clicked");
        
            }
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
            <Title titleClass={ 'm-none' }>{t('widget.predefined-properties')}</Title>
          </Flex>
        </Toolbar>
        }
    >
      <Content
        loading={ false }
        margin={ {
          x: 'extra-small',
          y: 'none'
        } }
        none={ false }
      >
        {predefinedProperties !== undefined && predefinedProperties.map(property => (<>{property.name}</>))}
      </Content>
    </ContentLayout>
  )
}

export { PredefinedPropertiesContainer }
