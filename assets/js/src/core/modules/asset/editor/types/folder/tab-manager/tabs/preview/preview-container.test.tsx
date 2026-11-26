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
import { render, screen, act, fireEvent } from '@testing-library/react'
import { PreviewContainer } from './preview-container'

const mockRefetch = jest.fn()
const mockZone = jest.fn()
const mockStartUpload = jest.fn()
const mockInvalidate = jest.fn()
const mockDispatch = jest.fn()
const mockRefreshTree = jest.fn()
let mockUseRealZone = false
let mockFolder: { permissions: Record<string, boolean>, fullPath: string } = { permissions: { create: true }, fullPath: '/Images' }
let mockUploadDragger: any = null

jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (k: string) => k }) }))
jest.mock('@Pimcore/app/config/app-config', () => ({ appConfig: { defaultPageSize: 20 } }))
jest.mock('@Pimcore/modules/asset/asset-api-slice-enhanced', () => ({
  useAssetGetTreeQuery: () => ({ data: { items: [], totalItems: 0 }, isFetching: false, refetch: mockRefetch }),
  useAssetGetByIdQuery: () => ({ currentData: mockFolder })
}))
jest.mock('@Pimcore/modules/element/hooks/use-element-context', () => ({
  useElementContext: () => ({ id: 42, elementType: 'asset' })
}))
jest.mock('@Pimcore/components/element-tree/provider/tree-permission-provider/use-tree-permission', () => ({
  useTreePermission: () => ({ isTreeActionAllowed: () => true })
}))
jest.mock('@Pimcore/modules/asset/listing/dnd-upload/listing-drop-zone.styles', () => ({ useStyles: () => ({ styles: { dropArea: 'drop-area' } }) }))
jest.mock('@Pimcore/modules/element/actions/refresh-tree/use-refresh-tree', () => ({ useRefreshTree: () => ({ refreshTree: mockRefreshTree }) }))
jest.mock('@sdk/app', () => ({ useAppDispatch: () => mockDispatch }))
jest.mock('@Pimcore/modules/element/element-api-slice-enhanced', () => ({
  api: { util: { invalidateTags: (tags: unknown) => { mockInvalidate(tags); return { type: 'invalidate' } } } }
}))
jest.mock('@Pimcore/components/modal-upload/hooks/use-folder-drop-conflict-handler', () => ({
  useFolderDropConflictHandler: () => ({ checkFile: jest.fn(), maps: { replaceIdByKey: new Map() }, resetMaps: jest.fn() })
}))
jest.mock('@Pimcore/modules/asset/tree/dnd-upload/folder-creation-modal', () => ({ FolderCreationModal: () => null }))
// Lowest upload layer: the dragger starts the upload of dropped files and reports completion through onSuccess.
jest.mock('@Pimcore/components/modal-upload/components/modal-upload-dragger/modal-upload-dragger', () => ({
  ModalUploadDragger: (props: any) => {
    mockUploadDragger = props
    return (
      <div
        data-testid="dragger"
        onDrop={ (e) => { if ((e.dataTransfer?.files?.length ?? 0) > 0) mockStartUpload(props.targetFolderId, Array.from(e.dataTransfer.files)) } }
      >
        {props.children}
      </div>
    )
  }
}))
jest.mock('@Pimcore/modules/asset/hooks/use-asset-draft', () => ({
  useAssetDraft: () => ({ asset: { fullPath: '/Images' } })
}))
jest.mock('./hooks/use-folder-preview-image-size', () => ({
  useFolderPreviewImageSize: () => ({ imageSize: 'small', setImageSize: jest.fn() })
}))
jest.mock('./pagination/pagination', () => ({ Pagination: () => null }))
jest.mock('@Pimcore/modules/asset/editor/types/folder/tab-manager/tabs/preview/card/preview-card-container', () => ({ PreviewCardContainer: () => null }))
jest.mock('@Pimcore/components/content-layout/content-layout', () => ({
  ContentLayout: ({ children }: any) => <div>{children}</div>
}))
jest.mock('@Pimcore/components/content/content', () => ({ Content: ({ children }: any) => <div>{children}</div> }))
jest.mock('@Pimcore/components/toolbar/toolbar', () => ({ Toolbar: () => null }))
jest.mock('@Pimcore/components/flex/flex', () => ({ Flex: ({ children }: any) => <div>{children}</div> }))
jest.mock('@Pimcore/components/segmented/segmented', () => ({ Segmented: () => null }))
jest.mock('@Pimcore/components/preview-card/preview-card', () => ({ SizeTypes: { SMALL: 'small', LARGE: 'large' } }))
jest.mock('@Pimcore/components/text/text', () => ({ Text: () => null }))
jest.mock('@sdk/components', () => ({ IconButton: () => null, Split: ({ children }: any) => <div>{children}</div> }))
jest.mock('@Pimcore/modules/asset/listing/dnd-upload/listing-drop-zone', () => ({
  ListingDropZone: (props: any) => {
    if (mockUseRealZone) {
      const Real = jest.requireActual('@Pimcore/modules/asset/listing/dnd-upload/listing-drop-zone').ListingDropZone
      return <Real { ...props } />
    }
    mockZone(props)
    return <div data-testid="drop-zone">{props.children}</div>
  }
}))

describe('Folder PreviewContainer drop upload', () => {
  beforeEach(() => {
    mockZone.mockClear()
    mockRefetch.mockClear()
  })

  it('AC1: wraps the preview content in the shared listing drop zone', () => {
    render(<PreviewContainer />)
    expect(screen.getByTestId('drop-zone')).toBeInTheDocument()
  })

  it('AC2: uses the listing drop zone, which renders the same drop indicator as the listing', () => {
    render(<PreviewContainer />)
    expect(mockZone).toHaveBeenCalled()
  })

  it('AC3: refetches the preview when the upload is done', () => {
    render(<PreviewContainer />)
    act(() => { mockZone.mock.calls[0][0].onUploaded() })
    expect(mockRefetch).toHaveBeenCalledTimes(1)
  })

  it('AC4: adds no drag handling of its own, so tree-asset drags behave as before', () => {
    render(<PreviewContainer />)
    const keys = Object.keys(mockZone.mock.calls[0][0] as Record<string, unknown>).sort()
    expect(keys).toEqual(['children', 'onUploaded'])
  })
})

describe('Folder PreviewContainer drop upload with the real drop zone', () => {
  const file = new File(['x'], 'a.png', { type: 'image/png' })

  beforeEach(() => {
    jest.clearAllMocks()
    mockUseRealZone = true
    mockFolder = { permissions: { create: true }, fullPath: '/Images' }
  })

  afterEach(() => { mockUseRealZone = false })

  it('AC1: a real file drop starts the upload into the current folder and refetches when done', async () => {
    render(<PreviewContainer />)
    fireEvent.drop(screen.getByTestId('dragger'), { dataTransfer: { types: ['Files'], files: [file], items: [] } })
    expect(mockStartUpload).toHaveBeenCalledWith(42, [file])
    expect(mockUploadDragger.targetFolderId).toBe(42)
    expect(mockRefetch).not.toHaveBeenCalled()
    await act(async () => { await mockUploadDragger.onSuccess() })
    expect(mockRefetch).toHaveBeenCalledTimes(1)
    expect(mockRefreshTree).toHaveBeenCalledWith(42)
  })

  it('AC1: a non-file drag shows no overlay, a file drag does', () => {
    render(<PreviewContainer />)
    const area = screen.getByTestId('listing-drop-area')
    fireEvent.dragEnter(area, { dataTransfer: { types: ['text/plain'] } })
    expect(screen.queryByTestId('listing-drop-overlay')).not.toBeInTheDocument()
    fireEvent.dragEnter(area, { dataTransfer: { types: ['Files'] } })
    expect(screen.getByTestId('listing-drop-overlay')).toBeInTheDocument()
  })

  it('AC2: without the create permission no drop target exists and no upload starts', () => {
    mockFolder = { permissions: { create: false }, fullPath: '/Images' }
    const { container } = render(<PreviewContainer />)
    expect(screen.queryByTestId('dragger')).not.toBeInTheDocument()
    expect(screen.queryByTestId('listing-drop-area')).not.toBeInTheDocument()
    fireEvent.drop(container.firstChild as Element, { dataTransfer: { types: ['Files'], files: [file], items: [] } })
    expect(mockStartUpload).not.toHaveBeenCalled()
  })
})
