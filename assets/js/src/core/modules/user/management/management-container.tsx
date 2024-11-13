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
import { SplitLayout } from '@Pimcore/components/split-layout/split-layout'
import { TreeContainer } from '@Pimcore/modules/user/management/tree/tree-container'
import { ManagementDetail } from '@Pimcore/modules/user/management/detail/management-detail'

const ManagementContainer = ({ ...props }): React.JSX.Element => {
  const [loading, setLoading] = React.useState<boolean>(false)

  const sidebar = {
    id: 'user-tree',
    size: 20,
    minSize: 170,
    children: [
      <TreeContainer
        key={ 'user-tree' }
        loading={ loading }
      />
    ]
  }

  const main = {
    id: 'user-detail',
    size: 80,
    minSize: 600,
    children: [
      <ManagementDetail
        key="user-detail"
        onUpdate={ (loading) => { setLoading(loading) } }
      />
    ]
  }

  return (
    <SplitLayout
      leftItem={ sidebar }
      rightItem={ main }
      withDivider
      withToolbar
    />
  )
}

export { ManagementContainer }
