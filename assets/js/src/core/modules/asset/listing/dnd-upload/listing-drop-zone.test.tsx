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
import { ListingDropZone } from './listing-drop-zone'

const mockZone = jest.fn()
let mockQuery: { data?: { permissions: Record<string, boolean>, fullPath: string } } = {}
let mockTreeAllowed = true

jest.mock('@Pimcore/modules/element/hooks/use-element-context', () => ({
  useElementContext: () => ({ id: 42, elementType: 'asset' })
}))
jest.mock('@Pimcore/modules/asset/asset-api-slice-enhanced', () => ({
  useAssetGetByIdQuery: () => mockQuery
}))
jest.mock('@Pimcore/components/element-tree/provider/tree-permission-provider/use-tree-permission', () => ({
  useTreePermission: () => ({ isTreeActionAllowed: () => mockTreeAllowed })
}))
jest.mock('./listing-drop-zone.styles', () => ({ useStyles: () => ({ styles: { dropArea: 'drop-area' } }) }))
jest.mock('../../tree/dnd-upload/dnd-upload-zone', () => ({
  DndUploadZone: (props: any) => {
    mockZone(props)
    return <div data-testid="zone">{props.children}</div>
  }
}))

const allowed = { data: { permissions: { create: true }, fullPath: '/Images/Cars' } }

const renderZone = (): void => {
  render(<ListingDropZone><div data-testid="grid" /></ListingDropZone>)
}

describe('ListingDropZone', () => {
  beforeEach(() => {
    mockZone.mockClear()
    mockQuery = allowed
    mockTreeAllowed = true
  })

  it('AC1: renders the upload zone with the listing folder id and full path', () => {
    renderZone()
    expect(screen.getByTestId('grid')).toBeInTheDocument()
    expect(mockZone).toHaveBeenCalledWith(expect.objectContaining({ targetFolderId: 42, targetPath: '/Images/Cars' }))
  })

  it('AC2: shows the indicator while files are dragged over the grid', () => {
    renderZone()
    const area = screen.getByTestId('listing-drop-area')
    expect(area).not.toHaveAttribute('data-file-drag')
    fireEvent.dragEnter(area, { dataTransfer: { types: ['Files'] } })
    expect(area).toHaveAttribute('data-file-drag')
    fireEvent.dragLeave(area, { dataTransfer: { types: ['Files'] } })
    expect(area).not.toHaveAttribute('data-file-drag')
  })

  it('AC2: shows no indicator for drags without files', () => {
    renderZone()
    const area = screen.getByTestId('listing-drop-area')
    fireEvent.dragEnter(area, { dataTransfer: { types: ['text/plain'] } })
    expect(area).not.toHaveAttribute('data-file-drag')
  })

  it('AC3: renders no drop target without create permission', () => {
    mockQuery = { data: { permissions: { create: false }, fullPath: '/x' } }
    renderZone()
    expect(screen.getByTestId('grid')).toBeInTheDocument()
    expect(screen.queryByTestId('listing-drop-area')).not.toBeInTheDocument()
    expect(mockZone).not.toHaveBeenCalled()
  })

  it('AC3: renders no drop target while the permissions are not loaded', () => {
    mockQuery = {}
    renderZone()
    expect(screen.getByTestId('grid')).toBeInTheDocument()
    expect(screen.queryByTestId('listing-drop-area')).not.toBeInTheDocument()
  })

  it('AC3: renders no drop target when the perspective forbids upload', () => {
    mockTreeAllowed = false
    renderZone()
    expect(screen.queryByTestId('listing-drop-area')).not.toBeInTheDocument()
  })
})
