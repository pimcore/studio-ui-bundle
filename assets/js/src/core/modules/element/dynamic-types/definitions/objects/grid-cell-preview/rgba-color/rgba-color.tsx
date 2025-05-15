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
import { GridCellPreviewWrapper } from '../grid-cell-cell-preview-wrapper/grid-cell-preview-wrapper'
import { isNil } from 'lodash'
import { useStyles } from './rgba-color.styles'
import { Flex } from '@Pimcore/components/flex/flex'

interface RgbaColorProps {
  value: string | null
}

export const RgbaColor = ({ value }: RgbaColorProps): React.JSX.Element => {
  const { styles } = useStyles()

  if (isNil(value)) {
    return <></>
  }

  return (
    <GridCellPreviewWrapper>
      <Flex
        align="center"
        gap="mini"
      >
        <span
          className={ styles.colorPreview }
          style={ { backgroundColor: value } }
        ></span>
        <span>
          { value }</span>
      </Flex>

    </GridCellPreviewWrapper>
  )
}
