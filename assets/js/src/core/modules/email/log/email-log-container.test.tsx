/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { fireEvent, render, screen } from '@testing-library/react'
import { QueryStatus } from '@reduxjs/toolkit/query'
import React from 'react'
import { type EmailLog } from '../emails-api-slice.gen'
import { useEmailLogGetCollectionQuery, useEmailLogSearchQuery } from '../emails-api-slice-enhanced'
import { EmailLogContainer } from './email-log-container'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

jest.mock('@Pimcore/app/store', () => ({
  useAppDispatch: () => jest.fn()
}))

jest.mock('@Pimcore/app/api/pimcore/tags', () => ({
  invalidatingTags: { EMAIL_LOG: () => [] }
}))

jest.mock('../emails-api-slice-enhanced', () => ({
  api: { util: { invalidateTags: jest.fn() } },
  useEmailLogGetCollectionQuery: jest.fn(),
  useEmailLogSearchQuery: jest.fn()
}))

jest.mock('@Pimcore/components/content-layout/content-layout', () => ({
  ContentLayout: ({ renderToolbar, renderTopBar, children }: {
    renderToolbar: React.ReactNode
    renderTopBar: React.ReactNode
    children: React.ReactNode
  }) => <>{renderToolbar}{renderTopBar}{children}</>
}))

jest.mock('@Pimcore/components/content/content', () => ({
  Content: ({ children }: { children: React.ReactNode }) => <>{children}</>
}))

jest.mock('@Pimcore/components/flex/flex', () => ({
  Flex: ({ children }: { children: React.ReactNode }) => <>{children}</>
}))

jest.mock('@Pimcore/components/header/header', () => ({
  Header: ({ children }: { children: React.ReactNode }) => <>{children}</>
}))

jest.mock('@Pimcore/components/toolbar/toolbar', () => ({
  Toolbar: ({ children }: { children: React.ReactNode }) => <>{children}</>
}))

jest.mock('@Pimcore/components/title/title', () => ({
  Title: ({ children }: { children: React.ReactNode }) => <>{children}</>
}))

jest.mock('@Pimcore/components/icon-button/icon-button', () => ({
  IconButton: () => null
}))

jest.mock('@Pimcore/components/pagination/pagination', () => ({
  Pagination: ({ total }: { total: number }) => <div data-testid="email-log-total">{total}</div>
}))

jest.mock('@Pimcore/components/search-input/search-input', () => ({
  SearchInput: ({ onSearch }: { onSearch: (value: string) => void }) => (
    <button
      data-testid="email-log-search-input"
      onClick={ () => { onSearch('  failed@example.com  ') } }
    />
  )
}))

jest.mock('./components/email-card/email-card', () => ({
  EmailCard: ({ emails }: { emails: EmailLog[] }) => (
    <div data-testid="email-log-items">{emails.map(({ id }) => id).join(',')}</div>
  )
}))

const regularEmail: EmailLog = {
  id: 1,
  sentDate: 1716755895,
  hasHtmlLog: true,
  hasTextLog: true,
  hasError: false,
  from: 'from@example.com',
  to: 'to@example.com',
  subject: 'Regular message'
}

const failedEmail: EmailLog = {
  ...regularEmail,
  id: 2,
  hasError: true,
  subject: 'Failed message'
}

describe('EmailLogContainer', () => {
  it('switches from the collection endpoint to email search results', () => {
    const collectionQuery = jest.mocked(useEmailLogGetCollectionQuery)
    const searchQuery = jest.mocked(useEmailLogSearchQuery)
    const collectionData = { totalItems: 1, items: [regularEmail] }
    const collectionResult: ReturnType<typeof useEmailLogGetCollectionQuery> = {
      data: collectionData,
      currentData: collectionData,
      status: QueryStatus.fulfilled,
      isUninitialized: false,
      isLoading: false,
      isFetching: false,
      isSuccess: true,
      isError: false,
      refetch: jest.fn()
    }
    const searchData = { totalItems: 1, items: [failedEmail] }
    const searchResult: ReturnType<typeof useEmailLogSearchQuery> = {
      data: searchData,
      currentData: searchData,
      status: QueryStatus.fulfilled,
      isUninitialized: false,
      isLoading: false,
      isFetching: false,
      isSuccess: true,
      isError: false,
      refetch: jest.fn()
    }
    collectionQuery.mockReturnValue(collectionResult)
    searchQuery.mockReturnValue(searchResult)

    render(<EmailLogContainer />)

    expect(collectionQuery).toHaveBeenLastCalledWith({ page: 1, pageSize: 20 }, { skip: false })
    expect(searchQuery).toHaveBeenLastCalledWith(
      { page: 1, pageSize: 20, email: '' },
      { skip: true }
    )
    expect(screen.getByTestId('email-log-items').textContent).toBe('1')

    fireEvent.click(screen.getByTestId('email-log-search-input'))

    expect(collectionQuery).toHaveBeenLastCalledWith({ page: 1, pageSize: 20 }, { skip: true })
    expect(searchQuery).toHaveBeenLastCalledWith(
      { page: 1, pageSize: 20, email: 'failed@example.com' },
      { skip: false }
    )
    expect(screen.getByTestId('email-log-items').textContent).toBe('2')
    expect(screen.getByTestId('email-log-total').textContent).toBe('1')
  })
})
