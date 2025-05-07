/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
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
