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
import { PreviewModeProvider, usePreviewMode } from './preview-mode-provider'
import { PreviewModeSwitch } from './preview-mode-switch'
import { PreviewModeBar } from './preview-mode-bar'
import { ColumnPreview } from './column-preview'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => ({
  createStyles: () => () => ({ styles: { description: 'description' }, cx: () => '', theme: {} }),
  css: () => '',
  cx: () => '',
  keyframes: () => ''
}))

jest.mock('@Pimcore/modules/element/element-selector/provider/element-selector/element-selector-provider', () => ({
  SelectionType: { Disabled: 'disabled', Single: 'single', Multiple: 'multiple' }
}))

const openMock = jest.fn()
const useElementSelectorMock = jest.fn()
jest.mock('@Pimcore/modules/element/element-selector/provider/element-selector/use-element-selector', () => ({
  useElementSelector: (...args: unknown[]) => {
    useElementSelectorMock(...args)
    return { open: openMock }
  }
}))

const picked = { elementType: 'data-object', data: { id: 42, fullpath: '/a/b/c/d' } }

const ModeProbe = (): React.JSX.Element => {
  const { enabled, item, setItem } = usePreviewMode()
  return (
    <>
      <span data-testid="enabled">{String(enabled)}</span>
      <span data-testid="item">{item === null ? 'none' : String(item.data.id)}</span>
      <button onClick={ () => { setItem(picked) } }>pick</button>
    </>
  )
}

beforeEach(() => {
  openMock.mockReset()
  useElementSelectorMock.mockReset()
})

describe('PreviewModeSwitch', () => {
  it('AC1: is off by default and shows the label', () => {
    render(<PreviewModeProvider><PreviewModeSwitch /><ModeProbe /></PreviewModeProvider>)

    expect(screen.getByText('preview-mode.switch')).toBeInTheDocument()
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false')
    expect(screen.getByTestId('enabled')).toHaveTextContent('false')
  })

  it('AC1: is not remembered between mounts (DR-P2)', () => {
    const first = render(<PreviewModeProvider><PreviewModeSwitch /><ModeProbe /></PreviewModeProvider>)
    fireEvent.click(screen.getByRole('switch'))
    expect(screen.getByTestId('enabled')).toHaveTextContent('true')
    first.unmount()

    render(<PreviewModeProvider><PreviewModeSwitch /><ModeProbe /></PreviewModeProvider>)
    expect(screen.getByTestId('enabled')).toHaveTextContent('false')
  })
})

describe('ColumnPreview slot', () => {
  it('AC2/AC4: renders nothing while preview mode is off', () => {
    render(
      <PreviewModeProvider>
        <ColumnPreview source={ { isLoading: false, value: <span>the value</span> } } />
      </PreviewModeProvider>
    )

    expect(screen.queryByText('the value')).not.toBeInTheDocument()
  })

  it('AC4: renders the children render-prop lazily only while on (so nothing is fetched while off)', () => {
    const fetcher = jest.fn(() => <span>fetched</span>)
    render(
      <PreviewModeProvider>
        <PreviewModeSwitch />
        <ColumnPreview>{ fetcher }</ColumnPreview>
      </PreviewModeProvider>
    )
    expect(fetcher).not.toHaveBeenCalled()

    fireEvent.click(screen.getByRole('switch'))
    expect(screen.getByText('fetched')).toBeInTheDocument()
  })

  it('AC4: shows loading, value and error from the caller-provided source', () => {
    const { rerender } = render(
      <PreviewModeProvider defaultEnabled>
        <ColumnPreview source={ { isLoading: true } } />
      </PreviewModeProvider>
    )
    expect(screen.getByTestId('preview-mode-column-preview-loading')).toBeInTheDocument()

    rerender(
      <PreviewModeProvider defaultEnabled>
        <ColumnPreview source={ { isLoading: false, value: <span>the value</span> } } />
      </PreviewModeProvider>
    )
    expect(screen.getByText('the value')).toBeInTheDocument()

    rerender(
      <PreviewModeProvider defaultEnabled>
        <ColumnPreview source={ { isLoading: false, error: 'boom' } } />
      </PreviewModeProvider>
    )
    expect(screen.getByText('boom')).toBeInTheDocument()
  })
})

describe('PreviewModeBar', () => {
  it('AC3: shows ID and last two path parts, full path in a tooltip, and opens a single data-object selector for the class', async () => {
    render(
      <PreviewModeProvider defaultEnabled>
        <PreviewModeBar allowedClasses={ ['Car'] } />
        <ModeProbe />
      </PreviewModeProvider>
    )
    act(() => { fireEvent.click(screen.getByText('pick')) })

    const info = screen.getByText(/ID: 42/)
    expect(info).toHaveTextContent('c/ d')
    expect(info).not.toHaveTextContent('/a/b')
    expect(info.className).toContain('description')

    fireEvent.mouseEnter(info)
    // full path appears as the tooltip title
    expect(await screen.findByText('/a/b/c/d')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'preview-mode.preview-item' }))
    expect(openMock).toHaveBeenCalled()
    const options = useElementSelectorMock.mock.calls[0][0]
    expect(options.selectionType).toBe('single')
    expect(options.areas).toEqual({ object: true, asset: false, document: false })
    expect(options.config.objects.allowedClasses).toEqual(['Car'])
  })

  it('AC3/DR-P3: shows the fallback item until one is picked, picking replaces it', () => {
    render(
      <PreviewModeProvider
        defaultEnabled
        fallbackItem={ { id: 7, fullpath: '/x/y' } }
      >
        <PreviewModeBar />
        <ModeProbe />
      </PreviewModeProvider>
    )
    expect(screen.getByText(/ID: 7/)).toBeInTheDocument()

    act(() => { fireEvent.click(screen.getByText('pick')) })
    expect(screen.getByText(/ID: 42/)).toBeInTheDocument()
    expect(screen.queryByText(/ID: 7/)).not.toBeInTheDocument()
  })

  it('AC3/DR-P3: says no item is available when nothing is picked and there is no fallback', () => {
    render(<PreviewModeProvider defaultEnabled><PreviewModeBar /></PreviewModeProvider>)
    expect(screen.getByText('preview-mode.no-item')).toBeInTheDocument()
  })

  it('AC3: onFinish stores the picked item', () => {
    render(<PreviewModeProvider defaultEnabled><PreviewModeBar /><ModeProbe /></PreviewModeProvider>)
    const { onFinish } = useElementSelectorMock.mock.calls[0][0]
    act(() => { onFinish({ items: [picked] }) })
    expect(screen.getByTestId('item')).toHaveTextContent('42')
  })
})

describe('PreviewModeProvider', () => {
  it('AC5: clears the picked item when resetKey changes', () => {
    const { rerender } = render(<PreviewModeProvider resetKey={ 1 }><ModeProbe /></PreviewModeProvider>)
    act(() => { fireEvent.click(screen.getByText('pick')) })
    expect(screen.getByTestId('item')).toHaveTextContent('42')

    rerender(<PreviewModeProvider resetKey={ 1 }><ModeProbe /></PreviewModeProvider>)
    expect(screen.getByTestId('item')).toHaveTextContent('42')

    rerender(<PreviewModeProvider resetKey={ 2 }><ModeProbe /></PreviewModeProvider>)
    expect(screen.getByTestId('item')).toHaveTextContent('none')
  })

  it('AC6: works without any data-object grid providers (covered by every test in this file, which mounts only the shared module)', () => {
    render(<PreviewModeProvider><PreviewModeSwitch /><PreviewModeBar /><ColumnPreview source={ { isLoading: false } } /></PreviewModeProvider>)
    expect(screen.getByRole('switch')).toBeInTheDocument()
  })
})
