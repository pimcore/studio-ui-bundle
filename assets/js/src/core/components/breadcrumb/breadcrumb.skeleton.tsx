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
