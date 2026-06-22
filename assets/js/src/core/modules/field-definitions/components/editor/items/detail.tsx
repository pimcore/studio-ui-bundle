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
import { DetailSave } from '@Pimcore/modules/field-definitions/components/editor/items/detail/save'
import { DetailSidebar } from '@Pimcore/modules/field-definitions/components/editor/items/detail/sidebar'
import { ImportExportActions } from '@Pimcore/modules/field-definitions/components/editor/items/detail/import-export-actions'
import { RefreshProvider } from '@Pimcore/modules/field-definitions/components/editor/items/detail/refresh-provider'
import { type ConfigurationPartial, useItems } from '@Pimcore/modules/field-definitions/components/editor/items/provider'
import { useSettings } from '@Pimcore/modules/field-definitions/components/editor/settings-provider'
import { type Layout } from '@Pimcore/modules/field-definitions/utils/layout-provider-factory'
import { type FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { ConfigLayout, Content, ContentLayout, Flex, IconButton, Toolbar } from '@sdk/components'
import { ApiError, trackError } from '@sdk/modules/app'
import React, { useCallback, useEffect, useMemo, useState } from 'react'

export interface ItemDetailProps {
  configuration: ConfigurationPartial
}

export const ItemDetail = (props: ItemDetailProps): React.JSX.Element => {
  const { useDetailGeneralSettingsQuery, useDetailLayoutQuery, useDetailLayoutAccessor, customLayouts, LayoutProvider } = useSettings()
  const { setDetailView } = useItems()
  const layoutResult = useDetailLayoutQuery?.({
    id: props.configuration.id
  })
  const layoutError = layoutResult?.error as FetchBaseQueryError | undefined

  const layoutAccessor = useDetailLayoutAccessor?.()

  const detailResult = useDetailGeneralSettingsQuery({
    id: props.configuration.id
  })
  const { isLoading: isDetailLoading, isFetching: isDetailFetching, refetch: refetchDetail, data: detailData } = detailResult
  const detailError = detailResult.error as FetchBaseQueryError | undefined

  const [layoutKey, setLayoutKey] = useState(0)

  // Derive layout synchronously so the LayoutProvider remount on `layoutKey`
  // bump always sees the latest data. Using useState + useEffect to sync
  // would lag by one render (effects run after commit), causing the
  // LayoutProvider to initialize from stale props on the refresh path.
  const layout = useMemo<Layout | undefined>(() => {
    if (layoutAccessor !== undefined && detailData !== undefined) {
      return layoutAccessor.accessor(detailData as Record<string, any>)
    }

    // @todo check this with backend team why 404 is returned for missing layouts
    if (layoutError !== undefined && 'status' in layoutError && layoutError.status === 404) {
      return {
        name: 'pimcore_root',
        children: [],
        fieldtype: 'panel',
        bodyStyle: '',
        border: false,
        collapsible: false,
        title: '',
        datatype: 'layout',
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
      }
    }

    return layoutResult?.data as Layout | undefined
  }, [layoutAccessor, detailData, layoutError, layoutResult?.data])

  useEffect(() => {
    if (layoutError !== undefined && (!('status' in layoutError) || layoutError.status !== 404)) {
      trackError(new ApiError(layoutError))
    }
  }, [layoutError])

  useEffect(() => {
    if (detailError !== undefined) {
      trackError(new ApiError(detailError))
    }
  }, [detailError])

  const refreshLayout = useCallback(async (): Promise<void> => {
    const promises: Array<Promise<unknown>> = [refetchDetail()]
    if (layoutResult?.refetch !== undefined) {
      promises.push(layoutResult.refetch())
    }
    await Promise.all(promises)
    setLayoutKey((prev) => prev + 1)
    setDetailView('general')
  }, [refetchDetail, layoutResult?.refetch, setDetailView])

  return (
    <RefreshProvider refreshLayout={ refreshLayout }>
      <GeneralSettingsProvider generalSettings={ detailData }>
        <LayoutProvider
          key={ layoutKey }
          layout={ layout }
        >
          <ContentLayout
            className="absolute-stretch"
            renderToolbar={
              <Toolbar>
                <Flex gap={ 'mini' }>
                  <IconButton
                    icon={ { value: 'refresh' } }
                    onClick={ () => { void refreshLayout() } }
                  />

                  <ImportExportActions />

                  {customLayouts?.ModalContent !== undefined && <CustomLayout />}
                </Flex>

                <DetailSave />
              </Toolbar>
            }
          >
            <Content loading={ layoutResult?.isLoading === true || isDetailLoading || layoutResult?.isFetching === true || isDetailFetching }>
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
    </RefreshProvider>
  )
}
