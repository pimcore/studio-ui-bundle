/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { CustomLayout } from '@Pimcore/modules/field-definitions/components/editor/custom-layout/custom-layout'
import { DetailContent } from '@Pimcore/modules/field-definitions/components/editor/items/detail/content'
import { GeneralSettingsProvider } from '@Pimcore/modules/field-definitions/components/editor/items/detail/general-settings-provider'
import { type Layout, LayoutProvider } from '@Pimcore/modules/field-definitions/components/editor/items/detail/layout-provider'
import { DetailSave } from '@Pimcore/modules/field-definitions/components/editor/items/detail/save'
import { DetailSidebar } from '@Pimcore/modules/field-definitions/components/editor/items/detail/sidebar'
import { type ConfigurationPartial } from '@Pimcore/modules/field-definitions/components/editor/items/provider'
import { useSettings } from '@Pimcore/modules/field-definitions/components/editor/settings-provider'
import { type FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { ConfigLayout, Content, ContentLayout, Flex, IconButton, Toolbar } from '@sdk/components'
import { ApiError, trackError } from '@sdk/modules/app'
import React, { useEffect, useState } from 'react'

export interface ItemDetailProps {
  configuration: ConfigurationPartial
}

export const ItemDetail = (props: ItemDetailProps): React.JSX.Element => {
  const { useDetailGeneralSettingsQuery, useDetailLayoutQuery } = useSettings()
  const layoutResult = useDetailLayoutQuery({
    id: props.configuration.id
  })
  const { isLoading: isLayoutLoading, isFetching: isLayoutFetching, refetch: refetchLayout, data: layoutData } = layoutResult
  const layoutError = layoutResult.error as FetchBaseQueryError | undefined

  const detailResult = useDetailGeneralSettingsQuery({
    id: props.configuration.id
  })
  const { isLoading: isDetailLoading, isFetching: isDetailFetching, refetch: refetchDetail, data: detailData } = detailResult
  const detailError = detailResult.error as FetchBaseQueryError | undefined

  const [layout, setLayout] = useState<Layout | undefined>(layoutData as Layout | undefined)

  useEffect(() => {
    setLayout(layoutData as Layout | undefined)
  }, [layoutData])

  useEffect(() => {
    // @todo check this with backend team why 404 is returned for missing layouts
    if (layoutError !== undefined && 'status' in layoutError && layoutError.status === 404) {
      setLayout({
        name: 'pimcore_root',
        children: [],
        fieldType: 'panel',
        bodyStyle: '',
        border: false,
        collapsible: false,
        title: '',
        dataType: 'layout',
        collapsed: false,
        height: 0,
        width: 0,
        icon: { type: 'name', value: 'none' },
        labelAlign: 'left',
        labelWidth: 100,
        layout: null,
        locked: false,
        region: '',
        type: 'layout',
        additionalAttributes: {}
      })
      return
    }

    if (layoutError !== undefined) {
      trackError(new ApiError(layoutError))
    }
  }, [layoutError])

  useEffect(() => {
    if (detailError !== undefined) {
      trackError(new ApiError(detailError))
    }
  }, [detailError])

  return (
    <GeneralSettingsProvider generalSettings={ detailData }>
      <LayoutProvider layout={ layout }>
        <ContentLayout
          className="absolute-stretch"
          renderToolbar={
            <Toolbar>
              <Flex gap={ 'mini' }>
                <IconButton
                  icon={ { value: 'refresh' } }
                  onClick={ () => {
                    void refetchLayout()
                    void refetchDetail()
                  } }
                />

                <CustomLayout />
              </Flex>

              <DetailSave />
            </Toolbar>
          }
        >
          <Content loading={ isLayoutLoading || isDetailLoading || isLayoutFetching || isDetailFetching }>
            <ConfigLayout
              leftItem={ {
                minSize: 250,
                maxSize: 350,
                size: 250,
                children: (
                  <DetailSidebar />
                )
              } }
              resizeAble

              rightItem={ {
                children: <DetailContent />
              } }
            />
          </Content>
        </ContentLayout>
      </LayoutProvider>
    </GeneralSettingsProvider>
  )
}
