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
import { Flex, IconButton, Select, type SelectProps } from '@sdk/components'
import { useTranslation } from 'react-i18next'
import { useStyles } from '@Pimcore/components/pagination/pagination.styles'
import cn from 'classnames'

export interface PaginationProps extends Omit<BasePaginationProps, 'pageSize' | 'defaultCurrent' | 'onShowSizeChange' | 'responsive' | 'totalBoundaryShowSizeChanger'> {
}

export const Pagination = (props: PaginationProps): React.JSX.Element => {
  'use memo'

  const { t } = useTranslation()
  const { styles } = useStyles()

  const defaultProps: Partial<PaginationProps> = {
    current: 1,
    defaultPageSize: 20,
    pageSizeOptions: ['10', '20', '50', '100'],
    showSizeChanger: false,
    simple: true,
    size: 'small'
  }

  const { showSizeChanger, className, hideOnSinglePage, defaultPageSize, current: baseCurrent, onChange, ...paginationProps } = { ...defaultProps, ...props }
  const classNames = cn(styles.pagination, className)

  const [current, setCurrent] = useState(baseCurrent ?? 1)
  const [pageSize, setPageSize] = useState(defaultPageSize ?? 20)

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

  const selectOptions: SelectProps['options'] = paginationProps.pageSizeOptions?.map(option => ({
    label: `${option} / ${t('pagination.page')}`,
    value: option
  })) ?? []

  const onSelectChange: SelectProps['onChange'] = (value) => {
    setCurrent(1)
    setPageSize(Number(value))
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
        <Select
          onChange={ onSelectChange }
          options={ selectOptions }
          value={ `${pageSize} / ${t('pagination.page')}` }
          disabled={ paginationProps.disabled }
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
