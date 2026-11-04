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
import { GridConfigList } from './grid-config-list'

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
jest.mock('@Pimcore/components/language-selection', () => ({ useLanguageSelection: () => ({ currentLanguage: 'en' }) }))
jest.mock('@Pimcore/modules/element/listing/abstract/data-layer/provider/data/use-data', () => ({
  useData: () => ({ data: { items: [{ id: 9 }] } })
}))
jest.mock('./forms/advanced-column-form/preview/preview-item-provider', () => ({ usePreviewItem: () => ({ item: null }) }))
jest.mock('./forms/advanced-column-form/preview/preview-value', () => ({
  PreviewValue: ({ value }: any) => <span>{String(value)}</span>
}))
jest.mock('@Pimcore/modules/data-object/listing/decorator/class-definition-selection/context-layer/provider/use-class-definition-selection', () => ({
  useClassDefinitionSelection: () => ({ selectedClassDefinition: { id: 'CAR', name: 'Car' } })
}))
jest.mock('@Pimcore/modules/element/listing/abstract/settings/use-settings', () => ({
  useSettings: () => ({ useGridOptions: () => ({ transformGridColumn: () => ({ header: 'x', meta: {} }) }), useColumnMapper: () => jest.requireActual('@Pimcore/modules/data-object/listing/column-mapper/use-column-mapper').useDataObjectColumnMapper() })
}))
jest.mock('@Pimcore/components/grid/grid', () => ({ Grid: () => <div data-testid="grid" /> }))
jest.mock('@Pimcore/components/grid-content-renderer/grid-content-renderer', () => ({
  GridContentRenderer: ({ children }: any) => <>{children}</>
}))

// the open advanced form carries its own Preview row, exactly as the real AdvancedColumnForm does
jest.mock('./forms/advanced-column-form/advanced-column-form', () => {
  const { ColumnPreview } = jest.requireActual('@Pimcore/components/preview-mode/column-preview')
  const { Preview } = jest.requireActual('./forms/advanced-column-form/preview/preview')
  return {
    AdvancedColumnForm: ({ column }: any) => (
      <div data-testid={ `form-${column.__meta.uniqueId}` }>
        <ColumnPreview>{() => <Preview column={ column } />}</ColumnPreview>
      </div>
    )
  }
})

const mkAdvanced = (id: string, field: string): any => ({
  key: 'advanced',
  type: 'dataobject.advanced',
  config: {},
  localizable: false,
  __meta: { uniqueId: id, advancedColumnConfig: { title: id, advancedColumns: [{ key: field }] } }
})
const mkSimple = (id: string, key: string): any => ({
  key,
  type: 'dataobject.adapter',
  config: {},
  localizable: false,
  __meta: { uniqueId: id }
})

jest.mock('./hooks/use-grid-config', () => ({
  useGridConfig: () => ({ setColumns: jest.fn(), columns: mockColumns })
}))
let mockColumns: any[] = []

// every preview request stays pending
jest.mock('@Pimcore/modules/data-object/data-object-api-slice.gen', () => ({
  useDataObjectGetGridQuery: () => ({ data: undefined, currentData: undefined, isLoading: true, isFetching: true, error: undefined }),
  useDataObjectGetGridPreviewQuery: () => ({ data: undefined, isLoading: true, error: undefined })
}))

const renderList = (): void => {
  render(
    <PreviewModeProvider
      defaultEnabled
      fallbackItem={ { id: 9 } }
    >
      <GridConfigList />
    </PreviewModeProvider>
  )
}

const rows = (): HTMLElement[] => screen.queryAllByTestId('preview-mode-column-preview-row')
const labels = (): HTMLElement[] => screen.queryAllByText('preview-mode.preview')

describe('GridConfigList column preview while loading', () => {
  it('AC1: a simple column with a pending preview request shows one Preview row and one label', () => {
    mockColumns = [mkSimple('s1', 'name')]
    renderList()

    expect(rows()).toHaveLength(1)
    expect(labels()).toHaveLength(1)
    expect(rows()[0].querySelectorAll('.ant-spin')).toHaveLength(1)
  })

  it('AC2: an open advanced card with a pending preview request shows one Preview label', () => {
    mockColumns = [mkAdvanced('a1', 'name')]
    renderList()

    expect(screen.getByTestId('form-a1')).toBeInTheDocument()
    expect(rows()).toHaveLength(1)
    expect(labels()).toHaveLength(1)
  })

  it('AC2: a collapsed advanced card with a pending preview request shows one Preview label', async () => {
    mockColumns = [mkAdvanced('a1', 'name')]
    renderList()
    await userEvent.click(screen.getByText('a1'))

    const visible = rows().filter((row) => row.closest('.ant-collapse-content-hidden') === null)
    expect(visible).toHaveLength(1)
    expect(labels().filter((el) => el.closest('.ant-collapse-content-hidden') === null)).toHaveLength(1)
  })
})
