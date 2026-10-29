/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

// The SDK barrel and the text component pull in untranspiled ESM; the test only cares which
// editor the string filter picks.
jest.mock('@sdk/components', () => ({
  TextArea: ({ autoSize, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { autoSize?: unknown }) => (
    <textarea
      data-testid="list-editor"
      { ...props }
    />
  )
}))

jest.mock('./dynamic-type-field-filter-text-component', () => ({
  DynamicTypeFieldFilterTextComponent: () => <input data-testid="single-line-editor" />
}))

jest.mock('i18next', () => ({ t: (key: string) => key }))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

// eslint-disable-next-line import/first
import React from 'react'
// eslint-disable-next-line import/first
import { fireEvent, render, screen } from '@testing-library/react'
// eslint-disable-next-line import/first
import { DynamicFilterProvider } from '@Pimcore/components/dynamic-filter/provider/dynamic-filter-provider'
// eslint-disable-next-line import/first
import { MultiValueFilterSupportProvider } from '../utils/multi-value-filter-support'
// eslint-disable-next-line import/first
import { DynamicTypeFieldFilterStringComponent } from './dynamic-type-field-filter-string-component'

const renderFilter = (children: React.ReactNode, data: unknown = '', handlers: { onChange?: (data: unknown) => void, onCommit?: (data: unknown) => void } = {}): void => {
  render(
    <DynamicFilterProvider
      data={ data }
      id="test"
      onChange={ handlers.onChange }
      onCommit={ handlers.onCommit }
      translationKey="test"
      type="test"
    >
      {children}
    </DynamicFilterProvider>
  )
}

describe('DynamicTypeFieldFilterStringComponent', () => {
  it('keeps the single-line input where the host does not support lists', () => {
    renderFilter(<DynamicTypeFieldFilterStringComponent />)

    expect(screen.getByTestId('single-line-editor')).toBeTruthy()
    expect(screen.queryByTestId('list-editor')).toBeNull()
  })

  it('offers the list editor where the host supports lists', () => {
    renderFilter(
      <MultiValueFilterSupportProvider supported>
        <DynamicTypeFieldFilterStringComponent />
      </MultiValueFilterSupportProvider>
    )

    expect(screen.getByTestId('list-editor')).toBeTruthy()
    expect(screen.queryByTestId('single-line-editor')).toBeNull()
  })

  it('keeps the single-line input where a nested host opts out again', () => {
    renderFilter(
      <MultiValueFilterSupportProvider supported>
        <MultiValueFilterSupportProvider supported={ false }>
          <DynamicTypeFieldFilterStringComponent />
        </MultiValueFilterSupportProvider>
      </MultiValueFilterSupportProvider>
    )

    expect(screen.getByTestId('single-line-editor')).toBeTruthy()
    expect(screen.queryByTestId('list-editor')).toBeNull()
  })

  describe('restored saved filters', () => {
    const renderListEditor = (data: unknown, handlers: { onChange?: (data: unknown) => void, onCommit?: (data: unknown) => void }): HTMLTextAreaElement => {
      renderFilter(
        <MultiValueFilterSupportProvider supported>
          <DynamicTypeFieldFilterStringComponent />
        </MultiValueFilterSupportProvider>,
        data,
        handlers
      )

      return screen.getByTestId<HTMLTextAreaElement>('list-editor')
    }

    it('shows a restored list one value per line and hands it back untouched when the editor is left', () => {
      const onChange = jest.fn()
      const list = ['A-1', 'B-2']
      const editor = renderListEditor(list, { onChange })

      expect(editor.value).toBe('A-1\nB-2')

      fireEvent.blur(editor)

      expect(onChange).toHaveBeenCalledWith(list)
    })

    it('keeps a restored single-value list exact when the editor is left or confirmed', () => {
      const onChange = jest.fn()
      const onCommit = jest.fn()
      const singleton = ['A-1']
      const editor = renderListEditor(singleton, { onChange, onCommit })

      expect(editor.value).toBe('A-1')

      fireEvent.blur(editor)
      expect(onChange).toHaveBeenCalledWith(singleton)

      fireEvent.keyDown(editor, { key: 'Enter' })
      expect(onCommit).toHaveBeenCalledWith(singleton)
    })

    it('hands back the text once a restored list was edited', () => {
      const onCommit = jest.fn()
      const editor = renderListEditor(['A-1', 'B-2'], { onCommit })

      fireEvent.change(editor, { target: { value: 'A-1\nB-2\nC-3' } })
      fireEvent.keyDown(editor, { key: 'Enter' })

      expect(onCommit).toHaveBeenCalledWith('A-1\nB-2\nC-3')
    })

    it('does not apply on Shift+Enter', () => {
      const onCommit = jest.fn()
      const editor = renderListEditor('A-1', { onCommit })

      fireEvent.keyDown(editor, { key: 'Enter', shiftKey: true })

      expect(onCommit).not.toHaveBeenCalled()
    })
  })
})
