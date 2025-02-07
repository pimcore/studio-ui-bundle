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

import React, { useEffect } from 'react'
import {
  useVersionGetCollectionForElementByTypeAndIdQuery
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/version-api-slice-enhanced'
import { VersionsView } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/versions-view'
import { Content } from '@Pimcore/components/content/content'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import {
  type VersionDetailViewsProps
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/types/types'
import {
  api
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/notes-and-events/notes-and-events-api-slice-enhanced'
import { invalidatingTags } from '@Pimcore/app/api/pimcore/tags'
import { useAppDispatch } from '@Pimcore/app/store'

interface VersionTabContainerProps extends VersionDetailViewsProps {}

export const VersionsTabContainer = ({ SingleViewComponent, ComparisonViewComponent }: VersionTabContainerProps): React.JSX.Element => {
  const { id, elementType } = useElementContext()
  const dispatch = useAppDispatch()

  const { isLoading, data } = useVersionGetCollectionForElementByTypeAndIdQuery({
    id,
    elementType,
    page: 1,
    pageSize: 9999
  })

  useEffect(() => {
    dispatch(
      api.util.invalidateTags(
        invalidatingTags.VERSIONS()
      ))
  }, [])

  if (isLoading) {
    return <Content loading />
  }

  return (
    <VersionsView
      ComparisonViewComponent={ ComparisonViewComponent }
      SingleViewComponent={ SingleViewComponent }
      versions={ data!.items }
    />
  )
}
