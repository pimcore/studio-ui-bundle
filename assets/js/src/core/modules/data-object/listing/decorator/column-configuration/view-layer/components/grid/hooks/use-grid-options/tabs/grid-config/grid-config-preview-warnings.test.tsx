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
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { PreviewModeProvider } from '@Pimcore/components/preview-mode/preview-mode-provider'
import { Form } from '@Pimcore/components/form/form'
import { GridConfigModal } from './grid-config-modal'
import { GridConfigList } from './grid-config-list'
import { SaveForm } from './forms/save-form'

jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))
jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => ({
  createStyles: () => () => ({ styles: {}, cx: () => '', theme: {} }),
  css: () => '',
  cx: () => '',
  keyframes: () => ''
}))

// modal shell
jest.mock('./grid-config-modal.styles', () => ({ useStyles: () => ({ styles: {} }) }))
jest.mock('@Pimcore/components/modal/modal', () => ({ Modal: ({ children, title }: any) => <div>{title}{children}</div> }))
jest.mock('@Pimcore/components/modal/modal-title/modal-title', () => ({ ModalTitle: ({ children }: any) => <div>{children}</div> }))
jest.mock('@Pimcore/components/content-layout/content-layout', () => ({ ContentLayout: ({ children }: any) => <div>{children}</div> }))
jest.mock('@Pimcore/components/toolbar/toolbar', () => ({ Toolbar: ({ children }: any) => <div>{children}</div> }))
jest.mock('@Pimcore/components/content/content', () => ({ Content: ({ children }: any) => <div>{children}</div> }))
jest.mock('@Pimcore/components/space/space', () => ({ Space: ({ children }: any) => <div>{children}</div> }))
jest.mock('@Pimcore/components/icon-button/icon-button', () => ({ IconButton: () => null }))
jest.mock('@Pimcore/components/tooltip/tooltip', () => ({ Tooltip: ({ children }: any) => <>{children}</> }))
jest.mock('@Pimcore/components/stack-list/stack-list', () => ({
  StackList: ({ items }: any) => <>{items.map((item: any) => <div key={ item.id }>{item.children}{item.body}</div>)}</>
}))
jest.mock('@Pimcore/modules/element/listing/decorators/utils/column-configuration/view-layer/components/add-column-controls/add-column-controls', () => ({ AddColumnControls: () => null }))
jest.mock('@Pimcore/modules/element/listing/decorators/utils/column-configuration/view-layer/components/fields-to-add-panel/fields-to-add-panel', () => ({ FieldsToAddPanel: () => null }))
jest.mock('@Pimcore/modules/element/listing/decorators/utils/column-configuration/view-layer/components/search-mode-column-badge/search-mode-column-badge', () => ({ SearchModeColumnBadge: () => null }))
jest.mock('./forms/advanced-column-form/pipeline-layout-provider', () => ({ PipelineLayoutProvider: ({ children }: any) => <>{children}</> }))
jest.mock('./forms/advanced-column-form/advanced-column-form', () => ({ AdvancedColumnForm: () => <div data-testid="advanced-form" /> }))
jest.mock('@Pimcore/modules/element/components/language-selection/permission-based-language-selection-control', () => ({ PermissionBasedLanguageSelectionControl: () => null }))
jest.mock('@Pimcore/components/language-selection/provider/use-language-selection', () => ({ useLanguageSelection: () => ({ currentLanguage: 'en' }) }))
jest.mock('@Pimcore/components/language-selection', () => ({ useLanguageSelection: () => ({ currentLanguage: 'en' }) }))
jest.mock('@Pimcore/modules/element/element-selector/provider/element-selector/use-element-selector', () => ({ useElementSelector: () => ({ open: jest.fn() }) }))
jest.mock('@Pimcore/modules/element/element-selector/provider/element-selector/element-selector-provider', () => ({ SelectionType: { Single: 'single' } }))
jest.mock('@Pimcore/modules/element/listing/abstract/data-layer/provider/data/use-data', () => ({
  useData: () => ({ data: { items: [{ id: 9, fullpath: '/p/q/r' }] } })
}))
jest.mock('@Pimcore/modules/data-object/listing/decorator/class-definition-selection/context-layer/provider/use-class-definition-selection', () => ({
  useClassDefinitionSelection: () => ({ selectedClassDefinition: { id: 1, name: 'Car' } })
}))

// list
jest.mock('@Pimcore/app/depency-injection', () => ({ useInjection: () => ({ getDynamicTypes: () => [] }) }))
jest.mock('@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/use-available-columns', () => ({
  useAvailableColumns: () => ({ getAdvancedColumnTemplate: () => undefined })
}))
jest.mock('./hooks/use-grid-config', () => ({
  useGridConfig: () => ({
    setColumns: jest.fn(),
    columns: [
      { key: 'name', type: 'dataobject.adapter', config: {}, __meta: { uniqueId: 'a' } },
      { key: 'advanced', type: 'dataobject.advanced', config: {}, __meta: { uniqueId: 'b' } }
    ]
  })
}))

// simple column preview (real), fed by a request that either fails or succeeds
const queryResult = jest.fn()
jest.mock('@Pimcore/modules/data-object/data-object-api-slice.gen', () => ({ useDataObjectGetGridQuery: () => queryResult() }))
jest.mock('@Pimcore/modules/element/listing/abstract/settings/use-settings', () => ({
  useSettings: () => ({ useGridOptions: () => ({ transformGridColumn: (column: any) => ({ header: column.key, meta: {} }) }), useColumnMapper: () => jest.requireActual('@Pimcore/modules/data-object/listing/column-mapper/use-column-mapper').useDataObjectColumnMapper() })
}))
jest.mock('@Pimcore/components/grid/grid', () => ({ Grid: () => <div data-testid="grid" /> }))
jest.mock('@Pimcore/components/grid-content-renderer/grid-content-renderer', () => ({ GridContentRenderer: ({ children }: any) => <>{children}</> }))

// save form: the app's Form wraps antd's, whose validation messages are what is rendered
jest.mock('@Pimcore/components/form/form', () => ({ Form: jest.requireActual('antd').Form }))
jest.mock('./forms/save-form.styles', () => ({ useStyles: () => ({ styles: {} }) }))
jest.mock('@Pimcore/components/users-roles-dropdown/users-roles-dropdown', () => ({ UsersRolesDropdown: () => null }))
jest.mock('@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/grid-config/use-grid-config', () => ({
  useGridConfig: () => ({ gridConfig: { sharedUsers: [], sharedRoles: [] }, setGridConfig: jest.fn() })
}))

const dangerSelector = '.ant-form-item-explain-error, .ant-alert, [role="alert"], .ant-typography-danger'

const withPreview = (on: boolean, children: React.ReactNode): React.JSX.Element => (
  <PreviewModeProvider
    defaultEnabled={ on }
    fallbackItem={ { id: 9 } }
  >{children}</PreviewModeProvider>
)

// the path of an element up to the container: its tag and class at every level
const position = (element: Element, root: Element): string[] => {
  const path: string[] = []
  for (let node: Element | null = element; node !== null && node !== root; node = node.parentElement) {
    path.push(`${node.tagName}.${node.className}`)
  }
  return path
}

const SaveFormWithSubmit = (): React.JSX.Element => {
  const [form] = Form.useForm()
  return (
    <>
      <SaveForm form={ form } />
      <button onClick={ () => { form.validateFields().catch(() => {}) } }>validate</button>
    </>
  )
}

const renderSaveFormError = async (on: boolean): Promise<{ text: string, html: string, position: string[] }> => {
  const { container, unmount } = render(withPreview(on, <SaveFormWithSubmit />))
  await act(async () => { fireEvent.click(screen.getByText('validate')) })
  await waitFor(() => { expect(container.querySelector('.ant-form-item-explain-error')).not.toBeNull() })
  const error = container.querySelector('.ant-form-item-explain-error')!
  const result = { text: error.textContent ?? '', html: error.outerHTML, position: position(error, container) }
  unmount()
  return result
}

describe('Grid Configuration modal: warnings and errors with preview mode on and off', () => {
  beforeEach(() => {
    queryResult.mockReset()
    queryResult.mockReturnValue({ data: { totalItems: 1, items: [{ id: 9, columns: [{ key: 'name', value: 'Foo' }] }] }, currentData: { totalItems: 1, items: [{ id: 9, columns: [{ key: 'name', value: 'Foo' }] }] }, isLoading: false, isFetching: false, error: undefined })
  })

  it('AC1: the Save form shows its name validation error identically (text, element, position) with preview on and off', async () => {
    const off = await renderSaveFormError(false)
    const on = await renderSaveFormError(true)

    expect(off.text).toBe('form.validation.provide-name')
    expect(on).toEqual(off)
  })

  it('AC1: the column list renders no warning or error element in either mode and the same column tags', () => {
    const off = render(withPreview(false, <GridConfigList />))
    expect(off.container.querySelector(dangerSelector)).toBeNull()
    const offTags = Array.from(off.container.querySelectorAll('.ant-tag')).map((tag) => tag.outerHTML)
    off.unmount()

    const on = render(withPreview(true, <GridConfigList />))
    expect(on.container.querySelector(dangerSelector)).toBeNull()
    const onTags = Array.from(on.container.querySelectorAll('.ant-tag')).map((tag) => tag.outerHTML)

    expect(offTags.length).toBeGreaterThan(0)
    expect(onTags).toEqual(offTags)
  })

  it('AC1: the preview request error is the one text that differs: it shows only with preview on, below its column', () => {
    queryResult.mockReturnValue({ data: undefined, currentData: undefined, isLoading: false, isFetching: false, error: { error: 'boom' } })

    const off = render(withPreview(false, <GridConfigList />))
    expect(off.container.querySelector(dangerSelector)).toBeNull()
    expect(screen.queryByText('grid.advanced-column.error-preview-data')).not.toBeInTheDocument()
    off.unmount()

    const on = render(withPreview(true, <GridConfigList />))
    const error = screen.getByText('grid.advanced-column.error-preview-data')
    expect(error.className).toContain('ant-typography-danger')
    // it sits in the same stack item as the column's tag
    expect(error.closest('[data-testid="preview-mode-column-preview-row"]')?.parentElement).toContainElement(on.container.querySelector('.ant-tag'))
  })

  describe.each([false, true])('Apply with preview %s', (on) => {
    const props: any = {
      open: true,
      availableColumnsTree: [],
      onColumnSelect: jest.fn(),
      onAddAdvancedColumn: jest.fn(),
      onCancelClick: jest.fn(),
      onApplyClick: jest.fn(),
      onOpenChange: jest.fn()
    }

    it(`AC2: sends the same payload (one apply call, no arguments, modal closes) with preview ${on ? 'on' : 'off'}`, () => {
      jest.clearAllMocks()
      render(<GridConfigModal { ...props } />)
      if (on) {
        fireEvent.click(screen.getByRole('switch'))
        expect(screen.getByText('preview-mode.preview-item')).toBeInTheDocument()
      }
      fireEvent.click(screen.getByText('grid-config.apply-changes'))

      expect(props.onApplyClick).toHaveBeenCalledTimes(1)
      expect(props.onApplyClick.mock.calls[0]).toEqual([])
      expect(props.onOpenChange).toHaveBeenCalledWith(false)
      expect(props.onCancelClick).not.toHaveBeenCalled()
    })
  })
})
