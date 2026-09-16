/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useState } from 'react'
import { Pagination as BasePagination, type PaginationProps as BasePaginationProps, ConfigProvider } from 'antd'
import { CreatableSelect, Flex, IconButton, type SelectProps } from '@sdk/components'
import { type SelectOptionType } from '@sdk/modules/element'
import { useTranslation } from 'react-i18next'
import { useStyles } from '@Pimcore/components/pagination/pagination.styles'
import cn from 'classnames'
import { getDefaultPageSize, getMaxPageSize, getPageSizeOptions } from '@Pimcore/components/pagination/page-size'

export interface PaginationProps extends Omit<BasePaginationProps, 'pageSize' | 'defaultCurrent' | 'onShowSizeChange' | 'responsive' | 'totalBoundaryShowSizeChanger'> {
  /** Cap of the endpoint behind this pager, when it is stricter than the configured maximum. */
  maxPageSize?: number
}

export const Pagination = (props: PaginationProps): React.JSX.Element => {
  'use memo'

  const { t } = useTranslation()
  const { styles } = useStyles()

  const defaultProps: Partial<PaginationProps> = {
    current: 1,
    defaultPageSize: getDefaultPageSize(props.maxPageSize),
    pageSizeOptions: getPageSizeOptions(props.maxPageSize),
    showSizeChanger: false,
    simple: true,
    size: 'small'
  }

  const { showSizeChanger, className, hideOnSinglePage, defaultPageSize, maxPageSize, current: baseCurrent, onChange, ...paginationProps } = { ...defaultProps, ...props }
  const classNames = cn(styles.pagination, className)

  const maxPageSizeLimit = getMaxPageSize(maxPageSize)
  const isValidPageSize = (size: number): boolean => Number.isInteger(size) && size > 0 && size <= maxPageSizeLimit
  const initialPageSize = Math.min(defaultPageSize ?? getDefaultPageSize(maxPageSize), maxPageSizeLimit)

  const [current, setCurrent] = useState(baseCurrent ?? 1)
  const [pageSize, setPageSize] = useState(initialPageSize)

  useEffect(() => {
    setCurrent(baseCurrent ?? 1)
  }, [baseCurrent])

  useEffect(() => {
    onChange?.(current, pageSize)
  }, [current, pageSize])

  const onBasePaginationChange: PaginationProps['onChange'] = (page: number, size: number) => {
    setCurrent(page)
    setPageSize(size)
  }

  // Only bites when a pager passes a stricter endpoint cap; config validation already bounds the rest.
  const selectOptions: SelectOptionType[] = (paginationProps.pageSizeOptions ?? [])
    .map(Number)
    .filter(isValidPageSize)
    .map(option => ({
      label: `${option} / ${t('pagination.page')}`,
      value: String(option)
    }))

  const onSelectChange: SelectProps['onChange'] = (value) => {
    const parsedValue = Number(value)

    if (!isValidPageSize(parsedValue)) {
      return
    }

    setCurrent(1)
    setPageSize(parsedValue)
  }

  const itemRenderer: PaginationProps['itemRender'] = (page, type, originalElement) => {
    if (type === 'next') {
      return (
        <IconButton
          className='pagination-control pagination-control--next'
          icon={ { value: 'chevron-right' } }
        />
      )
    }

    if (type === 'prev') {
      return (
        <IconButton
          className='pagination-control pagination-control--prev'
          icon={ { value: 'chevron-left' } }
        />
      )
    }

    return originalElement
  }

  const shouldHidePagination = hideOnSinglePage === true && paginationProps.total !== undefined && paginationProps.total <= pageSize

  if (shouldHidePagination) {
    return <></>
  }

  const Pagination = (
    <Flex
      gap={ 'extra-small' }
      style={ { marginLeft: 4 } }
    >
      <BasePagination
        { ...paginationProps }
        className={ classNames }
        current={ current }
        itemRender={ paginationProps.itemRender ?? itemRenderer }
        onChange={ onBasePaginationChange }
        pageSize={ pageSize }
        showSizeChanger={ false }
      />

      {showSizeChanger === true && (
        <CreatableSelect
          disabled={ paginationProps.disabled }
          inputType="number"
          numberInputProps={ { min: 1, max: maxPageSizeLimit, precision: 0 } }
          onChange={ onSelectChange }
          onCreateOption={ (value) => ({
            value,
            label: `${value} / ${t('pagination.page')}`
          }) }
          options={ selectOptions }
          popupMatchSelectWidth={ false }
          validate={ (value) => /^\d+$/.test(value.trim()) && isValidPageSize(Number(value)) }
          value={ String(pageSize) }
          width={ 112 }
        />
      )}
    </Flex>
  )

  if (paginationProps.simple === true && paginationProps.size === 'small') {
    return (
      <Flex
        align='center'
        style={ { height: 32 } }
      >
        <ConfigProvider componentSize='small'>
          {Pagination}
        </ConfigProvider>
      </Flex>
    )
  }

  return Pagination
}
