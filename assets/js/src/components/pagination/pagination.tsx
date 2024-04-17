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

  const onClickPageNumber = (pageNumber: number): void => {
    setCurrentPage(pageNumber)
  }

  const renderPageNumberItems: React.JSX.Element[] = []

  const getPageNumberItems = (pageNumberRange: number[]): React.JSX.Element[] => {
    return pageNumberRange.map((pageNumber) => {
      return PageNumberNode(
        pageNumber.toString(),
        getClassNameForPageNumber(pageNumber, currentPage),
        (e) => {
          onClickPageNumber(pageNumber)
        }
      )
    })
  }

  if (showPageJumperAtOnce >= pages) {
    const pageNumberRange = [...Array(pages).keys()].map(number => number + 1)
    renderPageNumberItems.push(...getPageNumberItems(pageNumberRange))
  } else {
    const pageNumberRangeLeft = getLeftPageNumberRange(showPageJumperAtOnce)
    const pageNumberRangeRight = getRightPageNumberRange(showPageJumperAtOnce, pages)

    renderPageNumberItems.push(...getPageNumberItems(pageNumberRangeLeft))

    if (showJumpToPage && pages > 2) {
      const onKeyDownJumpToPage = (e): void => {
        if (e.key === 'Enter') {
          const value = Number(e.target.value)
          if (value > 0 && value <= pages) {
            setCurrentPage(value)
            e.target.value = ''
            e.target.blur()
          }
        }
      }

      renderPageNumberItems.push(
        <li
          className='ant-pagination-item'
          key={ 'page-jumper' }
        >
          <InlineTextfield
            showDotsValues={ [...pageNumberRangeLeft.map(String), ...pageNumberRangeRight.map(String)] }
            onKeyDown={ onKeyDownJumpToPage }
            value={ currentPage?.toString() }
          />
        </li>
      )
    }

    renderPageNumberItems.push(...getPageNumberItems(pageNumberRangeRight))
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
        {isSet(showTotal) && (
          <TotalField
            showTotal={ showTotal }
            total={ total }
          />
        )}

        <PreviousButton
          currentPage={ currentPage }
          onClickPrev={ onClickPrev }
        />

        {renderPageNumberItems}

        <NextButton
          currentPage={ currentPage }
          onClickNext={ onClickNext }
          pages={ pages }
        />

        {showSizeChanger &&
          (
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
        }
      </ul>
    </div>
  )
}

function PreviousButton (props): React.JSX.Element {
  const { currentPage, onClickPrev } = props
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

function NextButton (props): React.JSX.Element {
  const { currentPage, pages, onClickNext } = props
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

function TotalField (props): React.JSX.Element {
  const { total, showTotal } = props
  return (
    <li className="ant-pagination-total-text">
      {showTotal(total)}
    </li>
  )
}

function getLeftPageNumberRange (
  showPageJumperAtOnce: number,
): number[] {
  if (showPageJumperAtOnce <= 0) {
    return []
  }

  const lastJumper = Math.floor(showPageJumperAtOnce / 2)
  return [...Array(lastJumper).keys()].map(number => number + 1)
}

function getRightPageNumberRange (
  showPageJumperAtOnce: number,
  pages: number
): number[] {
  if (showPageJumperAtOnce <= 0) {
    return []
  }

  let middleJumper = Math.floor(showPageJumperAtOnce / 2)
  if (showPageJumperAtOnce % 2 === 0) {
    middleJumper--
  }
  const firstJumper = pages - middleJumper + 1
  return [...Array(middleJumper).keys()].map(number => number + firstJumper);
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

function getClassNameForPageNumber (pageNumber: number, current: number): string {
  return pageNumber === current ? 'ant-pagination-item-active' : ''
}
