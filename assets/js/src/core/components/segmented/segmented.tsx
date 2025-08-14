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
import { useStyles } from '@Pimcore/components/segmented/segmented.styles'
import { Segmented as AntdSegmented } from 'antd'
import type { SegmentedProps as AntdSegmentedProps } from 'antd/es/segmented'
import { useFieldWidth } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/use-field-width'

export interface SegmentedProps extends Omit<AntdSegmentedProps<string>, 'ref'> {
}

const Segmented = React.forwardRef<HTMLDivElement, SegmentedProps>(({
  options,
  style,
  ...props
}: SegmentedProps, ref): React.JSX.Element => {
  const { styles } = useStyles()
  const fieldWidths = useFieldWidth()

  // Apply medium width as default for segmented controls
  const computedStyle = {
    width: fieldWidths.medium,
    ...style
  }

  return (
    <div
      className={ styles.segmented }
      ref={ ref }
    >
      <AntdSegmented<string>
        options={ options }
        style={ computedStyle }
        { ...props }
      />
    </div>
  )
})

Segmented.displayName = 'Segmented'

export { Segmented }
