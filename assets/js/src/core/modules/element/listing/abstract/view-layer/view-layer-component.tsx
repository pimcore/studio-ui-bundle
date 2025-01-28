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
import { useData } from '../data-layer/provider/data/use-data'
import { GridContainer } from './components/grid/grid-container'
import { Content } from '@Pimcore/components/content/content'

export const ViewLayerComponent = (): React.JSX.Element => {
  const { dataQueryResult } = useData()

  if (dataQueryResult === undefined) {
    return <Content loading />
  }

  return <GridContainer />
}
