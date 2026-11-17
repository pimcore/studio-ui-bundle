/**
* This source file is available under the terms of the
* Pimcore Open Core License (POCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
*  @license    Pimcore Open Core License (POCL)
*/

import { renderHook } from '@testing-library/react'
import { withFolderNavigationQueryArg } from './with-folder-navigation-query-arg'

let folderId = 1
let folderPath = '/'

jest.mock('../context-layer/provider/folder-navigation/use-folder-navigation', () => ({
  useFolderNavigation: () => ({ folderId, folderPath, setFolder: jest.fn() })
}))

describe('withFolderNavigationQueryArg', () => {
  beforeEach(() => {
    folderId = 1
    folderPath = '/'
  })

  const baseGetArgs = (): any => ({
    body: {
      columns: [],
      filters: { page: 1, pageSize: 50, includeDescendants: true }
    }
  })

  const renderGetArgs = (): any => {
    const useBaseHook = (): any => ({ getArgs: baseGetArgs, hasRequiredArgs: () => true, dataLoadingState: 'initial', setDataLoadingState: jest.fn() })
    const { result } = renderHook(() => withFolderNavigationQueryArg(useBaseHook)())

    return result.current.getArgs()
  }

  it('leaves the base args untouched while at the root folder', () => {
    const args = renderGetArgs()

    expect(args.body.filters.columnFilters).toBeUndefined()
  })

  it('adds a fullPath PQL condition once navigated to a folder', () => {
    folderId = 287
    folderPath = '/Brand Logos'

    const args = renderGetArgs()

    expect(args.body.filters.columnFilters).toEqual([
      { type: 'system.pql', filterValue: 'fullPath LIKE "/Brand Logos/*"' }
    ])
  })

  it('combines with an existing PQL filter instead of overwriting it', () => {
    folderId = 287
    folderPath = '/Brand Logos'

    const useBaseHook = (): any => ({
      getArgs: () => ({
        body: {
          columns: [],
          filters: {
            page: 1,
            pageSize: 50,
            includeDescendants: true,
            columnFilters: [{ type: 'system.pql', filterValue: 'color = "red"' }]
          }
        }
      }),
      hasRequiredArgs: () => true,
      dataLoadingState: 'initial',
      setDataLoadingState: jest.fn()
    })
    const { result } = renderHook(() => withFolderNavigationQueryArg(useBaseHook)())
    const args = result.current.getArgs()

    expect(args.body.filters.columnFilters).toEqual([
      { type: 'system.pql', filterValue: '(color = "red") AND (fullPath LIKE "/Brand Logos/*")' }
    ])
  })

  it('preserves non-PQL column filters already present', () => {
    folderId = 287
    folderPath = '/Brand Logos'

    const useBaseHook = (): any => ({
      getArgs: () => ({
        body: {
          columns: [],
          filters: {
            page: 1,
            pageSize: 50,
            includeDescendants: true,
            columnFilters: [{ type: 'system.tag', filterValue: { tags: [1] } }]
          }
        }
      }),
      hasRequiredArgs: () => true,
      dataLoadingState: 'initial',
      setDataLoadingState: jest.fn()
    })
    const { result } = renderHook(() => withFolderNavigationQueryArg(useBaseHook)())
    const args = result.current.getArgs()

    expect(args.body.filters.columnFilters).toEqual([
      { type: 'system.tag', filterValue: { tags: [1] } },
      { type: 'system.pql', filterValue: 'fullPath LIKE "/Brand Logos/*"' }
    ])
  })
})
