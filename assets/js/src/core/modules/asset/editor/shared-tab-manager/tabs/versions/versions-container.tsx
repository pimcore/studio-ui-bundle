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
import {
  useCleanupVersionMutation,
  useDeleteVersionMutation,
  useGetVersionsQuery,
  usePublishVersionMutation
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/versions/versions-api-slice.gen'
import { VersionsView } from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/versions/versions-view'
import { useGlobalAssetContext } from '@Pimcore/modules/asset/hooks/use-global-asset-context'
import { Result } from 'antd'

export const VersionsTabContainer = (): React.JSX.Element => {
  const { context } = useGlobalAssetContext()

  if (context === undefined) {
    return <Result title="No context" />
  }

  const [deleteVersion] = useDeleteVersionMutation()
  const [publishVersion] = usePublishVersionMutation()
  const [cleanupVersion] = useCleanupVersionMutation()

  const { isLoading, data } = useGetVersionsQuery({
    id: context?.config?.id,
    elementType: 'asset',
    page: 1,
    pageSize: 9999
  })

  if (isLoading) {
    return <div>Loading ...</div>
  }

  return (
    <div>
      <VersionsView
        onClickClearAll={ async (
          elementType,
          id
        ): Promise<void> => {
          await cleanupVersion({
            elementType,
            id
          })
        }
        }
        onClickDelete={
          async (id: number): Promise<void> => {
            await deleteVersion({
              id
            })
          }
        }
        onClickPublish={
          async (id: number): Promise<void> => {
            await publishVersion({
              id
            })
          }
        }
        versions={ data!.items }
      />
    </div>
  )
}
