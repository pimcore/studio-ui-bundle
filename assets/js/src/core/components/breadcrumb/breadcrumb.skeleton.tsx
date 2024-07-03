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
import { useStyle } from './breadcrumb.skeleton.styles'

export const BreadcrumbSkeleton = (): React.JSX.Element => {
  const { styles } = useStyle()

  return (
    <div className={ styles.skeleton }>
      <Skeleton.Button
        active
        size={ 'small' }
      />

      <Skeleton.Input
        active
        size={ 'small' }
      />

      <Skeleton.Input
        active
        size={ 'small' }
      />
    </div>
  )
}
