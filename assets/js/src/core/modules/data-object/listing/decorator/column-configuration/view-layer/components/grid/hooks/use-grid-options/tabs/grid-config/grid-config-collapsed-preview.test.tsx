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
import userEvent from '@testing-library/user-event'
import { PreviewModeProvider } from '@Pimcore/components/preview-mode/preview-mode-provider'
import { ColumnPreview } from '@Pimcore/components/preview-mode/column-preview'
import { GridConfigList } from './grid-config-list'
import { Preview } from './forms/advanced-column-form/preview/preview'

jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => ({
  createStyles: () => () => ({ styles: {}, cx: (...classNames: unknown[]) => classNames.filter(Boolean).join(' '), theme: {} }),
  css: () => '',
  cx: () => '',
  keyframes: () => ''
}))
jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))
jest.mock('@Pimcore/components/icon/icon', () => ({ Icon: () => null }))
jest.mock('@Pimcore/components/icon-button/icon-button', () => ({ IconButton: () => null }))
jest.mock('@Pimcore/components/space/space', () => ({ Space: ({ children }: any) => <div>{children}</div> }))
jest.mock('@Pimcore/components/tooltip/tooltip', () => ({ Tooltip: ({ children }: any) => <>{children}</> }))
jest.mock('@Pimcore/modules/element/components/language-selection/permission-based-language-selection-control', () => ({
  PermissionBasedLanguageSelectionControl: () => null
}))
jest.mock('@Pimcore/modules/element/listing/decorators/utils/column-configuration/view-layer/components/search-mode-column-badge/search-mode-column-badge', () => ({
  SearchModeColumnBadge: () => null
}))
jest.mock('@Pimcore/app/depency-injection', () => ({ useInjection: () => ({ getDynamicTypes: () => [] }) }))
jest.mock('@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/use-available-columns', () => ({
  useAvailableColumns: () => ({ getAdvancedColumnTemplate: () => undefined })
}))
jest.mock('./simple-column-preview/simple-column-preview', () => ({
  SimpleColumnPreviewsProvider: ({ children }: any) => <>{children}</>,
  SimpleColumnPreview: () => null
}))
jest.mock('@Pimcore/components/language-selection', () => ({ useLanguageSelection: () => ({ currentLanguage: 'en' }) }))
jest.mock('@Pimcore/modules/element/listing/abstract/data-layer/provider/data/use-data', () => ({
  useData: () => ({ data: { items: [{ id: 9 }] } })
}))
jest.mock('./forms/advanced-column-form/preview/preview-item-provider', () => ({ usePreviewItem: () => ({ item: null }) }))
jest.mock('./forms/advanced-column-form/preview/preview-value', () => ({
  PreviewValue: ({ value }: any) => <span>{String(value)}</span>
}))

// the open form carries its own Preview row, exactly as the real AdvancedColumnForm does
jest.mock('./forms/advanced-column-form/advanced-column-form', () => ({
  AdvancedColumnForm: ({ column }: any) => (
    <div data-testid={ `form-${column.__meta.uniqueId}` }>
      <ColumnPreview>{() => <Preview column={ column } />}</ColumnPreview>
    </div>
  )
}))

const mkColumn = (id: string, field: string): any => ({
  key: 'advanced',
  type: 'dataobject.advanced',
  config: {},
  localizable: false,
  __meta: { uniqueId: id, advancedColumnConfig: { title: id, advancedColumns: [{ key: field }] } }
})

jest.mock('./hooks/use-grid-config', () => ({
  useGridConfig: () => ({ setColumns: jest.fn(), columns: mockColumns })
}))
let mockColumns: any[] = []

// stands in for RTK's cache: a request goes out only for arguments not seen before
const requested = new Set<string>()
const previewSpy = jest.fn()
jest.mock('@Pimcore/modules/data-object/data-object-api-slice.gen', () => ({
  useDataObjectGetGridPreviewQuery: (arg: any, options: any) => {
    if (options?.skip !== true) {
      const key = JSON.stringify(arg)
      if (!requested.has(key)) {
        requested.add(key)
        previewSpy(arg)
      }
    }
    return { data: { value: `value-of-${arg.body.column.config.advancedColumns[0].key}` }, error: undefined }
  }
}))

const renderList = (on: boolean): void => {
  render(
    <PreviewModeProvider defaultEnabled={ on }>
      <GridConfigList />
    </PreviewModeProvider>
  )
}

const rows = (): HTMLElement[] => screen.queryAllByTestId('preview-mode-column-preview-row')
const visibleRows = (): HTMLElement[] => rows().filter((row) => row.closest('.ant-collapse-content-hidden') === null)

describe('GridConfigList collapsed advanced card preview', () => {
  beforeEach(() => {
    requested.clear()
    previewSpy.mockClear()
    mockColumns = [mkColumn('c1', 'name'), mkColumn('c2', 'price')]
  })

  it('AC2: a collapsed advanced card shows the Preview row with the value; an open card shows exactly one', async () => {
    renderList(true)

    // advanced cards start open: one row each, the form's
    expect(visibleRows()).toHaveLength(2)
    expect(screen.getAllByText('preview-mode.preview')).toHaveLength(2)

    await userEvent.click(screen.getByText('c1'))

    // c1 collapsed: its row is now the collapsed body's, c2 still shows its form's
    expect(visibleRows()).toHaveLength(2)
    expect(screen.getAllByText('value-of-name').filter((el) => el.closest('.ant-collapse-content-hidden') === null)).toHaveLength(1)

    await userEvent.click(screen.getByText('c1'))
    expect(visibleRows()).toHaveLength(2)
    expect(screen.getAllByText('value-of-name').filter((el) => el.closest('.ant-collapse-content-hidden') === null)).toHaveLength(1)
  })

  it('AC3: with preview mode off no collapsed card shows a Preview row and no request goes out', async () => {
    renderList(false)
    await userEvent.click(screen.getByText('c1'))
    await userEvent.click(screen.getByText('c2'))

    expect(rows()).toHaveLength(0)
    expect(previewSpy).not.toHaveBeenCalled()
  })

  it('AC3: open, close, open sends one preview request per card', async () => {
    renderList(true)
    expect(previewSpy).toHaveBeenCalledTimes(2)

    await userEvent.click(screen.getByText('c1'))
    await userEvent.click(screen.getByText('c2'))
    await userEvent.click(screen.getByText('c1'))
    await userEvent.click(screen.getByText('c2'))

    expect(previewSpy).toHaveBeenCalledTimes(2)
    expect(previewSpy.mock.calls.map(([arg]) => arg.body.column.config.advancedColumns[0].key).sort()).toEqual(['name', 'price'])
  })
})
