/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { ApiError } from '@Pimcore/modules/app/error-handler'
import {
  type BundleCustomReportsConfigurationTreeNode,
  type CustomReportsConfigGetTreeApiResponse
} from '@Pimcore/modules/reports/custom-reports-api-slice.gen'
import { openImportedReport } from './open-imported-report'

jest.mock('@Pimcore/modules/app/error-handler', () => ({
  __esModule: true,
  default: jest.fn(),
  ApiError: jest.requireActual('@Pimcore/modules/app/error-handler/classes/api-error').default
}))

const report = (id: string): BundleCustomReportsConfigurationTreeNode => ({ id, text: id, cls: '', writeable: true })

const tree = (items: CustomReportsConfigGetTreeApiResponse['items']): CustomReportsConfigGetTreeApiResponse => ({
  totalItems: items.length,
  items
})

describe('openImportedReport', () => {
  it('refetches the tree before looking up the imported report', async () => {
    const calls: string[] = []
    const refetch = jest.fn(async () => {
      calls.push('refetch')
      return { data: tree([report('imported')]) }
    })
    const handleOpenReport = jest.fn(() => { calls.push('open') })

    await openImportedReport({ reportName: 'imported', refetch, handleOpenReport })

    expect(calls).toEqual(['refetch', 'open'])
    expect(handleOpenReport).toHaveBeenCalledWith(report('imported'))
  })

  it('finds the imported report inside a group folder', async () => {
    const refetch = jest.fn(async () => ({
      data: tree([{ group: 'Sales', groupIconClass: '', children: [report('other'), report('imported')] }])
    }))
    const handleOpenReport = jest.fn()

    await openImportedReport({ reportName: 'imported', refetch, handleOpenReport })

    expect(handleOpenReport).toHaveBeenCalledWith(report('imported'))
  })

  it('opens nothing when the refetched tree does not contain the report', async () => {
    const refetch = jest.fn(async () => ({ data: tree([report('other')]) }))
    const handleOpenReport = jest.fn()

    await openImportedReport({ reportName: 'imported', refetch, handleOpenReport })

    expect(handleOpenReport).not.toHaveBeenCalled()
  })

  it('opens nothing when the refetch returns no data', async () => {
    const refetch = jest.fn(async () => ({}))
    const handleOpenReport = jest.fn()

    await openImportedReport({ reportName: 'imported', refetch, handleOpenReport })

    expect(handleOpenReport).not.toHaveBeenCalled()
  })

  // RTK Query resolves a failed refetch with an `error` field instead of rejecting, which
  // would otherwise slip past the caller's `.catch` and leave the user without feedback.
  it('rejects with the api error when the refetch resolves with an error', async () => {
    const error = { status: 500, data: { message: 'Tree unavailable' } }
    const refetch = jest.fn(async () => ({ error }))
    const handleOpenReport = jest.fn()

    const result = openImportedReport({ reportName: 'imported', refetch, handleOpenReport })

    await expect(result).rejects.toBeInstanceOf(ApiError)
    await expect(result).rejects.toMatchObject({ errorData: error })
    expect(handleOpenReport).not.toHaveBeenCalled()
  })
})
