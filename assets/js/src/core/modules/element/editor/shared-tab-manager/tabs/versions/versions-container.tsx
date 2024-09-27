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
  useVersionCleanupForElementByTypeAndIdMutation,
  useVersionDeleteByIdMutation,
  useVersionGetCollectionForElementByTypeAndIdQuery,
  useVersionPublishByIdMutation, useVersionUpdateByIdMutation
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/version-api-slice-enhanced'
import { VersionsView } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/versions-view'
import { Content } from '@Pimcore/components/content/content'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import {
  type SingleVersionViewProps,
  type VersionComparisonViewProps
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/version-details-props'

export interface VersionTabContainerProps extends VersionDetailViewsProps {
}

export interface VersionDetailViewsProps {
  SingleViewComponent: React.ComponentType<SingleVersionViewProps>
  ComparisonViewComponent: React.ComponentType<VersionComparisonViewProps>
}

export const VersionsTabContainer = ({
  SingleViewComponent,
  ComparisonViewComponent
}: VersionTabContainerProps): React.JSX.Element => {
  const { id, elementType } = useElementContext()

  const [deleteVersion] = useVersionDeleteByIdMutation()
  const [publishVersion] = useVersionPublishByIdMutation()
  const [cleanupVersion] = useVersionCleanupForElementByTypeAndIdMutation()
  const [updateVersion] = useVersionUpdateByIdMutation()

  const { isLoading, data } = useVersionGetCollectionForElementByTypeAndIdQuery({
    id,
    elementType,
    page: 1,
    pageSize: 9999
  })

  if (isLoading) {
    return <Content loading />
  }

  return (
    <VersionsView
      ComparisonViewComponent={ ComparisonViewComponent }
      SingleViewComponent={ SingleViewComponent }
      onBlurNote={
        async (id, note): Promise<void> => {
          await updateVersion({
            id,
            updateVersion: {
              note
            }
          })
        }
      }
      onClickClearAll={ async (
        elementType,
        id
      ): Promise<void> => {
        await cleanupVersion({
          elementType,
          id
        })
      } }
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
  )
}
