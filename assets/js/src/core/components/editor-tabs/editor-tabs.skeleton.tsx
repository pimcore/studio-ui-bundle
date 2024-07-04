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
