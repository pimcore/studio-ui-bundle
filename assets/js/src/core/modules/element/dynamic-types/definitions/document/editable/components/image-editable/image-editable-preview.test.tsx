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
import { fireEvent, render } from '@testing-library/react'
import { ImageEditablePreview } from './image-editable-preview'

jest.mock('@Pimcore/components/drag-and-drop/hooks/use-droppable', () => ({ useDroppable: () => ({ getStateClasses: () => [] }) }))
jest.mock('@Pimcore/components/dropdown/dropdown', () => ({ Dropdown: ({ children }: any) => <div>{children}</div> }))
jest.mock('@Pimcore/components/image-preview/components/dropdown/dropdown', () => ({ ImagePreviewDropdown: () => <div /> }))
jest.mock('@Pimcore/components/spin/spin', () => ({ Spin: () => <div /> }))
jest.mock('./image-editable-preview.styles', () => ({
  useStyle: () => ({ styles: { imageEditablePreviewContainer: 'preview-container', imageEditablePreviewContainerMinSize: 'min-size', imageComponent: 'image-component', loadingSpinner: 'loading-spinner' } })
}))
jest.mock('@Pimcore/utils/hooks/use-element-resize', () => ({ __esModule: true, default: () => ({ width: 0, height: 0 }) }))
jest.mock('./utils/thumbnail-sizing', () => ({ generateThumbnailUrl: () => '/thumbnail.png' }))

describe('ImageEditablePreview', () => {
  it('reports the loaded image through onImageLoadedChange', () => {
    const onImageLoadedChange = jest.fn()

    const { container } = render(
      <ImageEditablePreview
        assetId={ 1 }
        containerWidth={ 400 }
        onImageLoadedChange={ onImageLoadedChange }
      />
    )

    const img = container.querySelector('img')
    expect(img).not.toBeNull()
    fireEvent.load(img!)

    expect(onImageLoadedChange).toHaveBeenLastCalledWith(true)
  })
})
