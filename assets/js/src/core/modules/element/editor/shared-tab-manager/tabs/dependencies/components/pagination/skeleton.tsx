/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { Skeleton } from 'antd'
import { useStyle } from './skeleton.styles'

export const PaginationSkeleton = (): React.JSX.Element => {
  const { styles } = useStyle()

  return (
    <div className={ styles.skeleton }>
      <Skeleton.Input
        active
        size={ 'small' }
      />

      <Skeleton.Button
        active
        className={ 'square' }
        size={ 'small' }
      />

      <Skeleton.Button
        active
        className={ 'square' }
        size={ 'small' }
      />

      <Skeleton.Button
        active
        className={ 'square' }
        size={ 'small' }
      />

      <Skeleton.Button
        active
        size={ 'small' }
      />

    </div>
  )
}
