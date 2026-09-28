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
import { fireEvent, render, screen } from '@testing-library/react'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

// the styles module reaches antd-style's untranspiled ESM core; class names play no role here
jest.mock('./details.styles', () => ({
  useStyle: () => ({ styles: {} })
}))

// antd's Select renders into a portal with virtual scrolling; a native select gives the same
// contract (options, value, onChange) in a form jsdom can drive
jest.mock('@Pimcore/components/select/select', () => ({
  Select: ({ options, value, onChange, 'aria-label': ariaLabel }: any) => (
    <select
      aria-label={ ariaLabel }
      onChange={ (e) => onChange(e.target.value) }
      value={ value }
    >
      {options.map((option: any) => (
        // labels may be JSX (the custom-download selects), which an <option> cannot hold
        <option
          key={ option.value }
          value={ option.value }
        >{option.value}</option>
      ))}
    </select>
  )
}))

jest.mock('@Pimcore/components/icon-button/icon-button', () => ({
  IconButton: ({ onClick, 'aria-label': ariaLabel }: any) => (
    <button
      aria-label={ ariaLabel }
      onClick={ onClick }
    />
  )
}))

jest.mock('@Pimcore/components/button/button', () => ({
  Button: ({ children, onClick }: any) => <button onClick={ onClick }>{children}</button>
}))

jest.mock('@Pimcore/components/content/content', () => ({
  Content: ({ children }: any) => <div>{children}</div>
}))

jest.mock('@Pimcore/components/header/header', () => ({
  Header: ({ title }: any) => <h2>{title}</h2>
}))

jest.mock('@Pimcore/components/collapse/item/collapse-item', () => ({
  CollapseItem: ({ label, children }: any) => <div>{label}{children}</div>
}))

const { AssetEditorSidebarDetailsView } = jest.requireActual('./details-view')

const downloadableThumbnails = [
  { value: 'web-large', label: 'web-large' },
  { value: 'print-hires', label: 'print-hires' }
]

const renderView = (props: Record<string, unknown> = {}): { onClickDownloadByThumbnail: jest.Mock } => {
  const onClickDownloadByThumbnail = jest.fn()

  render(
    <AssetEditorSidebarDetailsView
      downloadableThumbnails={ downloadableThumbnails }
      height={ 600 }
      onClickCustomDownload={ jest.fn() }
      onClickDownloadByFormat={ jest.fn() }
      onClickDownloadByThumbnail={ onClickDownloadByThumbnail }
      width={ 800 }
      { ...props }
    />
  )

  return { onClickDownloadByThumbnail }
}

const thumbnailSelect = (): HTMLSelectElement =>
  screen.getByLabelText('aria.asset.image-sidebar.tab.details.downloadable-thumbnail')

const thumbnailDownloadButton = (): HTMLElement =>
  screen.getByLabelText('aria.asset.image-sidebar.tab.details.download-downloadable-thumbnail')

describe('AssetEditorSidebarDetailsView thumbnail download', () => {
  it('lists the downloadable thumbnails under their own heading', () => {
    renderView()

    expect(screen.getByText('asset.sidebar.thumbnail-download')).toBeInTheDocument()
    expect(Array.from(thumbnailSelect().options).map(option => option.value))
      .toEqual(['web-large', 'print-hires'])
  })

  it('downloads the first thumbnail by default', () => {
    const { onClickDownloadByThumbnail } = renderView()

    fireEvent.click(thumbnailDownloadButton())

    expect(onClickDownloadByThumbnail).toHaveBeenCalledWith('web-large')
  })

  it('downloads the thumbnail the user picked', () => {
    const { onClickDownloadByThumbnail } = renderView()

    fireEvent.change(thumbnailSelect(), { target: { value: 'print-hires' } })
    fireEvent.click(thumbnailDownloadButton())

    expect(onClickDownloadByThumbnail).toHaveBeenCalledWith('print-hires')
  })

  it('falls back to the first thumbnail when the picked one is no longer downloadable', () => {
    const onClickDownloadByThumbnail = jest.fn()
    const props = {
      height: 600,
      width: 800,
      onClickCustomDownload: jest.fn(),
      onClickDownloadByFormat: jest.fn(),
      onClickDownloadByThumbnail
    }
    const { rerender } = render(
      <AssetEditorSidebarDetailsView
        { ...props }
        downloadableThumbnails={ downloadableThumbnails }
      />
    )

    fireEvent.change(thumbnailSelect(), { target: { value: 'print-hires' } })
    rerender(
      <AssetEditorSidebarDetailsView
        { ...props }
        downloadableThumbnails={ [{ value: 'web-large', label: 'web-large' }] }
      />
    )
    fireEvent.click(thumbnailDownloadButton())

    expect(onClickDownloadByThumbnail).toHaveBeenCalledWith('web-large')
  })

  it('hides the block when no thumbnail is downloadable', () => {
    renderView({ downloadableThumbnails: [] })

    expect(screen.queryByText('asset.sidebar.thumbnail-download')).not.toBeInTheDocument()
    expect(screen.queryByLabelText('aria.asset.image-sidebar.tab.details.downloadable-thumbnail'))
      .not.toBeInTheDocument()
  })

  it('keeps the regular download block', () => {
    renderView()

    expect(screen.getByLabelText('aria.asset.image-sidebar.tab.details.precreated-thumbnail')).toBeInTheDocument()
  })
})
