import React, { type ReactNode, useState } from 'react'
import { Icon } from '../icon/icon'
import { Button, Pagination as AntPagination, Select } from 'antd'
import i18n from '@Pimcore/app/i18n'

interface PaginationProps {
  total: number
  defaultCurrent: number
  showTotal?: (total: number) => string
  defaultPageSize: number
  pageSizeOptions: number[] | string[]
  showPageSizeChanger: boolean
  showPageJumperAtOnce: number
}

export const Pagination = ({
  total,
  defaultCurrent = 1,
  showTotal,
  defaultPageSize = 20,
  pageSizeOptions = [10, 20, 50, 100],
  showPageSizeChanger = false,
  showPageJumperAtOnce = 5
}: PaginationProps): React.JSX.Element => {
  const [current, setCurrent] = useState(defaultCurrent)
  const [pageSize, setPageSize] = useState(defaultPageSize)

  const iconOptions = { width: 10, height: 10 }
  const pages = Math.ceil(total / pageSize)
  const pageNumberRange = getPageNumberRange(current, showPageJumperAtOnce, pages)
  const pagesToJump = showPageJumperAtOnce - 2

  const onClickPageNumber = (pageNumber: number): void => {
    setCurrent(pageNumber)
  }

  const renderPageNumberItems: ReactNode[] = [
    renderPageNumberNode(
      '1',
      getClassNameForPageNumber(1, current),
      (e) => { onClickPageNumber(1) }
    )
  ]

  if (pageNumberRange.length > 0 && pageNumberRange[0] !== 2) {
    renderPageNumberItems.push(
      renderPageRangeJumperPrevious(
        (e) => { setCurrent(current - pagesToJump) },
        pagesToJump
      )
    )
  }

  for (const i of pageNumberRange) {
    renderPageNumberItems.push(
      renderPageNumberNode(
        i.toString(),
        getClassNameForPageNumber(i, current),
        (e) => { onClickPageNumber(i) }
      )
    )
  }

  if (!isLastPageRendered(pageNumberRange, pages)) {
    renderPageNumberItems.push(
      renderPageRangeJumperNext(
        (e) => { setCurrent(current + pagesToJump) },
        pagesToJump
      )
    )
  }

  if (pages !== 1) {
    renderPageNumberItems.push(
      renderPageNumberNode(
        pages.toString(),
        getClassNameForPageNumber(pages, current),
        (e) => { onClickPageNumber(pages) }
      )
    )
  }

  const onClickPrev = (): void => {
    setCurrent(current - 1)
  }

  const onClickNext = (): void => {
    setCurrent(current + 1)
  }

  return (
        <div>
            <ul className={'ant-pagination css-dev-only-do-not-override-1wllita'}>
                {showTotal !== undefined ? renderTotal(total, showTotal) : null}

                <li className={`ant-pagination-prev ${current === 1 ? 'ant-pagination-disabled' : ''}`}>
                    <Button disabled={current === 1} size={'small'} type={'text'} className={'ant-pagination-item-link'}
                            icon={<Icon options={iconOptions} name='left-outlined'/>} onClick={onClickPrev}
                    />
                </li>

                {renderPageNumberItems}

                <li className={`ant-pagination-next ${current === pages ? 'ant-pagination-disabled' : ''}`}>
                    <Button disabled={current === pages} size={'small'} type={'text'} className={'ant-pagination-item-link'}
                            icon={<Icon options={iconOptions} name='right-outlined'/>} onClick={onClickNext}
                    />

                </li>
                {showPageSizeChanger
                  ? renderPageSizeChanger(
                    pageSizeOptions,
                    defaultPageSize,
                    (pageSize: number) => { setPageSize(pageSize) }
                  )
                  : null}
            </ul>

            <AntPagination showTotal={(total) => `Total ${total} items`} defaultCurrent={1} total={500} />
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

  const numberRange = []
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
        <li title={pageNumber} key={pageNumber}
            className={`ant-pagination-item ant-pagination-item-${pageNumber} ${className}`}>
            <a onClick={onClick}>{pageNumber}</a>
        </li>
  )
}

function renderPageRangeJumperPrevious (
  onClick: (e) => void,
  pagesToJump: number
): ReactNode {
  return (
        <li title={i18n.t('pagination.prev-pages', { pages: pagesToJump })} key='rangeJumperPrev'
            className='ant-pagination-jump-prev ant-pagination-jump-prev-custom-icon'>
            <a onClick={onClick} className="ant-pagination-item-link">
                <div className="ant-pagination-item-container">
                    <span role="img" aria-label="double-left"
                          className="anticon anticon-double-left ant-pagination-item-link-icon">
                        <Icon options={{ width: 10, height: 10 }} name="double-left"/>
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
        <li title={i18n.t('pagination.next-pages', { pages: pagesToJump })} key='rangeJumperNext'
            className='ant-pagination-jump-next ant-pagination-jump-next-custom-icon'>
            <a onClick={onClick} className="ant-pagination-item-link">
                <div className="ant-pagination-item-container">
                    <span role="img" aria-label="double-right"
                          className="anticon anticon-double-right ant-pagination-item-link-icon">
                        <Icon options={{ width: 10, height: 10 }} name="double-right"/>
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
  handleChange: (e) => void
): ReactNode {
  let isDefaultPageSizeOptionValid = false
  const options = []

  for (const pageSizeOption of pageSizeOptions) {
    if (Number(pageSizeOption) === defaultPageSize) {
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
                defaultValue={defaultPageSize.toString()}
                onChange={handleChange}
                options={options}
            />
        </li>
  )
}

function getClassNameForPageNumber (pageNumber: number, current: number): string {
  return pageNumber === current ? 'ant-pagination-item-active' : ''
}

function isLastPageRendered (pageNumberRange: number[], pages: number): boolean {
  return pageNumberRange.length === 0 || pageNumberRange.at(-1) === pages - 1
}
