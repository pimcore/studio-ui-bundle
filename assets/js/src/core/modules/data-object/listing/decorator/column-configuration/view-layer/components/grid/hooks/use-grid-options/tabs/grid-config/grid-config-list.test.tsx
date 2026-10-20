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
import { PreviewModeProvider } from '@Pimcore/components/preview-mode/preview-mode-provider'
import { GridConfigList } from './grid-config-list'

jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))
jest.mock('@Pimcore/components/stack-list/stack-list', () => ({
  StackList: ({ items }: any) => <>{items.map((item: any) => <div key={ item.id }>{item.children}{item.body}</div>)}</>
}))
jest.mock('@Pimcore/components/icon-button/icon-button', () => ({ IconButton: () => null }))
jest.mock('@Pimcore/components/space/space', () => ({ Space: ({ children }: any) => <div>{children}</div> }))
jest.mock('@Pimcore/components/tooltip/tooltip', () => ({ Tooltip: ({ children }: any) => <>{children}</> }))
jest.mock('@Pimcore/modules/element/components/language-selection/permission-based-language-selection-control', () => ({
  PermissionBasedLanguageSelectionControl: () => null
}))
jest.mock('@Pimcore/modules/element/listing/decorators/utils/column-configuration/view-layer/components/search-mode-column-badge/search-mode-column-badge', () => ({
  SearchModeColumnBadge: () => null
}))
jest.mock('./forms/advanced-column-form/advanced-column-form', () => ({ AdvancedColumnForm: () => <div data-testid="advanced-form" /> }))
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
jest.mock('./simple-column-preview/simple-column-preview', () => ({
  SimpleColumnPreviewsProvider: ({ children }: any) => <>{children}</>,
  SimpleColumnPreview: ({ column }: any) => <div data-testid={ `simple-preview-${column.key}` } />
}))

describe('GridConfigList simple column preview wiring', () => {
  it('renders a preview slot for simple columns only while preview mode is on', () => {
    render(
      <PreviewModeProvider defaultEnabled>
        <GridConfigList />
      </PreviewModeProvider>
    )

    expect(screen.getByTestId('simple-preview-name')).toBeInTheDocument()
    expect(screen.queryByTestId('simple-preview-advanced')).not.toBeInTheDocument()
  })

  it('renders no preview slot while preview mode is off', () => {
    render(
      <PreviewModeProvider>
        <GridConfigList />
      </PreviewModeProvider>
    )

    expect(screen.queryByTestId('simple-preview-name')).not.toBeInTheDocument()
  })
})
