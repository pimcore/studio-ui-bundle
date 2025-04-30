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
import { useStyle } from './editor-tabs.skeleton.styles'
import { ElementToolbarSkeleton } from '@Pimcore/components/element-toolbar/element-toolbar.skeleton'

export const EditorTabsSkeleton = (): React.JSX.Element => {
  const { styles } = useStyle()

  return (
    <div className={ styles.skeleton }>
      <ElementToolbarSkeleton />

      <div className={ 'editor-tabs__skeleton' }>
        <Skeleton.Button
          active
          size={ 'small' }
        />
        <Skeleton.Button
          active
          size={ 'small' }
        />
        <Skeleton.Button
          active
          size={ 'small' }
        />
        <Skeleton.Button
          active
          size={ 'small' }
        />
      </div>
    </div>
  )
}
