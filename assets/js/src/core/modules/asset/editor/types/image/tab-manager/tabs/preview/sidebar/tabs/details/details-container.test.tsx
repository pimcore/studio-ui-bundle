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
import { render, waitFor } from '@testing-library/react'

const viewProps: Record<string, any> = {}

jest.mock('./details-view', () => ({
  AssetEditorSidebarDetailsView: (props: any) => {
    Object.assign(viewProps, props)
    return <div data-testid="details-view" />
  }
}))

jest.mock('@Pimcore/modules/asset/asset-api-slice-enhanced', () => ({
  useAssetGetByIdQuery: () => ({ data: { id: 42, filename: 'photo.jpg', width: 800, height: 600 } })
}))

const useThumbnailImageGetCollectionQuery = jest.fn()
jest.mock('@Pimcore/modules/asset/editor/types/asset-thumbnails-api-slice.gen', () => ({
  useThumbnailImageGetCollectionQuery: (...args: unknown[]) => useThumbnailImageGetCollectionQuery(...args)
}))

const isAllowed = jest.fn()
jest.mock('@Pimcore/modules/auth/permission-helper', () => ({
  isAllowed: (...args: unknown[]) => isAllowed(...args)
}))

jest.mock('@Pimcore/app/api/pimcore/route', () => ({
  getPrefix: () => '/studio/api'
}))

const saveFileLocal = jest.fn()
jest.mock('@Pimcore/utils/files', () => ({
  ...jest.requireActual('@Pimcore/utils/files'),
  saveFileLocal: (...args: unknown[]) => saveFileLocal(...args)
}))

jest.mock('@Pimcore/modules/app/error-handler', () => ({
  __esModule: true,
  default: jest.fn(),
  GeneralError: class GeneralError extends Error {}
}))

const { AssetContext } = jest.requireActual('@Pimcore/modules/asset/asset-provider')
const { DetailContainer } = jest.requireActual('./details-container')

const renderContainer = (): void => {
  render(
    <AssetContext.Provider value={ { id: 42 } }>
      <DetailContainer />
    </AssetContext.Provider>
  )
}

describe('image DetailContainer thumbnail download', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    isAllowed.mockReturnValue(true)
    useThumbnailImageGetCollectionQuery.mockReturnValue({
      data: { items: [{ id: 'web-large', text: 'web-large' }, { id: 'print-hires', text: 'print-hires' }] }
    })
    global.URL.createObjectURL = jest.fn(() => 'blob:photo')
  })

  afterEach(() => {
    // @ts-expect-error cleanup test global
    delete global.fetch
  })

  it('hands the downloadable thumbnails to the view as select options', () => {
    renderContainer()

    expect(viewProps.downloadableThumbnails).toEqual([
      { value: 'web-large', label: 'web-large' },
      { value: 'print-hires', label: 'print-hires' }
    ])
  })

  it('passes no thumbnails while the list has not loaded', () => {
    useThumbnailImageGetCollectionQuery.mockReturnValue({ data: undefined })

    renderContainer()

    expect(viewProps.downloadableThumbnails).toEqual([])
  })

  it('skips the thumbnail list for users without the thumbnails permission', () => {
    isAllowed.mockReturnValue(false)

    renderContainer()

    expect(isAllowed).toHaveBeenCalledWith('thumbnails')
    expect(useThumbnailImageGetCollectionQuery).toHaveBeenCalledWith(undefined, { skip: true })
  })

  it('downloads the image rendered with the chosen thumbnail under the server-suggested name', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      headers: new Headers({ 'Content-Disposition': 'attachment; filename="photo.webp"' }),
      blob: async () => new Blob(['image'])
    }) as unknown as typeof fetch

    renderContainer()
    viewProps.onClickDownloadByThumbnail('web-large')

    expect(global.fetch).toHaveBeenCalledWith('/studio/api/assets/42/image/download/thumbnail/web-large')
    await waitFor(() => { expect(saveFileLocal).toHaveBeenCalledWith('blob:photo', 'photo.webp') })
  })

  it('falls back to the asset filename when the server suggests none', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      headers: new Headers(),
      blob: async () => new Blob(['image'])
    }) as unknown as typeof fetch

    renderContainer()
    viewProps.onClickDownloadByThumbnail('web-large')

    await waitFor(() => { expect(saveFileLocal).toHaveBeenCalledWith('blob:photo', 'photo.jpg') })
  })

  it('does not save anything when the download request fails', async () => {
    const trackError = jest.requireMock('@Pimcore/modules/app/error-handler').default
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 404,
      headers: new Headers(),
      blob: async () => new Blob([''])
    }) as unknown as typeof fetch

    renderContainer()
    viewProps.onClickDownloadByThumbnail('web-large')

    await waitFor(() => { expect(trackError).toHaveBeenCalled() })
    expect(saveFileLocal).not.toHaveBeenCalled()
  })
})
