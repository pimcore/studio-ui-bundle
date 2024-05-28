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
// import { useGetVersionsQuery } from '@Pimcore/modules/element/editor/tab-manager/tabs/versions-api-slice.gen'
import { VersionsView } from '@Pimcore/modules/asset/editor/image/tab-manager/tabs/versions-view'

export const VersionsTabContainer = (): React.JSX.Element => {
  // const { data } = useGetVersionsQuery({
  //   page: 1,
  //   pageSize: 10,
  //   elementId: 1,
  //   elementType: 'asset'
  // })
  // console.log(data)
  return (
    <VersionsView />
  )
}
