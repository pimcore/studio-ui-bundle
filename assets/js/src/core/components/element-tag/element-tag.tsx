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

import React, { useRef } from 'react'
import { Tag } from '@Pimcore/components/tag/tag'
import { useElementHelper } from '@Pimcore/modules/element/hooks/use-element-helper'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { useStyles } from './element-tag.styles'
import { isUndefined } from 'lodash'
import cn from 'classnames'
import { Tooltip } from '../tooltip/tooltip'
import useElementOverflow from '../../utils/use-element-overflow'

export interface ElementTagProps {
  path: string
  elementType?: ElementType
  id?: number
  published?: boolean
  disabled?: boolean
  onClose?: () => void
}

export const ElementTag: React.FC<ElementTagProps> = ({ path, elementType, id, published, disabled, onClose }) => {
  const { openElement } = useElementHelper()
  const { styles } = useStyles()
  const textRef = useRef<HTMLSpanElement>(null)
  const isOverflow = useElementOverflow(textRef)

  const isUnpublished = published === false

  const isClickable = !isUndefined(elementType) && !isUndefined(id)

  const onClick = async (): Promise<void> => {
    if (isClickable) {
      await openElement({
        type: elementType,
        id
      })
    }
  }

  return (
    <Tooltip title={ isOverflow ? path : '' }>
      <Tag
        bordered={ false }
        className={ cn(styles.tag, { [styles.tagClickable]: isClickable, [styles.tagDisabled]: disabled }) }
        closeIcon={ !isUndefined(onClose) }
        color={ isUnpublished ? 'gold' : 'geekblue' }
        iconName={ isUnpublished ? 'eye-off' : undefined }
        onClick={ isClickable ? onClick : undefined }
        onClose={ onClose }
        ref={ textRef }
      >
        {path}
      </Tag>
    </Tooltip>
  )
}
