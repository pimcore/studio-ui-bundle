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
import { render } from '@testing-library/react'
import { ResponsiveAssetPreview } from './responsive-asset-preview'

jest.mock('@Pimcore/components/drag-and-drop/hooks/use-droppable', () => ({ useDroppable: () => ({ getStateClasses: () => [] }) }))
jest.mock('@Pimcore/components/dropdown/dropdown', () => ({ Dropdown: ({ children }: any) => <div>{children}</div> }))
jest.mock('@Pimcore/components/image-preview/components/dropdown/dropdown', () => ({ ImagePreviewDropdown: () => <div /> }))
jest.mock('@Pimcore/components/spin/spin', () => ({ Spin: () => <div /> }))
jest.mock('../../components/image-editable/image-editable-preview.styles', () => ({
  useStyle: () => ({ styles: { imageEditablePreviewContainer: 'preview-container', imageEditablePreviewContainerMinSize: 'min-size', imageComponent: 'image-component', loadingSpinner: 'loading-spinner' } })
}))
jest.mock('@Pimcore/utils/hooks/use-element-resize', () => ({ __esModule: true, default: () => ({ width: 0, height: 0 }) }))

const renderPreview = (imgAttributes?: Record<string, string>): HTMLImageElement => {
  const { container } = render(
    <ResponsiveAssetPreview
      assetId={ 1 }
      imgAttributes={ imgAttributes }
      thumbnailUrl="/thumbnail.png"
    />
  )

  const img = container.querySelector('img')
  expect(img).not.toBeNull()

  return img!
}

describe('ResponsiveAssetPreview', () => {
  it('puts the class of imgAttributes on the img element', () => {
    const img = renderPreview({ class: 'my-class aspect-16-9' })

    expect(img).toHaveClass('my-class', 'aspect-16-9')
  })

  it('keeps the own image classes next to the class of imgAttributes', () => {
    const img = renderPreview({ class: 'my-class' })

    expect(img).toHaveClass('ant-image-img', 'my-class')
  })

  it('keeps applying the alt text of imgAttributes to the img element', () => {
    const img = renderPreview({ alt: 'custom alt', class: 'my-class' })

    expect(img).toHaveAttribute('alt', 'custom alt')
  })
})
