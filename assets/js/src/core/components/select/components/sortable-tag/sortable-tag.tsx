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
import { CSS } from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable'
import cn from 'classnames'
import type { CustomTagProps } from 'rc-select/lib/BaseSelect'
import { Icon } from '@Pimcore/components/icon/icon'
import { useStyles } from '../../select.styles'

const MAX_TAG_SORTABLE_ID = '__sortable-tag-max__'

export const SortableTag = ({ label, value, disabled, onClose, closable, isMaxTag }: CustomTagProps): React.JSX.Element => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: isMaxTag ? MAX_TAG_SORTABLE_ID : String(value),
    disabled: isMaxTag || disabled
  })

  const { styles } = useStyles({})

  // Tags have varying widths, so dnd-kit's computed transform often carries a
  // scaleX/scaleY to bridge the size gap between old and new slots. Scaling the
  // element distorts its text, so we keep only the translate component.
  const style = {
    transform: CSS.Transform.toString(transform === null ? transform : { ...transform, scaleX: 1, scaleY: 1 }),
    transition
  }

  const handleRemoveMouseDown = (event: React.MouseEvent): void => {
    // Keep the remove click from being interpreted as the start of a drag.
    event.preventDefault()
    event.stopPropagation()
  }

  const handleRemoveKeyDown = (event: React.KeyboardEvent): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      onClose(undefined)
    }
  }

  return (
    <span
      className={ cn('ant-select-selection-item', styles.sortableTag, {
        'ant-select-selection-item-disabled': disabled,
        [styles.sortableTagDragging]: isDragging
      }) }
      ref={ setNodeRef }
      style={ style }
      title={ typeof label === 'string' ? label : undefined }
      { ...(isMaxTag ? {} : attributes) }
      { ...(isMaxTag ? {} : listeners) }
    >
      <span className="ant-select-selection-item-content">{label}</span>
      {closable && (
        <span
          aria-label="remove"
          className="ant-select-selection-item-remove"
          onClick={ onClose }
          onKeyDown={ handleRemoveKeyDown }
          onMouseDown={ handleRemoveMouseDown }
          role="button"
          tabIndex={ 0 }
        >
          <Icon value="close" />
        </span>
      )}
    </span>
  )
}
