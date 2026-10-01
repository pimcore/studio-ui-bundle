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
import { buildColumnStackItems } from './build-column-stack-items'
import { type AdvancedEditorColumn } from './types'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

// The advanced-column pipeline form reaches antd-style's untranspiled ESM core; irrelevant to
// the readOnly wiring under test here (mirrors base-column-editor.test.tsx's own mock).
jest.mock('./column-editor-item', () => ({
  ColumnEditorItemBody: ({ readOnly }: { readOnly?: boolean }) => (
    <div data-testid='column-editor-item-body'>{ String(readOnly) }</div>
  )
}))

jest.mock('./column-locale-control', () => ({
  ColumnLocaleControl: () => <div data-testid='column-locale-control' />
}))

// Mirrors base-column-editor.test.tsx's own mocks: these reach antd-style/icon DI, irrelevant to
// the readOnly wiring under test here.
jest.mock('@Pimcore/components/space/space', () => ({
  Space: ({ children }: { children?: React.ReactNode }) => <div>{ children }</div>
}))
jest.mock('@Pimcore/components/icon-button/icon-button', () => ({
  IconButton: ({ 'aria-label': ariaLabel }: { 'aria-label'?: string }) => (
    <button aria-label={ ariaLabel }>icon-button</button>
  )
}))
jest.mock('@Pimcore/components/spin/spin', () => ({ Spin: () => <div data-testid='spin' /> }))

const simpleColumn: AdvancedEditorColumn = {
  _id: 'col-1',
  key: 'name',
  fieldtype: 'input',
  type: 'input'
}

const advancedColumn: AdvancedEditorColumn = {
  _id: 'col-2',
  key: 'my-advanced',
  fieldtype: 'advanced',
  type: 'dataobject.advanced',
  pipelineConfig: {},
  pipeline: { title: 'My advanced column' },
  isNew: false
}

const baseParams = {
  resolvedClassId: 'CAR',
  compact: false,
  entity: 'CAR',
  objectId: null,
  sourceFieldsRegistryId: 'sourceFields',
  transformersRegistryId: 'transformers',
  onPipelineChange: jest.fn(),
  onLocaleChange: jest.fn(),
  onRemove: jest.fn(),
  t: ((key: string) => key) as any
}

describe('buildColumnStackItems', () => {
  it('marks items sortable and renders the remove/locale toolbar by default', () => {
    const items = buildColumnStackItems({ ...baseParams, draft: [simpleColumn], readOnly: false })

    expect(items).toHaveLength(1)
    expect(items[0].sortable).toBe(true)
    expect(items[0].renderRightToolbar).toBeDefined()

    render(<>{ items[0].renderRightToolbar }</>)
    expect(screen.getByLabelText('remove')).toBeInTheDocument()
  })

  it('disables reordering and hides the remove/locale toolbar when readOnly', () => {
    const items = buildColumnStackItems({ ...baseParams, draft: [simpleColumn], readOnly: true })

    expect(items[0].sortable).toBe(false)
    expect(items[0].renderRightToolbar).toBeUndefined()
  })

  it('passes readOnly through to the advanced column pipeline form body', () => {
    const items = buildColumnStackItems({ ...baseParams, draft: [advancedColumn], readOnly: true })

    render(<>{ items[0].body }</>)
    expect(screen.getByTestId('column-editor-item-body')).toHaveTextContent('true')
  })

  it('leaves the advanced column pipeline form body interactive by default', () => {
    const items = buildColumnStackItems({ ...baseParams, draft: [advancedColumn], readOnly: false })

    render(<>{ items[0].body }</>)
    expect(screen.getByTestId('column-editor-item-body')).toHaveTextContent('false')
  })

  it('offers the locale control for localizable ordinary columns, not for non-localizable ones', () => {
    const localized = buildColumnStackItems({
      ...baseParams, draft: [{ ...simpleColumn, localizable: true }], readOnly: false
    })
    const plain = buildColumnStackItems({ ...baseParams, draft: [simpleColumn], readOnly: false })

    render(<>{ localized[0].renderRightToolbar }</>)
    expect(screen.getByTestId('column-locale-control')).toBeInTheDocument()

    render(<>{ plain[0].renderRightToolbar }</>)
    expect(screen.getAllByTestId('column-locale-control')).toHaveLength(1)
  })
})
