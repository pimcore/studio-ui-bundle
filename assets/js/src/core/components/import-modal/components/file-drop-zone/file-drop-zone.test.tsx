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
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { FileDropZone } from './file-drop-zone'

jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))
jest.mock('./file-drop-zone.styles', () => ({
  useStyle: () => ({ styles: new Proxy({}, { get: (_, key) => String(key) }) })
}))
jest.mock('@Pimcore/components/icon/icon', () => ({ Icon: () => <span /> }))
jest.mock('@Pimcore/components/flex/flex', () => ({
  Flex: ({ children }: { children: React.ReactNode }) => <div>{ children }</div>
}))

describe('FileDropZone', () => {
  it('shows the default label without a label of its own', () => {
    render(<FileDropZone uploadProps={ {} } />)

    expect(screen.getByText('import-modal.drag-drop')).toBeInTheDocument()
  })

  it('shows the given label instead of the default', () => {
    render(<FileDropZone
      dragDropLabel="Drop the delivery here"
      uploadProps={ {} }
           />)

    expect(screen.getByText('Drop the delivery here')).toBeInTheDocument()
    expect(screen.queryByText('import-modal.drag-drop')).not.toBeInTheDocument()
  })

  it('hands a chosen file to the upload props', async () => {
    const beforeUpload = jest.fn().mockReturnValue(false)
    const file = new File(['sku,name'], 'products.csv', { type: 'text/csv' })
    const { container } = render(<FileDropZone uploadProps={ { beforeUpload, showUploadList: false } } />)

    fireEvent.change(container.querySelector('input[type="file"]')!, { target: { files: [file] } })

    await waitFor(() => { expect(beforeUpload).toHaveBeenCalledTimes(1) })
    expect(beforeUpload.mock.calls[0][0].name).toBe('products.csv')
  })
})
