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
import { isNull } from 'lodash'
import { CSS } from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable'
import cn from 'classnames'
import type { CustomTagProps } from 'rc-select/lib/BaseSelect'
import type { SelectProps } from 'antd'
import { useTranslation } from 'react-i18next'
import { Icon } from '@Pimcore/components/icon/icon'
import { useStyles } from '../../select.styles'
import { getSortableTagId } from '../sortable-tags/reorder-tags'

const MAX_TAG_SORTABLE_ID = '__sortable-tag-max__'

export interface SortableTagProps extends CustomTagProps {
  /** rc-select's `disabled` belongs to the option, so the disabled state of the Select itself is passed separately. */
  selectDisabled?: boolean
}

export const SortableTag = ({ label, value, disabled, selectDisabled = false, onClose, closable, isMaxTag }: SortableTagProps): React.JSX.Element => {
  const { t } = useTranslation()
  const isSortable = !isMaxTag && !disabled && !selectDisabled
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: isMaxTag ? MAX_TAG_SORTABLE_ID : getSortableTagId(value),
    disabled: !isSortable
  })

  const { styles } = useStyles({})

  // Tags have varying widths, so dnd-kit's computed transform often carries a
  // scaleX/scaleY to bridge the size gap between old and new slots. Scaling the
  // element distorts its text, so we keep only the translate component.
  const style = {
    transform: CSS.Transform.toString(isNull(transform) ? transform : { ...transform, scaleX: 1, scaleY: 1 }),
    transition
  }

  // rc-select toggles the dropdown on every mousedown inside the selector, so a drag would open it.
  // dnd-kit starts the drag on pointerdown, which is not affected.
  const stopMouseDown = (event: React.MouseEvent): void => {
    event.stopPropagation()
  }

  const handleRemoveMouseDown = (event: React.MouseEvent): void => {
    event.preventDefault()
    event.stopPropagation()
  }

  return (
    <span
      className={ cn('ant-select-selection-item', {
        'ant-select-selection-item-disabled': disabled,
        [styles.sortableTagDragging]: isDragging
      }) }
      ref={ setNodeRef }
      style={ style }
      title={ typeof label === 'string' ? label : undefined }
    >
      {/* The label is the drag handle, so the remove button is not nested inside an interactive element. */}
      <span
        className={ cn('ant-select-selection-item-content', { [styles.sortableTagHandle]: isSortable }) }
        { ...(isSortable ? { ...attributes, ...listeners, onMouseDown: stopMouseDown } : {}) }
      >
        {label}
      </span>
      {closable && (
        <button
          aria-label={ t('remove') }
          className={ cn('ant-select-selection-item-remove', styles.tagRemoveButton) }
          onClick={ onClose }
          onMouseDown={ handleRemoveMouseDown }
          type="button"
        >
          <Icon value="close" />
        </button>
      )}
    </span>
  )
}

export const createSortableTagRender = (selectDisabled: boolean): NonNullable<SelectProps['tagRender']> => {
  const renderSortableTag = (tagProps: CustomTagProps): React.JSX.Element => (
    <SortableTag
      { ...tagProps }
      selectDisabled={ selectDisabled }
    />
  )

  return renderSortableTag
}
