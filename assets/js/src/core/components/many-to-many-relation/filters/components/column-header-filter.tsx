/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Popover } from 'antd'
import cn from 'classnames'
import { isEqual, isNil } from 'lodash'
import { Button } from '@Pimcore/components/button/button'
import { DynamicFilter } from '@Pimcore/components/dynamic-filter/dynamic-filter'
import { Flex } from '@Pimcore/components/flex/flex'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { useDynamicTypeResolver } from '@Pimcore/modules/element/dynamic-types/resolver/hooks/use-dynamic-type-resolver'
import type { FieldFilter } from '@Pimcore/modules/element/listing/decorators/general-filters/context-layer/provider/field-filters/field-filters-provider'
import { RELATION_COLUMN_FILTERS_KEY, useRelationFilters } from '../filters'
import type { RelationFilterColumn } from '../types'
import { resolveFieldFilterType } from '../utils/row-matchers'
import { useStyles } from './column-header-filter.styles'

export interface ColumnHeaderFilterProps {
  children: React.ReactNode
  column: RelationFilterColumn
}

/**
 * Column header of the relation grid with its filter dropdown. The value is
 * edited locally and only written into the filter store on apply, so an
 * abandoned edit of one column cannot leak into another one.
 */
export const ColumnHeaderFilter = ({ children, column }: ColumnHeaderFilterProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()
  const { getType } = useDynamicTypeResolver()
  const { values, setValue } = useRelationFilters()

  const [open, setOpen] = useState<boolean>(false)

  const filters = (values[RELATION_COLUMN_FILTERS_KEY] ?? []) as FieldFilter[]
  const appliedFilter = filters.find((filter) => filter.key === column.key)
  const isActive = !isNil(appliedFilter)

  const [draftValue, setDraftValue] = useState<unknown>(appliedFilter?.filterValue)
  // The editors commit on blur, which happens while the apply click is already
  // being processed - the ref always carries the value the editor last emitted.
  const draftValueRef = useRef<unknown>(draftValue)

  const updateDraftValue = (value: unknown): void => {
    draftValueRef.current = value
    setDraftValue(value)
  }

  useEffect(() => {
    updateDraftValue(appliedFilter?.filterValue)
  }, [open])

  const writeFilters = (nextFilters: FieldFilter[]): void => {
    // Applying an unchanged filter must not refresh the rows of the grid.
    if (isEqual(nextFilters, filters)) {
      return
    }

    setValue(RELATION_COLUMN_FILTERS_KEY, nextFilters)
  }

  const handleApply = (): void => {
    const dynamicTypeFieldFilter = resolveFieldFilterType(getType, column)
    const otherFilters = filters.filter((filter) => filter.key !== column.key)
    const editedFilter: FieldFilter = {
      key: column.key,
      type: column.type,
      filterValue: draftValueRef.current,
      locale: null,
      meta: { translationKey: column.title }
    }

    // The filter type knows when its value is empty - an empty filter is dropped.
    const isFilled = !isNil(dynamicTypeFieldFilter) && dynamicTypeFieldFilter.shouldApply(editedFilter)

    writeFilters(isFilled ? [...otherFilters, editedFilter] : otherFilters)

    setOpen(false)
  }

  const handleReset = (): void => {
    updateDraftValue(undefined)
    writeFilters(filters.filter((filter) => filter.key !== column.key))
    setOpen(false)
  }

  const filterLabel = t('grid.filter.column', { column: column.title })

  const filterPanel = (
    <Flex
      className={ styles.panel }
      gap="small"
      vertical
    >
      <DynamicFilter
        config={ column.config }
        data={ draftValue }
        frontendType={ column.frontendType }
        id={ column.key }
        onChange={ updateDraftValue }
        translationKey={ column.title }
        type={ column.type }
      />

      <Flex
        gap="extra-small"
        justify="flex-end"
      >
        <Button
          onClick={ handleReset }
          type="link"
        >
          {t('reset')}
        </Button>

        <Button
          onClick={ handleApply }
          type="primary"
        >
          {t('button.apply')}
        </Button>
      </Flex>
    </Flex>
  )

  return (
    <span className={ styles.header }>
      <span className="many-to-many-relation-header-filter__label">{children}</span>

      <Popover
        content={ filterPanel }
        onOpenChange={ setOpen }
        open={ open }
        placement="bottomRight"
        trigger="click"
      >
        <IconButton
          aria-label={ filterLabel }
          className={ cn(styles.trigger, { [styles.triggerActive]: isActive }) }
          icon={ { value: 'filter' } }
          size="small"
          tooltip={ { title: filterLabel } }
        />
      </Popover>
    </span>
  )
}
