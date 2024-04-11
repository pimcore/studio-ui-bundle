import React, { useEffect, useState } from 'react'
import { useCssComponentHash } from '@Pimcore/modules/ant-design/hooks/use-css-component-hash'
import { useStyle } from '@Pimcore/components/pagination/pagination.styles'
import { Icon } from '../icon/icon'
import { Button } from 'antd'
import i18n from '@Pimcore/app/i18n'
import { isSet } from '@Pimcore/utils/helpers'
import { SizeChanger } from '@Pimcore/components/pagination/size-changer/size-changer'
import { InlineTextfield } from '@Pimcore/components/pagination/inline-textfield/inline-textfield'

interface PaginationProps {
  total: number
  current?: number
  defaultPageSize?: number
  pageSizeOptions?: number[] | string[]
  showSizeChanger?: boolean
  showPageJumperAtOnce?: number
  showJumpToPage?: boolean
  showFirstAndLastPageAsIcon?: boolean
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
  showPageJumperAtOnce = 3,
  showJumpToPage = false,
  showFirstAndLastPageAsIcon = false,
  hideOnSinglePage = false,
  showTotal,
  onChange
}: PaginationProps): React.JSX.Element => {
  const hashId = useCssComponentHash('pagination')

  const [currentPage, setCurrentPage] = useState(current)
  const [pageSize, setPageSize] = useState(defaultPageSize)
  const jumperLabelClassName = showJumpToPage ? '' : 'display-none'

  useEffect(() => {
    if (isSet(onChange)) {
      onChange!(currentPage, pageSize)
    }
  }, [currentPage, pageSize])

  const pages = Math.ceil(total / pageSize)

  if (total === 0 || (hideOnSinglePage && pages === 1)) {
    return <></>
  }

  const { styles } = useStyle()

  const pageNumberRange = getPageNumberRange(
    currentPage,
    showPageJumperAtOnce,
    pages,
    showFirstAndLastPageAsIcon
  )

  const onClickPageNumber = (pageNumber: number): void => {
    setCurrentPage(pageNumber)
  }

  const renderPageNumberItemsAndPageRangeJumper: React.JSX.Element[] = []

  if (!showFirstAndLastPageAsIcon) {
    renderPageNumberItemsAndPageRangeJumper.push(
      PageNumberNode(
        '1',
        getClassNameForPageNumber(1, currentPage),
        (e) => {
          onClickPageNumber(1)
        }
      )
    )
  }

  if (pageNumberRange.length > 0 && pageNumberRange[0] !== 2 && !showJumpToPage) {
    renderPageNumberItemsAndPageRangeJumper.push(
      PageRangeJumperPrevious(
        (e) => {
          setCurrentPage(currentPage - showPageJumperAtOnce)
        },
        showPageJumperAtOnce
      )
    )
  }

  for (const i of pageNumberRange) {
    renderPageNumberItemsAndPageRangeJumper.push(
      PageNumberNode(
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
      PageRangeJumperNext(
        (e) => {
          setCurrentPage(currentPage + showPageJumperAtOnce)
        },
        showPageJumperAtOnce
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
        if (pageNumberRange.length > 0) {
          e.target.value = ''
        }
      }
    }

    renderPageNumberItemsAndPageRangeJumper.push(
      <li
        className='ant-pagination-item'
        key={ 'page-jumper' }
      >
        <InlineTextfield
          defaultClassNameLabel={ jumperLabelClassName }
          onKeyDown={ onKeyDownJumpToPage }
          value={ pageNumberRange.length > 0 ? '' : currentPage?.toString() }
        />
      </li>
    )
  }

  if (!showFirstAndLastPageAsIcon && pages !== 1) {
    renderPageNumberItemsAndPageRangeJumper.push(
      PageNumberNode(
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

  const onClickFirstPage = (): void => {
    setCurrentPage(1)
  }

  const onClickLastPage = (): void => {
    setCurrentPage(pages)
  }

  const onClickNext = (): void => {
    setCurrentPage(currentPage + 1)
  }

  const changePageSize = (pageSize: number): void => {
    setPageSize(pageSize)
    setCurrentPage(1)
  }

  return (
    <div className={ styles.pagination }>
      <ul className={ 'ant-pagination ' + hashId }>
        {isSet(showTotal) ? TotalField(total, showTotal!) : null}

        {
          showFirstAndLastPageAsIcon
            ? FirstPageIconButton(currentPage, onClickFirstPage)
            : null
        }
        {PreviousButton(currentPage, onClickPrev)}

        {renderPageNumberItemsAndPageRangeJumper}

        {NextButton(currentPage, pages, onClickNext)}

        {
          showFirstAndLastPageAsIcon
            ? LastPageIconButton(currentPage, pages, onClickLastPage)
            : null
        }

        { showSizeChanger
          ? (
            <li
              className='ant-pagination-options'
              key={ 'page-jumper' }
            >
              <SizeChanger
                defaultSize={ defaultPageSize }
                handleChange={ changePageSize }
                label={ i18n.t('pagination.page') }
                sizeOptions={ pageSizeOptions }
              />
            </li>
            )
          : null }
      </ul>
    </div>
  )
}

function PreviousButton (
  currentPage: number,
  onClickPrev: () => void
): React.JSX.Element {
  const iconOptions = { width: 10, height: 10 }
  return (
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
  )
}

function FirstPageIconButton (
  currentPage: number,
  onClickFirstPage?: () => void
): React.JSX.Element {
  const iconOptions = { width: 10, height: 10 }

  return (
    <li className={ `ant-pagination-prev ${currentPage === 1 ? 'ant-pagination-disabled' : ''}` }>
      <Button
        className={ 'ant-pagination-item-link' }
        disabled={ currentPage === 1 }
        icon={ <Icon
          name='arrow-first'
          options={ iconOptions }
               /> }
        onClick={ onClickFirstPage }
        size={ 'small' }
        type={ 'text' }
      />
    </li>
  )
}

function NextButton (
  currentPage: number,
  pages: number,
  onClickNext: () => void
): React.JSX.Element {
  const iconOptions = { width: 10, height: 10 }
  return (
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
  )
}

function LastPageIconButton (
  currentPage: number,
  pages: number,
  onClickLastPage?: () => void
): React.JSX.Element {
  const iconOptions = { width: 10, height: 10 }

  return (
    <li className={ `ant-pagination-prev ${currentPage === pages ? 'ant-pagination-disabled' : ''}` }>
      <Button
        className={ 'ant-pagination-item-link' }
        disabled={ currentPage === pages }
        icon={ <Icon
          name='arrows-pagination'
          options={ iconOptions }
               /> }
        onClick={ onClickLastPage }
        size={ 'small' }
        type={ 'text' }
      />
    </li>
  )
}

function TotalField (
  total: number,
  showTotal: (total: number) => string
): React.JSX.Element {
  return (
    <li className="ant-pagination-total-text">
      {showTotal(total)}
    </li>
  )
}

function getPageNumberRange (
  current: number,
  showPageJumperAtOnce: number,
  pages: number,
  includeFirstAndLastPage = false
): number[] {
  if (showPageJumperAtOnce <= 0) {
    return []
  }

  let firstNumber = 2
  let lastNumber = pages - 1
  if (includeFirstAndLastPage) {
    firstNumber = 1
    lastNumber = pages
  }

  const halfJumper = Math.floor(showPageJumperAtOnce / 2)
  let firstJumper = current - halfJumper
  let lastJumper = 0

  let overflow = 0
  if (firstJumper < firstNumber) {
    overflow = firstJumper * -1 + firstNumber
    firstJumper = firstNumber
  }

  if (showPageJumperAtOnce === 2) {
    if (includeFirstAndLastPage) {
      lastJumper = current === 1 ? 2 : current
    } else {
      if (pages === 3) {
        return [2]
      }
      lastJumper = current
      if (current === 1 || current === 2) {
        lastJumper = 3
      } else if (current === pages) {
        firstJumper = pages - 2
        lastJumper = pages - 1
      }
    }
  } else {
    lastJumper = current + halfJumper + overflow
    if (lastJumper > lastNumber) {
      overflow = lastJumper - lastNumber
      lastJumper = lastNumber
      if (firstJumper - overflow > 1) {
        firstJumper -= overflow
      }
    }
  }

  const numberRange: number[] = []
  for (let jumper = firstJumper; jumper <= lastJumper; jumper++) {
    numberRange.push(jumper)
  }

  return numberRange
}

function PageNumberNode (
  pageNumber: string,
  className: string,
  onClick: (e) => void
): React.JSX.Element {
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

function PageRangeJumperPrevious (
  onClick: (e) => void,
  pagesToJump: number
): React.JSX.Element {
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

function PageRangeJumperNext (
  onClick: (e) => void,
  pagesToJump: number
): React.JSX.Element {
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

function getClassNameForPageNumber (pageNumber: number, current: number): string {
  return pageNumber === current ? 'ant-pagination-item-active' : ''
}

function isLastPageRendered (pageNumberRange: number[], pages: number): boolean {
  return pageNumberRange.length === 0 || pageNumberRange.at(-1) === pages - 1
}
