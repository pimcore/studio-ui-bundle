/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

const mockRemoveValues = jest.fn()
const mockInitializeData = jest.fn()
const mockTriggerSaveAndReload = jest.fn()
const mockGetValues = jest.fn(() => ({}))

jest.mock('@Pimcore/modules/document/editor/shared-tab-manager/tabs/edit/hooks/use-document-editor', () => ({
  useDocumentEditor: () => ({
    initializeData: mockInitializeData,
    getValues: mockGetValues,
    removeValues: mockRemoveValues,
    triggerSaveAndReload: mockTriggerSaveAndReload
  })
}))

jest.mock('@Pimcore/modules/document/document-provider', () => ({
  DocumentContext: jest.requireActual('react').createContext({ id: 42 })
}))

jest.mock('@Pimcore/modules/app/error-handler', () => ({
  __esModule: true,
  default: jest.fn(),
  GeneralError: class GeneralError extends Error {},
  ApiError: class ApiError extends Error {}
}))

jest.mock('../areablock-editable.styles', () => ({
  useStyles: () => ({ styles: { areaEntry: 'area-entry-style' } })
}))

jest.mock('@Pimcore/app/public-api/helpers/api-helper', () => ({
  getPimcoreStudioApi: jest.fn(() => ({ document: { mergeAreablockTypes: jest.fn() } }))
}))

/* eslint-disable import/first */
import { renderHook, act } from '@testing-library/react'
import { useAreablockEditable } from './use-areablock-editable'
import { AreablockManager } from '../utils/areablock-manager'
import { setAreablockClipboard } from '../utils/areablock-clipboard'
import { type AreablockValue, type AreablockEditableConfig, type AreablockRenderTrigger } from '../areablock-editable'
/* eslint-enable import/first */

const EDITABLE_NAME = 'content'

const SERVER_VALUE: AreablockValue = [
  { key: '5', type: 'hero-teaser', hidden: false },
  { key: '2', type: 'standard-teaser', hidden: false },
  { key: '12', type: 'hero-grid', hidden: false }
]

const CONFIG: AreablockEditableConfig = {
  types: [{ name: 'WYSIWYG', type: 'wysiwyg' }]
}

const createContainer = (entryKeys: Array<string | null>): HTMLDivElement => {
  const container = document.createElement('div')
  container.setAttribute('data-name', EDITABLE_NAME)
  container.setAttribute('data-type', 'areablock')

  entryKeys.forEach(key => {
    const element = document.createElement('div')
    element.className = 'pimcore_area_entry pimcore_block_entry'
    element.setAttribute('data-name', EDITABLE_NAME)
    element.setAttribute('type', 'hero-teaser')

    if (key !== null) {
      element.setAttribute('key', key)
    }

    container.appendChild(element)
  })

  document.body.appendChild(container)

  return container
}

interface RenderAreablockHookOptions {
  entryKeys: Array<string | null>
  value?: AreablockValue
  config?: AreablockEditableConfig
}

const renderAreablockHook = ({ entryKeys, value, config = CONFIG }: RenderAreablockHookOptions): {
  result: ReturnType<typeof renderHook<ReturnType<typeof useAreablockEditable>, unknown>>['result']
  container: HTMLDivElement
  manager: AreablockManager
  onChange: jest.Mock
  renderTrigger: jest.Mock
} => {
  const container = createContainer(entryKeys)
  const manager = new AreablockManager(EDITABLE_NAME, { current: container })
  const onChange = jest.fn()

  const renderTrigger = jest.fn(async () => ({
    data: {
      htmlCode: `<div class="pimcore_area_entry" data-name="${EDITABLE_NAME}" key="13" type="wysiwyg"></div>`,
      editableDefinitions: []
    },
    error: undefined
  }))

  const { result } = renderHook(() => useAreablockEditable({
    areablockManager: manager,
    value,
    onChange,
    config,
    renderTrigger: renderTrigger as unknown as AreablockRenderTrigger
  }))

  return { result, container, manager, onChange, renderTrigger }
}

describe('useAreablockEditable', () => {
  afterEach(() => {
    document.body.innerHTML = ''
    jest.clearAllMocks()
  })

  describe('addArea against area entries without key attributes', () => {
    it('preserves the authoritative value in the render payload and in onChange', async () => {
      const { result, onChange, renderTrigger } = renderAreablockHook({
        entryKeys: [null, null, null],
        value: SERVER_VALUE
      })

      await act(async () => {
        await result.current.addArea(null, 'wysiwyg')
      })

      const expectedValue = [
        { key: '13', type: 'wysiwyg', hidden: false },
        ...SERVER_VALUE
      ]

      expect(renderTrigger).toHaveBeenCalledWith(expect.objectContaining({
        body: expect.objectContaining({
          index: 0,
          areaBlockData: expectedValue
        })
      }))
      expect(onChange).toHaveBeenCalledWith(expectedValue)
    })

    it('allocates the next key above the highest server key instead of reusing an existing one', async () => {
      const { result, renderTrigger } = renderAreablockHook({
        entryKeys: [null, null, null],
        value: SERVER_VALUE
      })

      await act(async () => {
        await result.current.addArea(null, 'wysiwyg')
      })

      const payload = renderTrigger.mock.calls[0][0] as { body: { areaBlockData: AreablockValue } }
      expect(payload.body.areaBlockData[0].key).toBe('13')
    })
  })

  describe('pasteArea against area entries without key attributes', () => {
    it('inserts the clipboard entry without dropping the authoritative value', () => {
      setAreablockClipboard({
        identifier: { name: EDITABLE_NAME, realName: EDITABLE_NAME, key: '2' },
        type: 'wysiwyg',
        values: { headline: { type: 'input', data: 'copied' } }
      })

      const { result, onChange } = renderAreablockHook({
        entryKeys: [null, null, null],
        value: SERVER_VALUE
      })

      act(() => {
        result.current.pasteArea(null)
      })

      expect(onChange).toHaveBeenCalledWith([
        { key: '13', type: 'wysiwyg', hidden: false },
        ...SERVER_VALUE
      ])
      expect(mockInitializeData).toHaveBeenCalledWith({
        'content:13.headline': { type: 'input', data: 'copied' }
      })
      expect(mockTriggerSaveAndReload).toHaveBeenCalled()
    })
  })

  describe('operations on keyed entries', () => {
    it('addArea inserts after the given entry based on its key', async () => {
      const { result, manager, onChange } = renderAreablockHook({
        entryKeys: ['5', '2', '12'],
        value: SERVER_VALUE
      })

      const secondElement = manager.queryElements()[1]

      await act(async () => {
        await result.current.addArea(secondElement, 'wysiwyg')
      })

      expect(onChange).toHaveBeenCalledWith([
        SERVER_VALUE[0],
        SERVER_VALUE[1],
        { key: '13', type: 'wysiwyg', hidden: false },
        SERVER_VALUE[2]
      ])
    })

    it('removeArea removes the entry by key and cleans up its child editables', () => {
      mockGetValues.mockReturnValue({
        'content:2.headline': { type: 'input', data: 'x' },
        'content:12.headline': { type: 'input', data: 'y' }
      })

      const { result, manager, onChange } = renderAreablockHook({
        entryKeys: ['5', '2', '12'],
        value: SERVER_VALUE
      })

      const secondElement = manager.queryElements()[1]

      act(() => {
        result.current.removeArea(secondElement)
      })

      expect(onChange).toHaveBeenCalledWith([SERVER_VALUE[0], SERVER_VALUE[2]])
      expect(mockRemoveValues).toHaveBeenCalledWith(['content:2.headline'])
      expect(secondElement.isConnected).toBe(false)
    })

    it('moveAreaDown swaps the entry with its successor in the value', () => {
      const { result, manager, onChange } = renderAreablockHook({
        entryKeys: ['5', '2', '12'],
        value: SERVER_VALUE
      })

      const firstElement = manager.queryElements()[0]

      act(() => {
        result.current.moveAreaDown(firstElement)
      })

      expect(onChange).toHaveBeenCalledWith([SERVER_VALUE[1], SERVER_VALUE[0], SERVER_VALUE[2]])
    })
  })

  describe('reload mode', () => {
    it('addArea updates the value without rendering or DOM changes', async () => {
      const { result, onChange, renderTrigger } = renderAreablockHook({
        entryKeys: [null, null, null],
        value: SERVER_VALUE,
        config: { ...CONFIG, reload: true }
      })

      await act(async () => {
        await result.current.addArea(null, 'wysiwyg')
      })

      expect(renderTrigger).not.toHaveBeenCalled()
      expect(onChange).toHaveBeenCalledWith([
        { key: '13', type: 'wysiwyg', hidden: false },
        ...SERVER_VALUE
      ])
    })
  })
})
