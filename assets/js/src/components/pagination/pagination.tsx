import React, { type ReactNode, useEffect, useState } from 'react'
import { useCssComponentHash } from '@Pimcore/modules/ant-design/hooks/use-css-component-hash'
import { useStyle } from '@Pimcore/components/pagination/pagination.styles'
import { Icon } from '../icon/icon'
import { Button, Select } from 'antd'
import type { DefaultOptionType } from 'rc-select/lib/Select'
import i18n from '@Pimcore/app/i18n'
import { isSet } from '@Pimcore/utils/helpers'

interface PaginationProps {
  total: number
  current?: number
  defaultPageSize?: number
  pageSizeOptions?: number[] | string[]
  showSizeChanger?: boolean
  showPageJumperAtOnce?: number
  showJumpToPage?: boolean
  hideOnSinglePage?: boolean
  showTotal?: (total: number) => string
  onChange?: (page: number, pageSize: number) => void
}

export const Pagination = ({
  total,
  current = 1,
  defaultPageSize = 20,
  pageSizeOptions = [10, 20, 50, 100],
  showSizeChanger = false,
  showPageJumperAtOnce = 5,
  showJumpToPage = false,
  hideOnSinglePage = false,
  showTotal,
  onChange
}: PaginationProps): React.JSX.Element | null => {
  const hashId = useCssComponentHash('pagination')

  const [currentPage, setCurrentPage] = useState(current)
  const [pageSize, setPageSize] = useState(defaultPageSize)
  const [jumperLabelClassName, setJumperLabelClassName] = useState(showJumpToPage ? '' : 'display-none')

  useEffect(() => {
    if (isSet(onChange)) {
      onChange!(currentPage, pageSize)
    }
  }, [currentPage, pageSize])

  const iconOptions = { width: 10, height: 10 }
  const pages = Math.ceil(total / pageSize)

  if (total === 0 || (hideOnSinglePage && pages === 1)) {
    return null
  }

  const { styles } = useStyle()

  const pagesToJump = showPageJumperAtOnce - 2
  const pageNumberRange = getPageNumberRange(currentPage, showPageJumperAtOnce, pages)

  const onClickPageNumber = (pageNumber: number): void => {
    setCurrentPage(pageNumber)
  }

  const renderPageNumberItemsAndPageRangeJumper: ReactNode[] = [
    renderPageNumberNode(
      '1',
      getClassNameForPageNumber(1, currentPage),
      (e) => {
        onClickPageNumber(1)
      }
    )
  ]

  if (pageNumberRange.length > 0 && pageNumberRange[0] !== 2 && !showJumpToPage) {
    renderPageNumberItemsAndPageRangeJumper.push(
      renderPageRangeJumperPrevious(
        (e) => {
          setCurrentPage(currentPage - pagesToJump)
        },
        pagesToJump
      )
    )
  }

  for (const i of pageNumberRange) {
    renderPageNumberItemsAndPageRangeJumper.push(
      renderPageNumberNode(
        i.toString(),
        getClassNameForPageNumber(i, currentPage),
        (e) => {
          onClickPageNumber(i)
        }
      )
    )
  }

  if (!showJumpToPage && !isLastPageRendered(pageNumberRange, pages)) {
    renderPageNumberItemsAndPageRangeJumper.push(
      renderPageRangeJumperNext(
        (e) => {
          setCurrentPage(currentPage + pagesToJump)
        },
        pagesToJump
      )
    )
  }

  if (showJumpToPage && pages > 2) {
    const onKeyDownJumpToPage = (e): void => {
      if (e.key === 'Enter') {
        const value = Number(e.target.value)
        if (value > 0 && value <= pages) {
          setCurrentPage(value)
        }
      }
    }

    const onClickJumpToPageLabel = (e): void => {
      setJumperLabelClassName('display-none')
      e.target.previousElementSibling.focus()
    }

    const onBlurJumpToPage = (e): void => {
      setJumperLabelClassName('')
    }

    renderPageNumberItemsAndPageRangeJumper.push(
      renderJumpToPage(
        currentPage,
        jumperLabelClassName,
        onKeyDownJumpToPage,
        onClickJumpToPageLabel,
        onBlurJumpToPage
      )
    )
  }

  if (pages !== 1) {
    renderPageNumberItemsAndPageRangeJumper.push(
      renderPageNumberNode(
        pages.toString(),
        getClassNameForPageNumber(pages, currentPage),
        (e) => {
          onClickPageNumber(pages)
        }
      )
    )
  }

  const onClickPrev = (): void => {
    setCurrentPage(currentPage - 1)
  }

  const onClickNext = (): void => {
    setCurrentPage(currentPage + 1)
  }

  return (
    <div className={ styles.pagination }>
      <ul className={ 'ant-pagination ' + hashId }>
        {isSet(showTotal) ? renderTotal(total, showTotal!) : null}

        <li className={ `ant-pagination-prev ${currentPage === 1 ? 'ant-pagination-disabled' : ''}` }>
          <Button
            className={ 'ant-pagination-item-link' }
            disabled={ currentPage === 1 }
            icon={ <Icon
              name='left-outlined'
              options={ iconOptions }
                   /> }
            onClick={ onClickPrev }
            size={ 'small' }
            type={ 'text' }
          />
        </li>

        {renderPageNumberItemsAndPageRangeJumper}

        <li className={ `ant-pagination-next ${currentPage === pages ? 'ant-pagination-disabled' : ''}` }>
          <Button
            className={ 'ant-pagination-item-link' }
            disabled={ currentPage === pages }
            icon={ <Icon
              name='right-outlined'
              options={ iconOptions }
                   /> }
            onClick={ onClickNext }
            size={ 'small' }
            type={ 'text' }
          />
        </li>

        {showSizeChanger
          ? renderPageSizeChanger(
            pageSizeOptions,
            defaultPageSize,
            (pageSize: number) => {
              setPageSize(pageSize)
              setCurrentPage(1)
            }
          )
          : null}
      </ul>
    </div>
  )
}

function renderTotal (
  total: number,
  showTotal: (total: number) => string
): ReactNode {
  return (
    <li className="ant-pagination-total-text">
      {showTotal(total)}
    </li>
  )
}

function getPageNumberRange (
  current: number,
  showPageJumperAtOnce: number,
  pages: number
): number[] {
  if (showPageJumperAtOnce - 2 <= 0) {
    return []
  }

  const halfJumper = Math.floor(showPageJumperAtOnce / 2)

  let firstJumper = current - halfJumper + 1
  let overflow = 0
  if (firstJumper <= 1) {
    overflow = firstJumper * -1 + 2
    firstJumper = 2
  }

  let lastJumper = current + halfJumper - 1 + overflow
  if (lastJumper >= pages) {
    overflow = lastJumper - pages + 1
    lastJumper = pages - 1
    if (firstJumper - overflow > 1) {
      firstJumper -= overflow
    }
  }

  const numberRange: number[] = []
  for (let jumper = firstJumper; jumper <= lastJumper; jumper++) {
    numberRange.push(jumper)
  }

  return numberRange
}

function renderPageNumberNode (
  pageNumber: string,
  className: string,
  onClick: (e) => void
): ReactNode {
  return (
    <li
      className={ `ant-pagination-item ant-pagination-item-${pageNumber} ${className}` }
      key={ pageNumber }
      title={ pageNumber }
    >
      <a onClick={ onClick }>{pageNumber}</a>
    </li>
  )
}

function renderPageRangeJumperPrevious (
  onClick: (e) => void,
  pagesToJump: number
): ReactNode {
  return (
    <li
      className='ant-pagination-jump-prev ant-pagination-jump-prev-custom-icon'
      key='rangeJumperPrev'
      title={ i18n.t('pagination.prev-pages', { pages: pagesToJump }) }
    >
      <a
        className="ant-pagination-item-link"
        onClick={ onClick }
      >
        <div className="ant-pagination-item-container">
          <span
            aria-label="double-left"
            className="anticon anticon-double-left ant-pagination-item-link-icon"
            role="img"
          >
            <Icon
              name="double-left"
              options={ { width: 10, height: 10 } }
            />
          </span>
          <span className='ant-pagination-item-ellipsis'>•••</span>
        </div>
      </a>
    </li>
  )
}

function renderPageRangeJumperNext (
  onClick: (e) => void,
  pagesToJump: number
): ReactNode {
  return (
    <li
      className='ant-pagination-jump-next ant-pagination-jump-next-custom-icon'
      key='rangeJumperNext'
      title={ i18n.t('pagination.next-pages', { pages: pagesToJump }) }
    >
      <a
        className="ant-pagination-item-link"
        onClick={ onClick }
      >
        <div className="ant-pagination-item-container">
          <span
            aria-label="double-right"
            className="anticon anticon-double-right ant-pagination-item-link-icon"
            role="img"
          >
            <Icon
              name="double-right"
              options={ { width: 10, height: 10 } }
            />
          </span>
          <span className='ant-pagination-item-ellipsis'>•••</span>
        </div>
      </a>
    </li>
  )
}

function renderPageSizeChanger (
  pageSizeOptions: number[] | string [],
  defaultPageSize: number,
  handleChange: (pageSize) => void
): ReactNode {
  let isDefaultPageSizeOptionValid = false
  const options: DefaultOptionType[] = []

  for (const pageSizeOption of pageSizeOptions) {
    if (Number(pageSizeOption) === Number(defaultPageSize)) {
      isDefaultPageSizeOptionValid = true
    }

    options.push({
      value: pageSizeOption.toString(),
      label: pageSizeOption.toString() + ' / ' + i18n.t('pagination.page')
    })
  }

  if (!isDefaultPageSizeOptionValid) {
    console.error('Default page size is not a valid option. Default page size: ' + defaultPageSize)
  }

  return (
    <li className='ant-pagination-options'>
      <Select
        defaultValue={ defaultPageSize.toString() }
        onChange={ handleChange }
        options={ options }
      />
    </li>
  )
}

function renderJumpToPage (
  currentPage: number,
  classNameLabel: string,
  onKeyDown: (e) => void,
  onClickLabel: (e) => void,
  onBlurInput: (e) => void
): ReactNode {
  const onFocus = (e): void => {
    e.target.value = currentPage
    e.target.select()
  }

  return (
    <li
      className='ant-pagination-item'
      key='jump-to-range'
    >
      <div className="ant-pagination-item-container jump-to-container">
        <input
          className='jump-to-page'
          min='1'
          onBlur={ onBlurInput }
          onFocus={ onFocus }
          onKeyDown={ onKeyDown }
          type='number'
        />
        <a
          className={ 'jump-to-page-label ' + classNameLabel }
          onClick={ onClickLabel }
        >{currentPage}</a>
      </div>
    </li>
  )
}

function getClassNameForPageNumber (pageNumber: number, current: number): string {
  return pageNumber === current ? 'ant-pagination-item-active' : ''
}

function isLastPageRendered (pageNumberRange: number[], pages: number): boolean {
  return pageNumberRange.length === 0 || pageNumberRange.at(-1) === pages - 1
}
