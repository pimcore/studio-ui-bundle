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
