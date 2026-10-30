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
import { act, fireEvent, render, screen } from '@testing-library/react'
import { GridConfigModal } from './grid-config-modal'
import { usePreviewMode } from '@Pimcore/components/preview-mode/preview-mode-provider'

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
jest.mock('@Pimcore/modules/element/listing/decorators/utils/column-configuration/view-layer/components/add-column-controls/add-column-controls', () => ({ AddColumnControls: () => null }))
jest.mock('@Pimcore/modules/element/listing/decorators/utils/column-configuration/view-layer/components/fields-to-add-panel/fields-to-add-panel', () => ({ FieldsToAddPanel: () => null }))
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

let classId = 1
jest.mock('@Pimcore/modules/data-object/listing/decorator/class-definition-selection/context-layer/provider/use-class-definition-selection', () => ({
  useClassDefinitionSelection: () => ({ selectedClassDefinition: { id: classId, name: 'Car' } })
}))

const mockProbe = (): React.JSX.Element => {
  const { item, setItem } = usePreviewMode()
  return (
    <>
      <span data-testid="picked">{item === null ? 'none' : String(item.data.id)}</span>
      <button onClick={ () => { setItem({ data: { id: 5, fullpath: '/z' } }) } }>pick</button>
    </>
  )
}

const props: any = {
  open: true,
  availableColumnsTree: [],
  onColumnSelect: jest.fn(),
  onAddAdvancedColumn: jest.fn(),
  onCancelClick: jest.fn(),
  onApplyClick: jest.fn()
}

// The probe renders as the (mocked) list so it sits inside the modal's PreviewModeProvider
jest.mock('./grid-config-list', () => ({ GridConfigList: () => mockProbe() }))

describe('GridConfigModal preview mode', () => {
  beforeEach(() => {
    classId = 1
  })

  it('AC1/AC2: shows the switch, off, without the bar', () => {
    render(<GridConfigModal { ...props } />)
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false')
    expect(screen.queryByText('preview-mode.preview-item')).not.toBeInTheDocument()
  })

  it('AC3: shows the bar with the first row preselected once switched on', () => {
    render(<GridConfigModal { ...props } />)
    fireEvent.click(screen.getByRole('switch'))
    expect(screen.getByText('preview-mode.preview-item')).toBeInTheDocument()
    expect(screen.getByText(/ID: 9/)).toBeInTheDocument()
  })

  it('AC5: clears the picked item when the class definition changes', () => {
    const { rerender } = render(<GridConfigModal { ...props } />)
    act(() => { fireEvent.click(screen.getByText('pick')) })
    expect(screen.getByTestId('picked')).toHaveTextContent('5')

    classId = 2
    rerender(<GridConfigModal { ...props } />)
    expect(screen.getByTestId('picked')).toHaveTextContent('none')
  })
})
