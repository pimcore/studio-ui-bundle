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

// The drop zone hands its validators and drop handler to Droppable; capture them.
let droppableProps: any
const mockWarn = jest.fn()

jest.mock('@Pimcore/components/asset-target/asset-target', () => jest.requireActual('@test-utils/mocks/asset-target-mock'))
jest.mock('@Pimcore/components/drag-and-drop/droppable', () => ({
  Droppable: (props: any) => {
    droppableProps = props
    return <div>{props.children}</div>
  }
}))
jest.mock('@Pimcore/components/modal/alert-modal/hooks/use-alert-modal', () => ({ useAlertModal: () => ({ warn: mockWarn }) }))
jest.mock('@Pimcore/components/inline-upload', () => ({ InlineUpload: ({ children }: any) => <div>{children}</div> }))
jest.mock('@Pimcore/components/modal-upload/hooks/use-upload-modal', () => ({ useUploadModal: () => ({ triggerUpload: jest.fn() }) }))
jest.mock('@Pimcore/modules/element/element-selector/provider/element-selector/use-element-selector', () => ({ useElementSelector: () => ({ open: jest.fn() }) }))
jest.mock('@Pimcore/modules/element/element-selector/provider/element-selector/element-selector-provider', () => ({ SelectionType: { Single: 'single', Multiple: 'multiple' } }))

jest.mock('../../image-gallery.styles', () => ({ useStyles: () => ({ styles: { imageItem: 'imageItem' } }) }))

const renderTarget = (disabled?: boolean, setValue: jest.Mock = jest.fn(), value: any[] = [], index: number = 0): void => {
  render(
    <ImageGalleryImageTarget
      disabled={ disabled }
      height="100px"
      index={ index }
      setValue={ setValue }
      value={ value }
      width="100px"
    />
  )
}

const image = (id: number): any => ({ id, type: 'image' })
const imageItem = (id: number): any => ({ image: { type: 'asset', id }, hotspots: [], marker: [], crop: {} })

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

  describe('dropping', () => {
    beforeEach(() => {
      mockWarn.mockClear()
    })

    it('accepts a single image', () => {
      renderTarget()

      expect(droppableProps.isValidData({ type: 'asset', data: image(1) })).toBe(true)
    })

    it('accepts a dragged set that holds at least one image', () => {
      renderTarget()

      expect(droppableProps.isValidContext({ type: 'asset-list', data: [image(1)] })).toBe(true)
      expect(droppableProps.isValidData({ type: 'asset-list', data: [{ id: 1, type: 'document' }, image(2)] })).toBe(true)
    })

    it('refuses a set without any image, and sets of other element types', () => {
      renderTarget()

      expect(droppableProps.isValidData({ type: 'asset-list', data: [{ id: 1, type: 'video' }] })).toBe(false)
      expect(droppableProps.isValidData({ type: 'data-object-list', data: [{ id: 1, type: 'object' }] })).toBe(false)
    })

    it('fills the slot with every dropped image, in order', () => {
      const setValue = jest.fn()
      renderTarget(false, setValue, [imageItem(10), imageItem(11)], 1)

      droppableProps.onDrop({ type: 'asset-list', data: [image(1), image(2)] })

      expect(setValue).toHaveBeenCalledWith([imageItem(10), imageItem(1), imageItem(2)])
      expect(mockWarn).not.toHaveBeenCalled()
    })

    it('adds the images of a mixed set and reports the rest as skipped', () => {
      const setValue = jest.fn()
      renderTarget(false, setValue)

      droppableProps.onDrop({ type: 'asset-list', data: [image(1), { id: 2, type: 'video' }, { id: 3, type: 'document' }] })

      expect(setValue).toHaveBeenCalledWith([imageItem(1)])
      expect(mockWarn).toHaveBeenCalledWith({ content: 'relation.drop.not-allowed-elements-skipped' })
    })
  })
})
