import React, { useEffect, useState } from 'react'
import { useCssComponentHash } from '@Pimcore/modules/ant-design/hooks/use-css-component-hash'
import { useStyle } from '@Pimcore/components/pagination/pagination.styles'
import { Icon } from '../icon/icon'
import { Button } from 'antd'
import i18n from '@Pimcore/app/i18n'
import { isSet } from '@Pimcore/utils/helpers'
import { SizeChanger } from '@Pimcore/components/size-changer/size-changer'
import { EditableLabel } from '@Pimcore/components/editable-label/editable-label'

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

  const iconOptions = { width: 10, height: 10 }
  const pages = Math.ceil(total / pageSize)

  if (total === 0 || (hideOnSinglePage && pages === 1)) {
    return <></>
  }

  const { styles } = useStyle()

  const pagesToJump = showPageJumperAtOnce - 2
  const pageNumberRange = getPageNumberRange(currentPage, showPageJumperAtOnce, pages)

  const onClickPageNumber = (pageNumber: number): void => {
    setCurrentPage(pageNumber)
  }

  const renderPageNumberItemsAndPageRangeJumper: React.JSX.Element[] = [
    PageNumberNode(
      '1',
      getClassNameForPageNumber(1, currentPage),
      (e) => {
        onClickPageNumber(1)
      }
    )
  ]

  if (pageNumberRange.length > 0 && pageNumberRange[0] !== 2 && !showJumpToPage) {
    renderPageNumberItemsAndPageRangeJumper.push(
      PageRangeJumperPrevious(
        (e) => {
          setCurrentPage(currentPage - pagesToJump)
        },
        pagesToJump
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

    renderPageNumberItemsAndPageRangeJumper.push(
      <li className='ant-pagination-item'>
        <EditableLabel
          currentPage={ currentPage }
          defaultClassNameLabel={ jumperLabelClassName }
          onKeyDown={ onKeyDownJumpToPage }
        />
      </li>
    )
  }

  if (pages !== 1) {
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

        { showSizeChanger
          ? (
            <li className='ant-pagination-options'>
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
