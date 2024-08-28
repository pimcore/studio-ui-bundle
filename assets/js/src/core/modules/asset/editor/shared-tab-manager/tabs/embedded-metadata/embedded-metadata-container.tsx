/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import React from 'react'
import { useAssetCustomSettingsGetByIdQuery } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { useGlobalAssetContext } from '@Pimcore/modules/asset/hooks/use-global-asset-context'
import { Result } from 'antd'
import { createColumnHelper } from '@tanstack/react-table'
import { Grid } from '@Pimcore/components/grid/grid'
import { useTranslation } from 'react-i18next'
import {
  ContentHeaderContainer
} from '@Pimcore/components/content-containers/content-header-container'
import { ContentPaddingContainer } from '@Pimcore/components/content-containers/content-padding-container'

export const EmbeddedMetadataTabContainer = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { context } = useGlobalAssetContext()

  if (context === undefined) {
    return <Result title="No context" />
  }

  const { data, isLoading, isError } = useAssetCustomSettingsGetByIdQuery({ id: context?.config?.id })

  if (isLoading || data === undefined) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error</div>
  }

  const columnHelper = createColumnHelper()
  const columns = [
    columnHelper.accessor('name', {
      header: t('asset.asset-editor-tabs.embedded-metadata.columns.name'),
      size: 400
    }),
    columnHelper.accessor('value', {
      header: t('asset.asset-editor-tabs.embedded-metadata.columns.value'),
      size: 400
    })
  ]

  const embeddedMetaData = data.items?.fixedCustomSettings?.embeddedMetadata ?? []

  /* eslint-disable @typescript-eslint/no-unsafe-argument */
  const reformattedEmbeddedMetaData = Object.entries(embeddedMetaData).map(([key, value]) => {
    return {
      name: String(key).toString(),
      value: String(value).toString()
    }
  })

  return (
    <div>
      <ContentHeaderContainer
        text={ t('asset.asset-editor-tabs.embedded-metadata.headline') }
      />

      <ContentPaddingContainer>
        <Grid
          columns={ columns }
          data={ reformattedEmbeddedMetaData }
          enableSorting
          sorting={ [{ id: 'name', desc: false }] }
        />
      </ContentPaddingContainer>
    </div>
  )
}
