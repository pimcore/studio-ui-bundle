/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useRef } from 'react'
import { Tag, type TagProps } from '@Pimcore/components/tag/tag'
import { useElementHelper } from '@Pimcore/modules/element/hooks/use-element-helper'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { useStyles } from './element-tag.styles'
import { isUndefined } from 'lodash'
import cn from 'classnames'
import { Tooltip } from '../tooltip/tooltip'
import useElementOverflow from '../../utils/use-element-overflow'
import { isEmptyValue } from '@Pimcore/utils/type-utils'

export interface ElementTagProps extends Omit<TagProps, 'id' | 'children'> {
  path: string
  elementType?: ElementType
  id?: number
  published?: boolean
  disabled?: boolean
  onClose?: () => void
  inline?: boolean
}

export const ElementTag: React.FC<ElementTagProps> = ({ path, elementType, id, published, disabled, onClose, inline = false, ...props }) => {
  const { openElement } = useElementHelper()
  const { styles } = useStyles()
  const textRef = useRef<HTMLSpanElement>(null)
  const isOverflow = useElementOverflow(textRef)

  const isUnpublished = published === false

  const isClickable = !isUndefined(elementType) && !isUndefined(id) && !isEmptyValue(path)

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
        className={ cn(inline ? styles.tagInline : styles.tag, { [styles.tagClickable]: isClickable, [styles.tagDisabled]: disabled }) }
        closeIcon={ disabled !== true && !isUndefined(onClose) }
        color={ isUnpublished ? 'gold' : 'geekblue' }
        iconName={ isUnpublished ? 'eye-off' : undefined }
        onClick={ isClickable ? onClick : undefined }
        onClose={ disabled === true ? undefined : onClose }
        ref={ textRef }
        { ...props }
      >
        <span className="tag-content">{path}</span>
      </Tag>
    </Tooltip>
  )
}
