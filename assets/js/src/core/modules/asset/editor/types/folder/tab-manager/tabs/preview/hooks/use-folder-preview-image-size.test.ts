/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

const mockUserId = jest.fn<number, []>()

jest.mock('@Pimcore/modules/auth/hooks/use-user', () => ({
  useUser: () => ({ id: mockUserId() })
}))

// eslint-disable-next-line import/first
import { act, renderHook } from '@testing-library/react'
// eslint-disable-next-line import/first
import { SizeTypes } from '@Pimcore/components/preview-card/preview-card.types'
// eslint-disable-next-line import/first
import {
  FOLDER_PREVIEW_IMAGE_SIZE_STORAGE_KEY,
  getFolderPreviewImageSizeStorageKey,
  useFolderPreviewImageSize
} from './use-folder-preview-image-size'

const USER_ID = 7
const FOLDER_ID = 42

const prefixedKey = (key: string): string => `pimcore_studio_${key}`
const userKey = prefixedKey(getFolderPreviewImageSizeStorageKey(USER_ID))

const storedMap = (): unknown => JSON.parse(localStorage.getItem(userKey) ?? 'null')

describe('useFolderPreviewImageSize', () => {
  beforeEach(() => {
    localStorage.clear()
    mockUserId.mockReturnValue(USER_ID)
  })

  it('falls back to small when nothing is stored', () => {
    const { result } = renderHook(() => useFolderPreviewImageSize(FOLDER_ID))

    expect(result.current.imageSize).toBe(SizeTypes.SMALL)
  })

  it('restores a previously stored size for the folder', () => {
    localStorage.setItem(userKey, JSON.stringify({ [FOLDER_ID]: SizeTypes.LARGE }))

    const { result } = renderHook(() => useFolderPreviewImageSize(FOLDER_ID))

    expect(result.current.imageSize).toBe(SizeTypes.LARGE)
  })

  it('persists a non-default size under the user namespaced key', () => {
    const { result } = renderHook(() => useFolderPreviewImageSize(FOLDER_ID))

    act(() => { result.current.setImageSize(SizeTypes.LARGE) })

    expect(result.current.imageSize).toBe(SizeTypes.LARGE)
    expect(storedMap()).toEqual({ [FOLDER_ID]: SizeTypes.LARGE })
  })

  it('drops the folder entry and finally the whole key when the size returns to the default', () => {
    const otherFolderId = 43
    localStorage.setItem(userKey, JSON.stringify({
      [FOLDER_ID]: SizeTypes.LARGE,
      [otherFolderId]: SizeTypes.LARGE
    }))

    const { result } = renderHook(() => useFolderPreviewImageSize(FOLDER_ID))
    act(() => { result.current.setImageSize(SizeTypes.SMALL) })

    expect(storedMap()).toEqual({ [otherFolderId]: SizeTypes.LARGE })

    const other = renderHook(() => useFolderPreviewImageSize(otherFolderId))
    act(() => { other.result.current.setImageSize(SizeTypes.SMALL) })

    expect(localStorage.getItem(userKey)).toBeNull()
  })

  it('leaves sizes of other folders untouched', () => {
    const otherFolderId = 43
    localStorage.setItem(userKey, JSON.stringify({ [otherFolderId]: SizeTypes.LARGE }))

    const { result } = renderHook(() => useFolderPreviewImageSize(FOLDER_ID))

    expect(result.current.imageSize).toBe(SizeTypes.SMALL)

    act(() => { result.current.setImageSize(SizeTypes.LARGE) })

    expect(storedMap()).toEqual({
      [FOLDER_ID]: SizeTypes.LARGE,
      [otherFolderId]: SizeTypes.LARGE
    })
  })

  it('falls back to the default when the stored value is not valid JSON', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {})
    localStorage.setItem(userKey, 'not json')

    const { result } = renderHook(() => useFolderPreviewImageSize(FOLDER_ID))

    expect(result.current.imageSize).toBe(SizeTypes.SMALL)
    expect(warn).toHaveBeenCalled()

    warn.mockRestore()
  })

  it('ignores stored values that are not a known size', () => {
    localStorage.setItem(userKey, JSON.stringify({ [FOLDER_ID]: 'gigantic' }))

    const { result } = renderHook(() => useFolderPreviewImageSize(FOLDER_ID))

    expect(result.current.imageSize).toBe(SizeTypes.SMALL)
  })

  it('keeps the sizes of different users apart', () => {
    localStorage.setItem(userKey, JSON.stringify({ [FOLDER_ID]: SizeTypes.LARGE }))
    mockUserId.mockReturnValue(8)

    const { result } = renderHook(() => useFolderPreviewImageSize(FOLDER_ID))

    expect(result.current.imageSize).toBe(SizeTypes.SMALL)

    act(() => { result.current.setImageSize(SizeTypes.LARGE) })

    expect(localStorage.getItem(prefixedKey(getFolderPreviewImageSizeStorageKey(8)))).not.toBeNull()
    expect(storedMap()).toEqual({ [FOLDER_ID]: SizeTypes.LARGE })
  })

  it('uses the unnamespaced key while the user is not loaded yet', () => {
    mockUserId.mockReturnValue(0)

    const { result } = renderHook(() => useFolderPreviewImageSize(FOLDER_ID))
    act(() => { result.current.setImageSize(SizeTypes.LARGE) })

    expect(localStorage.getItem(prefixedKey(FOLDER_PREVIEW_IMAGE_SIZE_STORAGE_KEY))).not.toBeNull()
  })
})
