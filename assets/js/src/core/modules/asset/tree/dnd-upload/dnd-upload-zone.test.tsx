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
import { DndUploadZone } from './dnd-upload-zone'
import { DndUpload } from './dnd-upload'
import { processDirectoryDrop, triggerUploaderFiles } from './dnd-upload-folder-drop'
import { droppedItemsContainDirectory } from './dnd-upload-folder-utils'

const mockRefreshTree = jest.fn()
const mockDispatch = jest.fn()
const mockDraggerProps = jest.fn()

jest.mock('@Pimcore/modules/element/actions/refresh-tree/use-refresh-tree', () => ({
  useRefreshTree: () => ({ refreshTree: mockRefreshTree })
}))

jest.mock('@sdk/app', () => ({
  useAppDispatch: () => mockDispatch
}))

jest.mock('@Pimcore/modules/element/element-api-slice-enhanced', () => ({
  api: { util: { invalidateTags: (tags: unknown) => ({ type: 'invalidate', tags }) } }
}))

jest.mock('@Pimcore/components/modal-upload/hooks/use-folder-drop-conflict-handler', () => ({
  useFolderDropConflictHandler: () => ({
    checkFile: jest.fn(),
    maps: { replaceIdByKey: new Map() },
    resetMaps: jest.fn()
  })
}))

jest.mock('./folder-creation-modal', () => ({ FolderCreationModal: () => null }))
jest.mock('./dnd-upload-folder-utils', () => ({ droppedItemsContainDirectory: jest.fn() }))
jest.mock('./dnd-upload-folder-drop', () => ({
  processDirectoryDrop: jest.fn(),
  triggerUploaderFiles: jest.fn(),
  buildFileKey: (f: File) => `${f.name}${f.size}`
}))

jest.mock('@Pimcore/components/modal-upload/components/modal-upload-dragger/modal-upload-dragger', () => ({
  ModalUploadDragger: (props: any) => {
    mockDraggerProps(props)
    return (
      <div data-testid="dragger">
        <button data-testid="finish" onClick={ () => { void props.onSuccess() } } />
        {props.children}
      </div>
    )
  }
}))

const lastDraggerProps = (): any => mockDraggerProps.mock.calls[mockDraggerProps.mock.calls.length - 1][0]

describe('DndUploadZone', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('AC1: passes plain file drops to the dragger with the target folder id', () => {
    (droppedItemsContainDirectory as jest.Mock).mockReturnValue(false)
    const { container } = render(<DndUploadZone targetFolderId={ 7 } targetPath="/a">child</DndUploadZone>)

    expect(lastDraggerProps().targetFolderId).toBe(7)
    fireEvent.drop(container.firstChild as Element, { dataTransfer: { items: [], files: [] } })
    expect(processDirectoryDrop).not.toHaveBeenCalled()
    expect(screen.getByText('child')).toBeInTheDocument()
  })

  it('AC2: runs the folder-drop path for a directory drop and triggers the uploader', async () => {
    (droppedItemsContainDirectory as jest.Mock).mockReturnValue(true)
    const files = [new File(['x'], 'x.txt')];
    (processDirectoryDrop as jest.Mock).mockResolvedValue(files)
    const { container } = render(<DndUploadZone targetFolderId={ 7 } targetPath="/a">child</DndUploadZone>)

    fireEvent.drop(container.firstChild as Element, { dataTransfer: { items: [], files: [] } })

    await waitFor(() => { expect(triggerUploaderFiles).toHaveBeenCalled() })
    expect((processDirectoryDrop as jest.Mock).mock.calls[0][0]).toEqual(
      expect.objectContaining({ rootFolderId: 7, rootPath: '/a' })
    )
    expect((triggerUploaderFiles as jest.Mock).mock.calls[0][1]).toBe(files)
  })

  it('AC3: on batch end refreshes the tree, invalidates the grid tag once and calls onUploaded', async () => {
    const onUploaded = jest.fn()
    render(<DndUploadZone onUploaded={ onUploaded } targetFolderId={ 7 } targetPath="/a">child</DndUploadZone>)

    fireEvent.click(screen.getByTestId('finish'))

    await waitFor(() => { expect(onUploaded).toHaveBeenCalledTimes(1) })
    expect(mockRefreshTree).toHaveBeenCalledWith(7)
    expect(mockDispatch).toHaveBeenCalledTimes(1)
    const action = mockDispatch.mock.calls[0][0]
    expect(JSON.stringify(action.tags)).toContain('"id":7')
    expect(JSON.stringify(action.tags)).toContain('"type":"AssetGrid"')
  })

  it('AC4: disabled renders only the children, and DndUpload renders through the zone', () => {
    const { rerender } = render(<DndUploadZone disabled targetFolderId={ 7 } targetPath="/a">child</DndUploadZone>)
    expect(screen.queryByTestId('dragger')).toBeNull()
    expect(screen.getByText('child')).toBeInTheDocument()

    rerender(<DndUpload nodeId="9" nodePath="/b">tree child</DndUpload>)
    expect(screen.getByTestId('dragger')).toBeInTheDocument()
    expect(lastDraggerProps().targetFolderId).toBe(9)
  })
})
