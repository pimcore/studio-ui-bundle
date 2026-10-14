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
import { ImageGalleryImageTarget } from './image-target'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

jest.mock('@Pimcore/components/asset-target/asset-target', () => jest.requireActual('@test-utils/mocks/asset-target-mock'))
jest.mock('@Pimcore/components/drag-and-drop/droppable', () => ({ Droppable: ({ children }: any) => <div>{children}</div> }))
jest.mock('@Pimcore/components/inline-upload', () => ({ InlineUpload: ({ children }: any) => <div>{children}</div> }))
jest.mock('@Pimcore/components/modal-upload/hooks/use-upload-modal', () => ({ useUploadModal: () => ({ triggerUpload: jest.fn() }) }))
jest.mock('@Pimcore/modules/element/element-selector/provider/element-selector/use-element-selector', () => ({ useElementSelector: () => ({ open: jest.fn() }) }))
jest.mock('@Pimcore/modules/element/element-selector/provider/element-selector/element-selector-provider', () => ({ SelectionType: { Single: 'single', Multiple: 'multiple' } }))

jest.mock('../../image-gallery.styles', () => ({ useStyles: () => ({ styles: { imageItem: 'imageItem' } }) }))

const renderTarget = (disabled?: boolean): void => {
  render(
    <ImageGalleryImageTarget
      disabled={ disabled }
      height="100px"
      index={ 0 }
      setValue={ jest.fn() }
      value={ [] }
      width="100px"
    />
  )
}

describe('ImageGalleryImageTarget', () => {
  it('offers search and upload when editable', () => {
    renderTarget()

    expect(screen.getByText('search')).toBeInTheDocument()
    expect(screen.getByText('upload')).toBeInTheDocument()
  })

  it('offers no search or upload when disabled', () => {
    renderTarget(true)

    expect(screen.getByTestId('asset-target')).toBeInTheDocument()
    expect(screen.queryByText('search')).not.toBeInTheDocument()
    expect(screen.queryByText('upload')).not.toBeInTheDocument()
  })
})
