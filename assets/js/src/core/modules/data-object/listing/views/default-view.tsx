/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo } from 'react'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { useData } from '@Pimcore/modules/element/listing/abstract/data-layer/provider/data/use-data'
import { Sidebar } from '@Pimcore/modules/element/listing/abstract/view-layer/components/sidebar/sidebar'
import { GridContainer } from '@Pimcore/modules/element/listing/abstract/view-layer/components/grid/grid-container'
import { useClassDefinitionSelection } from '../decorator/class-definition-selection/context-layer/provider/use-class-definition-selection'
import { Toolbar } from '../toolbar/toolbar'

export const DefaultView = (): React.JSX.Element => {
  const { dataQueryResult } = useData()
  const { selectedClassDefinition } = useClassDefinitionSelection()

  return useMemo(() => (
    <ContentLayout
      renderSidebar={ dataQueryResult !== undefined ? <Sidebar /> : undefined }
      renderToolbar={ dataQueryResult !== undefined ? <Toolbar /> : undefined }
    >
      {selectedClassDefinition !== undefined && dataQueryResult !== undefined && (
        <GridContainer />
      )}
    </ContentLayout>
  ), [dataQueryResult])
}
