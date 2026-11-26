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
import { SettingsProvider } from '@Pimcore/modules/asset/listing/decorator/column-configuration/view-layer/components/sidebar/tabs/grid-config/povider/settings/settings-provider'
import { GridConfigModal } from './grid-config-modal'

// the bar's language switch pulls in the whole app; its own test lives in preview-mode-design.test.tsx
jest.mock('@Pimcore/modules/element/components/language-selection/permission-based-language-selection-control', () => ({
  PermissionBasedLanguageSelectionControl: () => null
}))
jest.mock('@Pimcore/components/language-selection/provider/use-language-selection', () => ({
  useLanguageSelection: () => ({ currentLanguage: 'en' })
}))

jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))
jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => ({
  createStyles: () => () => ({ styles: {}, cx: () => '', theme: {} }),
  css: () => '',
  cx: () => '',
  keyframes: () => ''
}))
jest.mock('./grid-config-modal.styles', () => ({ useStyles: () => ({ styles: {} }) }))
jest.mock('@Pimcore/components/modal/modal', () => ({
  Modal: ({ children, title }: any) => <div>{title}{children}</div>
}))
jest.mock('@Pimcore/components/modal/modal-title/modal-title', () => ({ ModalTitle: ({ children }: any) => <div>{children}</div> }))
jest.mock('@Pimcore/components/content-layout/content-layout', () => ({ ContentLayout: ({ children }: any) => <div>{children}</div> }))
jest.mock('@Pimcore/components/toolbar/toolbar', () => ({ Toolbar: ({ children }: any) => <div>{children}</div> }))
jest.mock('@Pimcore/components/content/content', () => ({ Content: ({ children }: any) => <div>{children}</div> }))
jest.mock('@Pimcore/components/space/space', () => ({ Space: ({ children }: any) => <div>{children}</div> }))
jest.mock('@Pimcore/components/icon-button/icon-button', () => ({ IconButton: () => null }))
jest.mock('@Pimcore/modules/element/listing/decorators/utils/column-configuration/view-layer/components/add-column-controls/add-column-controls', () => ({ AddColumnControls: () => <div data-testid="add-column-controls" /> }))
jest.mock('@Pimcore/modules/element/listing/decorators/utils/column-configuration/view-layer/components/fields-to-add-panel/fields-to-add-panel', () => ({ FieldsToAddPanel: () => <div data-testid="fields-to-add" /> }))
jest.mock('./forms/advanced-column-form/pipeline-layout-provider', () => ({ PipelineLayoutProvider: ({ children }: any) => <>{children}</> }))
jest.mock('@Pimcore/modules/element/element-selector/provider/element-selector/use-element-selector', () => ({
  useElementSelector: () => ({ open: jest.fn() })
}))
jest.mock('@Pimcore/modules/element/element-selector/provider/element-selector/element-selector-provider', () => ({
  SelectionType: { Single: 'single' }
}))
jest.mock('@Pimcore/modules/element/listing/abstract/data-layer/provider/data/use-data', () => ({
  useData: () => ({ data: { items: [{ id: 9, fullpath: '/p/q/r' }] } })
}))

const classId = 1
jest.mock('@Pimcore/modules/data-object/listing/decorator/class-definition-selection/context-layer/provider/use-class-definition-selection', () => ({
  useClassDefinitionSelection: () => ({ selectedClassDefinition: { id: classId, name: 'Car' } })
}))

jest.mock('./grid-config-list', () => ({ GridConfigList: () => <div data-testid="column-list" /> }))

const onOpenChange = jest.fn()
const props: any = {
  open: true,
  availableColumnsTree: [],
  onColumnSelect: jest.fn(),
  onAddAdvancedColumn: jest.fn(),
  onCancelClick: jest.fn(),
  onApplyClick: jest.fn(),
  onOpenChange
}

const renderModal = (readOnly: boolean): void => {
  render(
    <SettingsProvider settings={ { saveEnabled: false, readOnly } }>
      <GridConfigModal { ...props } />
    </SettingsProvider>
  )
}

describe('GridConfigModal in a read-only listing', () => {
  beforeEach(() => { onOpenChange.mockClear() })

  it('opens on the columns with nothing to add, discard or apply, and closes', () => {
    renderModal(true)

    expect(screen.getByTestId('column-list')).toBeInTheDocument()
    expect(screen.queryByTestId('fields-to-add')).not.toBeInTheDocument()
    expect(screen.queryByTestId('add-column-controls')).not.toBeInTheDocument()
    expect(screen.queryByText('grid-config.apply-changes')).not.toBeInTheDocument()
    expect(screen.queryByText('grid-config.discard-all-changes')).not.toBeInTheDocument()

    fireEvent.click(screen.getByTestId('listing-grid-config-modal-close-button'))
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it('keeps adding and applying in an editable listing', () => {
    renderModal(false)

    expect(screen.getByTestId('fields-to-add')).toBeInTheDocument()
    expect(screen.getByTestId('add-column-controls')).toBeInTheDocument()
    expect(screen.getByText('grid-config.apply-changes')).toBeInTheDocument()
    expect(screen.queryByTestId('listing-grid-config-modal-close-button')).not.toBeInTheDocument()
  })
})
