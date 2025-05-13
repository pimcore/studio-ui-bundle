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
import {
  useVersionGetCollectionForElementByTypeAndIdQuery
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/version-api-slice-enhanced'
import { VersionsView } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/versions-view'
import { Content } from '@Pimcore/components/content/content'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import {
  type VersionDetailViewsProps
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/types/types'

interface VersionTabContainerProps extends VersionDetailViewsProps {}

export const VersionsTabContainer = ({ SingleViewComponent, ComparisonViewComponent }: VersionTabContainerProps): React.JSX.Element => {
  const { id, elementType } = useElementContext()

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
      versions={ data!.items }
    />
  )
}
