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
import { PdfEditable } from './pdf-editable'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

jest.mock('@Pimcore/components/asset-target/asset-target', () => jest.requireActual('@test-utils/mocks/asset-target-mock'))
jest.mock('@Pimcore/components/drag-and-drop/droppable', () => ({ Droppable: ({ children }: any) => <div>{children}</div> }))
jest.mock('@Pimcore/components/inline-upload', () => ({ InlineUpload: ({ children }: any) => <div>{children}</div> }))
jest.mock('@Pimcore/components/modal-upload/hooks/use-upload-modal', () => ({ useUploadModal: () => ({ triggerUpload: jest.fn() }) }))
jest.mock('@Pimcore/modules/element/element-selector/provider/element-selector/use-element-selector', () => ({ useElementSelector: () => ({ open: jest.fn() }) }))
jest.mock('@Pimcore/modules/element/element-selector/provider/element-selector/element-selector-provider', () => ({ SelectionType: { Single: 'single', Multiple: 'multiple' } }))

jest.mock('@Pimcore/modules/element/hooks/use-element-helper', () => ({ useElementHelper: () => ({ openElement: jest.fn() }) }))
jest.mock('@Pimcore/utils/hooks/use-element-resize', () => ({ __esModule: true, default: () => ({ width: 0, height: 0 }) }))
jest.mock('@Pimcore/components/icon/icon', () => ({ Icon: () => <i /> }))
jest.mock('./pdf-editable-preview', () => ({ PdfEditablePreview: () => <div /> }))
jest.mock('../editable-overlay/editable-overlay', () => ({ EditableOverlay: ({ children }: any) => <div>{children}</div> }))
jest.mock('../../helpers/responsive-asset-preview/hooks/use-asset-dimensions', () => ({
  useAssetDimensions: () => ({ getSmartDimensions: () => undefined, handlePreviewResize: jest.fn(), handleAssetTargetResize: jest.fn() })
}))
jest.mock('@Pimcore/modules/element/utils/tree-utils', () => ({ locateElementInTree: jest.fn() }))

describe('PdfEditable', () => {
  it('offers search and upload on the empty placeholder when editable', () => {
    render(<PdfEditable />)

    expect(screen.getByText('search')).toBeInTheDocument()
    expect(screen.getByText('upload')).toBeInTheDocument()
  })

  it('offers no search or upload on the empty placeholder when disabled', () => {
    render(<PdfEditable disabled />)

    expect(screen.getByTestId('asset-target')).toBeInTheDocument()
    expect(screen.queryByText('search')).not.toBeInTheDocument()
    expect(screen.queryByText('upload')).not.toBeInTheDocument()
  })

  it('offers no search or upload on the empty placeholder when inherited', () => {
    render(<PdfEditable inherited />)

    expect(screen.queryByText('search')).not.toBeInTheDocument()
    expect(screen.queryByText('upload')).not.toBeInTheDocument()
  })
})
