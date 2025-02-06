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

import React, { useMemo } from 'react'
import { useData } from '../data-layer/provider/data/use-data'
import { GridContainer } from './components/grid/grid-container'
import { Content } from '@Pimcore/components/content/content'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Toolbar } from './components/toolbar/toolbar'
import { Sidebar } from './components/sidebar/sidebar'

export const ViewLayerComponent = (): React.JSX.Element => {
  const { dataQueryResult } = useData()

  return useMemo(() => (
    <>
      { dataQueryResult === undefined && <Content loading /> }
      { dataQueryResult !== undefined && (
        <ContentLayout
          renderSidebar={ <Sidebar /> }
          renderToolbar={ <Toolbar /> }
        >
          <GridContainer />
        </ContentLayout>
      )}
    </>
  ), [dataQueryResult])
}
