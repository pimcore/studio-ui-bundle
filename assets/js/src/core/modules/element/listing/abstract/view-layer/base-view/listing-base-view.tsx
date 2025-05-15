/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type ComponentType, useMemo } from 'react'
import { useData } from '../../data-layer/provider/data/use-data'
import { GridContainer } from '../components/grid/grid-container'
import { Content } from '@Pimcore/components/content/content'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Sidebar } from '../components/sidebar/sidebar'

export interface ListingBaseViewProps {
  renderToolbar?: ComponentType
}

export const ListingBaseView = (props: ListingBaseViewProps): React.JSX.Element => {
  const { dataQueryResult } = useData()
  const ToolbarComponent = props.renderToolbar

  return useMemo(() => (
    <>
      { dataQueryResult === undefined && <Content loading /> }
      { dataQueryResult !== undefined && (
        <ContentLayout
          renderSidebar={ <Sidebar /> }
          renderToolbar={ ToolbarComponent !== undefined ? <ToolbarComponent /> : undefined }
        >
          <GridContainer />
        </ContentLayout>
      )}
    </>
  ), [dataQueryResult])
}
