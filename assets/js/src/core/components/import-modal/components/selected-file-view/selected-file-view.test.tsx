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
import { SelectedFileView, type SelectedFileViewProps } from './selected-file-view'

jest.mock('./selected-file-view.styles', () => ({
  useStyle: () => ({ styles: new Proxy({}, { get: (_, key) => String(key) }) })
}))
jest.mock('@sdk/components', () => ({
  Flex: ({ children }: { children: React.ReactNode }) => <div>{ children }</div>,
  IconButton: ({ onClick }: { onClick: () => void }) => (
    <button
      onClick={ onClick }
      type="button"
    >
      remove
    </button>
  ),
  Progress: ({ percent, status }: { percent: number, status: string }) => <div data-testid="progress">{ `${percent} ${status}` }</div>
}))

const props = (overrides: Partial<SelectedFileViewProps> = {}): SelectedFileViewProps => ({
  file: new File(['x'.repeat(2048)], 'products.csv'),
  loading: false,
  isUploading: false,
  uploadStatus: 'normal',
  uploadProgress: 0,
  onRemove: jest.fn(),
  ...overrides
})

describe('SelectedFileView', () => {
  it('shows the file name and its formatted size', () => {
    render(<SelectedFileView { ...props() } />)

    expect(screen.getByText('products.csv')).toBeInTheDocument()
    expect(screen.getByText('2.05 KB')).toBeInTheDocument()
  })

  it('removes the file through the close button before an upload starts', () => {
    const onRemove = jest.fn()
    render(<SelectedFileView { ...props({ onRemove }) } />)

    fireEvent.click(screen.getByRole('button', { name: 'remove' }))

    expect(onRemove).toHaveBeenCalledTimes(1)
  })

  it.each<[string, Partial<SelectedFileViewProps>]>([
    ['while loading', { loading: true }],
    ['while uploading', { isUploading: true }],
    ['after a successful upload', { uploadStatus: 'success' }]
  ])('offers no close button %s', (_, overrides) => {
    render(<SelectedFileView { ...props(overrides) } />)

    expect(screen.queryByRole('button', { name: 'remove' })).not.toBeInTheDocument()
  })

  it('shows the progress and its status only while uploading', () => {
    const { rerender } = render(<SelectedFileView { ...props() } />)
    expect(screen.queryByTestId('progress')).not.toBeInTheDocument()

    rerender(<SelectedFileView { ...props({ isUploading: true, uploadProgress: 40, uploadStatus: 'active' }) } />)

    expect(screen.getByTestId('progress')).toHaveTextContent('40 active')
  })
})
