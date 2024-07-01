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

import { Skeleton } from 'antd'
import React from 'react'
import { useStyle } from './element-toolbar.skeleton.styles'
import { BreadcrumbSkeleton } from '@Pimcore/components/breadcrumb/breadcrumb.skeleton'

export const ElementToolbarSkeleton = (): React.JSX.Element => {
  const { styles } = useStyle()

  return (
    <div className={ styles.skeleton }>
      <BreadcrumbSkeleton />

      <Skeleton.Button
        active
        size={ 'small' }
      />
      <Skeleton.Avatar
        active
        shape={ 'circle' }
        size={ 'small' }
      />
    </div>
  )
}
