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
import { getDefaultPageSize, getMaxPageSize, getPageSizeOptions } from '@Pimcore/components/pagination/page-size'

// Seconds. The page controls explain themselves; their tooltip is only a fallback, so it waits much
// longer than the delay of other action buttons and does not pop up while paging.
const pageControlTooltipDelay = 1.5

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

  const { showSizeChanger, className, hideOnSinglePage, defaultPageSize, maxPageSize, current: baseCurrent, onChange, showTotal, itemRender, ...paginationProps } = { ...defaultProps, ...props }

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

  const total = paginationProps.total ?? 0
  // The page count as antd computes it: no page at all for an empty list.
  const pageCount = Math.floor((total - 1) / pageSize) + 1
  const isDisabled = paginationProps.disabled === true
  const canGoBack = !isDisabled && current > 1
  const canGoForward = !isDisabled && current < pageCount

  // Antd has no first and last page controls, so all four page controls are drawn here, around
  // antd's page input; antd's own previous and next are left out (pageItemRenderer).
  const pageControl = (name: string, icon: string, label: string, page: number, enabled: boolean): React.JSX.Element => (
    <IconButton
      aria-label={ label }
      className={ `pagination-control pagination-control--${name}` }
      disabled={ !enabled }
      icon={ { value: icon } }
      onClick={ () => { setCurrent(page) } }
      tooltip={ { title: label, mouseEnterDelay: pageControlTooltipDelay } }
    />
  )

  const pageItemRenderer: PaginationProps['itemRender'] = (page, type, originalElement) => {
    if (type === 'prev' || type === 'next') {
      return null
    }

    return itemRender?.(page, type, originalElement) ?? originalElement
  }

  // Drawn here rather than by antd, which would put it between the previous control and the input.
  const totalText = showTotal === undefined
    ? null
    : (
      <span className={ styles.totalText }>
        {showTotal(total, [total === 0 ? 0 : (current - 1) * pageSize + 1, Math.min(current * pageSize, total)])}
      </span>
      )

  const shouldHidePagination = hideOnSinglePage === true && paginationProps.total !== undefined && paginationProps.total <= pageSize

  if (shouldHidePagination) {
    return <></>
  }

  const Pagination = (
    <Flex
      gap={ 'extra-small' }
      style={ { marginLeft: 4 } }
    >
      <Flex
        align='center'
        className={ styles.controls }
        gap='mini'
      >
        {totalText}
        {pageControl('first', 'chevron-left-pipe', t('pagination.first-page'), 1, canGoBack)}
        {pageControl('prev', 'chevron-left', t('pagination.previous-page'), current - 1, canGoBack)}
        <BasePagination
          { ...paginationProps }
          className={ className }
          current={ current }
          itemRender={ pageItemRenderer }
          onChange={ onBasePaginationChange }
          pageSize={ pageSize }
          showSizeChanger={ false }
        />
        {pageControl('next', 'chevron-right', t('pagination.next-page'), current + 1, canGoForward)}
        {pageControl('last', 'chevron-right-pipe', t('pagination.last-page'), pageCount, canGoForward)}
      </Flex>

      {showSizeChanger === true && (
        <CreatableSelect
          className={ styles.pageSizeSelect }
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
