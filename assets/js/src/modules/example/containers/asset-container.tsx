import { Grid } from '@Pimcore/components/grid/grid'
import { useApiAssetsIdGetQuery } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { createColumnHelper } from '@tanstack/react-table'
import { Breadcrumb, Divider, type BreadcrumbProps } from 'antd'
import React from 'react'

interface AssetContainerProps {
  id: number
}

export const AssetContainer = ({ id }: AssetContainerProps): React.JSX.Element => {
  const { isLoading, isError, data } = useApiAssetsIdGetQuery({ id: id.toString() })

  if (isLoading || data === undefined) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error</div>
  }

  const assetData = [
    { key: 'id', value: data.id },
    { key: 'filename', value: data.filename }
  ]

  const columnHelper = createColumnHelper()

  const columns = [
    columnHelper.accessor('key', {}),
    columnHelper.accessor('value', {})
  ]

  const breadcrumbItems: BreadcrumbProps['items'] = [{
    title: 'Home'
  }]

  data.fullPath?.split('/').forEach((item, index) => {
    if (item !== '') {
      breadcrumbItems.push({
        title: item
      })
    }
  })

  return (
    <>
      <Breadcrumb
        items={ breadcrumbItems }
        style={ { marginTop: 4, marginLeft: 8 } }
      />
      <Divider style={ { marginTop: 5, marginBottom: 0 } } />
      <div style={ { marginLeft: 0 } }>
        <Grid
          columns={ columns }
          data={ assetData }
        />
      </div>
    </>
  )
}
