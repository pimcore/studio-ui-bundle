/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import { Table } from './table'

jest.mock('@Pimcore/app/api/pimcore/route', () => ({
  getPrefix: () => '/my-studio/api'
}))

jest.mock('@Pimcore/modules/element/hooks/use-element-helper', () => ({
  useElementHelper: () => ({ openElement: jest.fn() })
}))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

jest.mock('@Pimcore/components/flex/flex', () => ({
  Flex: ({ children }: { children?: React.ReactNode }) => <div>{children}</div>
}))

jest.mock('@Pimcore/utils/date-time', () => ({ formatDateTime: jest.fn(() => '') }))

jest.mock('@Pimcore/components/icon-button/icon-button', () => ({ IconButton: () => null }))

jest.mock('./table.styles', () => ({
  useStyles: () => ({ styles: {} })
}))

jest.mock('../detail-modal/detail-modal', () => ({
  DetailModal: () => null
}))

jest.mock('@sdk/components', () => ({
  Button: ({ href, children }: { href?: string, children: React.ReactNode }) => <a href={ href }>{children}</a>
}))

// Renders only the cells of the file object column, which is the one that links to the api.
jest.mock('@Pimcore/components/grid/grid', () => ({
  Grid: ({ columns, data }: { columns: Array<{ accessorKey?: string, cell?: (ctx: unknown) => React.ReactNode }>, data: unknown[] }) => {
    const column = columns.find((item) => item.accessorKey === 'fileObject')

    return <>{data.map((row, index) => <div key={ index }>{column?.cell?.({ row: { original: row } })}</div>)}</>
  }
}))

describe('application logger table', () => {
  it('links file objects below the configured api prefix', () => {
    render(<Table items={ [{ fileObject: '/var/log/some.log', date: 1 }] as never } />)

    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      '/my-studio/api/bundle/application-logger/file-object?filePath=/var/log/some.log'
    )
  })
})
