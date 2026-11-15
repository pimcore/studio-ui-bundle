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

const downloadThumbnail = jest.fn()
const unsubscribe = jest.fn()
jest.mock('@Pimcore/modules/asset/asset-api-slice-enhanced', () => ({
  useAssetGetByIdQuery: () => ({ data: { id: 42, filename: 'photo.jpg', width: 800, height: 600 } }),
  useLazyAssetImageDownloadByThumbnailQuery: () => [downloadThumbnail]
}))

const resolveDownload = (value: unknown): void => {
  downloadThumbnail.mockReturnValue({ unwrap: async () => await Promise.resolve(value), unsubscribe })
}

const rejectDownload = (error: unknown): void => {
  downloadThumbnail.mockReturnValue({ unwrap: async () => await Promise.reject(error), unsubscribe })
}

const useThumbnailImageGetCollectionQuery = jest.fn()
jest.mock('@Pimcore/modules/asset/editor/types/asset-thumbnails-api-slice.gen', () => ({
  useThumbnailImageGetCollectionQuery: (...args: unknown[]) => useThumbnailImageGetCollectionQuery(...args)
}))

const isAllowed = jest.fn()
jest.mock('@Pimcore/modules/auth/permission-helper', () => ({
  isAllowed: (...args: unknown[]) => isAllowed(...args)
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
    global.URL.revokeObjectURL = jest.fn()
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

  it('downloads the image rendered with the chosen thumbnail under the asset filename', async () => {
    resolveDownload(new Blob(['image'], { type: 'image/jpeg' }))

    renderContainer()
    viewProps.onClickDownloadByThumbnail('web-large')

    expect(downloadThumbnail).toHaveBeenCalledWith({ id: 42, thumbnailName: 'web-large' })
    await waitFor(() => { expect(saveFileLocal).toHaveBeenCalledWith('blob:photo', 'photo.jpg') })
  })

  it('uses the file ending of the rendered format when the thumbnail changes it', async () => {
    resolveDownload(new Blob(['image'], { type: 'image/webp' }))

    renderContainer()
    viewProps.onClickDownloadByThumbnail('web-large')

    await waitFor(() => { expect(saveFileLocal).toHaveBeenCalledWith('blob:photo', 'photo.webp') })
  })

  it('keeps the asset filename when the rendered format is unknown', async () => {
    resolveDownload(new Blob(['image']))

    renderContainer()
    viewProps.onClickDownloadByThumbnail('web-large')

    await waitFor(() => { expect(saveFileLocal).toHaveBeenCalledWith('blob:photo', 'photo.jpg') })
  })

  it('releases the request once the download is done', async () => {
    resolveDownload(new Blob(['image'], { type: 'image/jpeg' }))

    renderContainer()
    viewProps.onClickDownloadByThumbnail('web-large')

    await waitFor(() => { expect(unsubscribe).toHaveBeenCalledTimes(1) })
  })

  it('releases the object URL after the download has been handed to the browser', async () => {
    resolveDownload(new Blob(['image']))

    renderContainer()
    viewProps.onClickDownloadByThumbnail('web-large')

    await waitFor(() => { expect(global.URL.revokeObjectURL).toHaveBeenCalledWith('blob:photo') })
    const revokeMock = global.URL.revokeObjectURL as jest.Mock
    expect(saveFileLocal.mock.invocationCallOrder[0]).toBeLessThan(revokeMock.mock.invocationCallOrder[0])
  })

  it('tracks the error and saves nothing when the download request fails', async () => {
    const trackError = jest.requireMock('@Pimcore/modules/app/error-handler').default
    rejectDownload({ status: 404, data: new Blob(['']) })

    renderContainer()
    viewProps.onClickDownloadByThumbnail('web-large')

    await waitFor(() => { expect(unsubscribe).toHaveBeenCalledTimes(1) })
    expect(trackError).toHaveBeenCalled()
    expect(saveFileLocal).not.toHaveBeenCalled()
  })
})
