/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ReactNode } from 'react'
import { renderHook } from '@testing-library/react'
import { useStudioModal, withDraggableModals } from './use-studio-modal'

const METHODS = ['confirm', 'info', 'success', 'error', 'warning'] as const

const mockIsInIframe = jest.fn()
const mockIsApiAvailable = jest.fn()
const mockGetApi = jest.fn()
let mockLocalModal: Record<string, jest.Mock>

const createModal = (): Record<string, jest.Mock> => Object.fromEntries(METHODS.map((method) => [method, jest.fn()]))

jest.mock('antd', () => ({
  App: { useApp: () => ({ modal: mockLocalModal }) }
}))

jest.mock('@Pimcore/utils/iframe', () => ({
  isInIframe: () => mockIsInIframe()
}))

jest.mock('@Pimcore/app/public-api/helpers/api-helper', () => ({
  isPimcoreStudioApiAvailable: () => mockIsApiAvailable(),
  getPimcoreStudioApi: () => mockGetApi()
}))

// The real wrapper renders a component that owns hooks, which is exactly what must never
// cross a React boundary: the stub only marks the render function it produced.
jest.mock('@Pimcore/components/modal/hooks/draggable-modal-render', () => ({
  withDraggableModalRender: (existingRender?: (node: unknown) => unknown) => Object.assign(
    (node: unknown) => (existingRender !== undefined ? existingRender(node) : node),
    { isDraggable: true, existingRender }
  )
}))

interface PassedConfig {
  title?: string
  modalRender?: { isDraggable?: boolean, existingRender?: unknown }
}

const firstConfig = (fn: jest.Mock): PassedConfig => (fn.mock.calls as Array<[PassedConfig]>)[0][0]

const isDraggable = (config: PassedConfig): boolean => config.modalRender?.isDraggable === true

describe('useStudioModal', () => {
  let parentModal: Record<string, jest.Mock>

  beforeEach(() => {
    mockLocalModal = createModal()
    parentModal = createModal()
    mockIsInIframe.mockReturnValue(false)
    mockIsApiAvailable.mockReturnValue(false)
    mockGetApi.mockReturnValue({ modal: parentModal })
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('makes the local modal draggable outside of an iframe', () => {
    const { result } = renderHook(() => useStudioModal())
    const config = { title: 'Remove' }

    result.current.modal.confirm(config)
    result.current.localModal.confirm(config)

    expect(mockLocalModal.confirm).toHaveBeenCalledTimes(2)
    ;(mockLocalModal.confirm.mock.calls as Array<[PassedConfig]>).forEach(([passed]) => {
      expect(passed.title).toBe('Remove')
      expect(isDraggable(passed)).toBe(true)
    })
  })

  it.each(METHODS)('hands %s to the parent window modal untouched inside an iframe', (method) => {
    mockIsInIframe.mockReturnValue(true)
    mockIsApiAvailable.mockReturnValue(true)

    const { result } = renderHook(() => useStudioModal())
    const config = { title: 'Remove', content: 'Remove all relations?' }

    result.current.modal[method](config)

    // The parent registers its modal draggable already. A modalRender created in the iframe
    // would be rendered by the parent's React and crash its hooks.
    expect(parentModal[method]).toHaveBeenCalledTimes(1)
    expect(firstConfig(parentModal[method])).toBe(config)
    expect(firstConfig(parentModal[method]).modalRender).toBeUndefined()
    expect(mockLocalModal[method]).not.toHaveBeenCalled()
  })

  it('keeps the caller modalRender when delegating to the parent window modal', () => {
    mockIsInIframe.mockReturnValue(true)
    mockIsApiAvailable.mockReturnValue(true)
    const modalRender = jest.fn()

    const { result } = renderHook(() => useStudioModal())
    result.current.modal.confirm({ title: 'Remove', modalRender })

    expect(firstConfig(parentModal.confirm).modalRender).toBe(modalRender)
  })

  it('keeps the local modal of the iframe draggable', () => {
    mockIsInIframe.mockReturnValue(true)
    mockIsApiAvailable.mockReturnValue(true)

    const { result } = renderHook(() => useStudioModal())
    result.current.localModal.confirm({ title: 'Rename' })

    expect(mockLocalModal.confirm).toHaveBeenCalledTimes(1)
    expect(isDraggable(firstConfig(mockLocalModal.confirm))).toBe(true)
    expect(parentModal.confirm).not.toHaveBeenCalled()
  })

  it('falls back to the draggable local modal when the parent window modal is not reachable', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {})
    mockIsInIframe.mockReturnValue(true)
    mockIsApiAvailable.mockReturnValue(true)
    mockGetApi.mockImplementation(() => { throw new Error('no parent api') })

    const { result } = renderHook(() => useStudioModal())
    result.current.modal.confirm({ title: 'Remove' })

    expect(warn).toHaveBeenCalledTimes(1)
    expect(mockLocalModal.confirm).toHaveBeenCalledTimes(1)
    expect(isDraggable(firstConfig(mockLocalModal.confirm))).toBe(true)
  })
})

describe('withDraggableModals', () => {
  it('composes the modalRender the caller already provides', () => {
    const modal = createModal()
    const existingRender = jest.fn((node: ReactNode) => node)

    withDraggableModals(modal as never).confirm({ title: 'Remove', modalRender: existingRender })

    const passed = firstConfig(modal.confirm)
    expect(isDraggable(passed)).toBe(true)
    expect(passed.modalRender?.existingRender).toBe(existingRender)
  })

  it('does not alter the wrapped modal instance', () => {
    const modal = createModal()
    const originalConfirm = modal.confirm

    withDraggableModals(modal as never)

    expect(modal.confirm).toBe(originalConfirm)
  })
})
