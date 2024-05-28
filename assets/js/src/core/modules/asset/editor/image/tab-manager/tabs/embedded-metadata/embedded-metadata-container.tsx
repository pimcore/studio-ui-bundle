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
import { useGetAssetByIdQuery } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { useGlobalAssetContext } from '@Pimcore/modules/asset/hooks/use-global-asset-context'
import { Result } from 'antd'
import { createColumnHelper } from '@tanstack/react-table'
import { Grid } from '@Pimcore/components/grid/grid'

export const EmbeddedMetadataTabContainer = (): React.JSX.Element => {
  const { context } = useGlobalAssetContext()

  if (context === undefined) {
    return <Result title="No context" />
  }

  const { data, isLoading, isError } = useGetAssetByIdQuery({ id: context?.config?.id })

  if (isLoading || data === undefined) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error</div>
  }

  const sampleEmbeddedMetadata = [
    { key: 'id', value: data.id },
    { key: 'filename', value: data.filename }
  ]

  const columnHelper = createColumnHelper()
  const columns = [
    columnHelper.accessor('key', {}),
    columnHelper.accessor('value', {})
  ]

  return (
    <>
      <h4>Embedded Metadata TAB</h4>
      <div style={ { marginLeft: 0 } }>
        <Grid
          columns={ columns }
          data={ sampleEmbeddedMetadata }
        />
      </div>
    </>
  )
}
