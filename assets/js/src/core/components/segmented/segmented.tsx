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
import { useStyles } from '@Pimcore/components/segmented/segmented.styles'
import { Segmented as AntdSegmented } from 'antd'
import type { SegmentedProps as AntdSegmentedProps } from 'antd/es/segmented'

export interface SegmentedProps extends Omit<AntdSegmentedProps<string>, 'ref'> {
}

const Segmented = React.forwardRef<HTMLDivElement, SegmentedProps>(({
  options,
  ...props
}: SegmentedProps, ref): React.JSX.Element => {
  const { styles } = useStyles()

  return (
    <div
      className={ styles.segmented }
      ref={ ref }
    >
      <AntdSegmented<string>
        options={ options }
        { ...props }
      />
    </div>
  )
})

Segmented.displayName = 'Segmented'

export { Segmented }
