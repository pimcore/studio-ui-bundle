/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import React, { useEffect, useState } from 'react'
import { useCssComponentHash } from '@Pimcore/modules/ant-design/hooks/use-css-component-hash'
import { useStyle } from '@Pimcore/components/pagination/pagination.styles'
import { Icon } from '@Pimcore/components/icon/icon'
import { Button } from '@Pimcore/components/button/button'
import i18n from '@Pimcore/app/i18n'
import { isSet } from '@Pimcore/utils/helpers'
import { SizeChanger } from '@Pimcore/components/pagination/size-changer/size-changer'
import { InlineTextfield } from '@Pimcore/components/pagination/inline-textfield/inline-textfield'

export interface PaginationProps {
  total: number
  current?: number
  defaultPageSize?: number
  pageSizeOptions?: number[]
  showSizeChanger?: boolean
  amountOfVisiblePages?: number
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
  amountOfVisiblePages = 5,
  hideOnSinglePage = false,
  showTotal,
  onChange
}: PaginationProps): React.JSX.Element => {
  const { styles } = useStyle()

  const hashId = useCssComponentHash('pagination')

  const [currentPage, setCurrentPage] = useState<number>(current)
  const [pageSize, setPageSize] = useState<number>(defaultPageSize)

  useEffect(() => {
    if (isSet(onChange)) {
      onChange!(currentPage, pageSize)
    }
  }, [currentPage, pageSize])

  useEffect(() => {
    setCurrentPage(current)
  }, [current])

  const pages = Math.ceil(total / pageSize)

  if (total === 0 || (hideOnSinglePage && pages === 1)) {
    return <></>
  }

  const onClickPageNumber = (pageNumber: number): void => {
    setCurrentPage(pageNumber)
  }

  const renderPageNumberItems: React.JSX.Element[] = []

  const getPageNumberItems = (pageNumberRange: number[]): React.JSX.Element[] => {
    return pageNumberRange.map((pageNumber) => {
      return PageNumberNode(
        pageNumber,
        getClassNameForPageNumber(pageNumber, currentPage),
        (e) => {
          onClickPageNumber(pageNumber)
        }
      )
    })
  }

  if (amountOfVisiblePages >= pages) {
    const pageNumberRange = [...Array(pages).keys()].map(number => number + 1)
    renderPageNumberItems.push(...getPageNumberItems(pageNumberRange))
  } else {
    const pageNumberRangeLeft = getLeftPageNumberRange(amountOfVisiblePages)
    const pageNumberRangeRight = getRightPageNumberRange(amountOfVisiblePages, pages)

    renderPageNumberItems.push(...getPageNumberItems(pageNumberRangeLeft))

    if (pages > 3) {
      const onKeyDownJumpToPage = (e): void => {
        if (e.key === 'Enter') {
          const value = Number(e.target.value)
          if (value > 0 && value <= pages) {
            setCurrentPage(value)
          } else if (value < 1) {
            setCurrentPage(1)
          } else if (value > pages) {
            setCurrentPage(pages)
          }
          e.target.value = ''
          e.target.blur()
        }
      }

      renderPageNumberItems.push(
        <li
          className='ant-pagination-item'
          key={ 'page-jumper' }
        >
          <InlineTextfield
            onKeyDown={ onKeyDownJumpToPage }
            showDotsValues={ [...pageNumberRangeLeft.map(String), ...pageNumberRangeRight.map(String)] }
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

function PreviousButton (prop): React.JSX.Element {
  const { currentPage, onClickPrev } = prop
  return (
    <li className={ `ant-pagination-prev ${currentPage === 1 ? 'ant-pagination-disabled' : ''}` }>
      <Button
        className={ 'ant-pagination-item-link' }
        disabled={ currentPage === 1 }
        icon={ <Icon
          options={ { width: 18, height: 18 } }
          value='chevron-left'
               /> }
        onClick={ onClickPrev }
        size={ 'small' }
        type={ 'text' }
      />
    </li>
  )
}

function NextButton (prop): React.JSX.Element {
  const { currentPage, pages, onClickNext } = prop
  return (
    <li className={ `ant-pagination-next ${currentPage === pages ? 'ant-pagination-disabled' : ''}` }>
      <Button
        className={ 'ant-pagination-item-link' }
        disabled={ currentPage === pages }
        icon={ <Icon
          options={ { width: 18, height: 18 } }
          value='chevron-right'
               /> }
        onClick={ onClickNext }
        size={ 'small' }
        type={ 'text' }
      />
    </li>
  )
}

function TotalField (prop): React.JSX.Element {
  const { total, showTotal } = prop
  return (
    <li className="ant-pagination-total-text">
      {showTotal(total)}
    </li>
  )
}

function getLeftPageNumberRange (
  showPageJumperAtOnce: number
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
  return [...Array(middleJumper).keys()].map(number => number + firstJumper)
}

function PageNumberNode (
  pageNumber: number,
  className: string,
  onClick: (e) => void
): React.JSX.Element {
  return (
    <li
      className={ `ant-pagination-item ant-pagination-item-${pageNumber.toString()} ${className}` }
      key={ pageNumber }
      title={ pageNumber.toString() }
    >
      <Button
        className={ 'page-number-node' }
        onClick={ onClick }
      >{pageNumber}</Button>
    </li>
  )
}

function getClassNameForPageNumber (pageNumber: number, current: number): string {
  return pageNumber === current ? 'ant-pagination-item-active' : ''
}
