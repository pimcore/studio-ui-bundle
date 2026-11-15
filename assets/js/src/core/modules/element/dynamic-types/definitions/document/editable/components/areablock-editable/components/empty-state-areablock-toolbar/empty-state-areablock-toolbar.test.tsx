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
import { type AreablockClipboardItem } from '../../utils/areablock-clipboard'
import { EmptyStateAreablockToolbar, type EmptyStateAreablockToolbarProps } from './empty-state-areablock-toolbar'

const useAreablockClipboard = jest.fn<AreablockClipboardItem | null, []>(() => null)

jest.mock('../../hooks/use-areablock-clipboard', () => ({
  useAreablockClipboard: () => useAreablockClipboard()
}))

jest.mock('../../hooks/use-areablock-menu', () => ({
  useAreablockMenu: () => ({ menuItems: [] })
}))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

// antd-style is untranspiled ESM that jest cannot parse — every `.styles.ts` in the
// render tree goes through this factory, so stub it once instead of per file.
jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => ({
  createStyles: () => () => ({ styles: {}, cx: (...classNames: unknown[]) => classNames.filter(Boolean).join(' '), theme: {} })
}))

jest.mock('@Pimcore/components/icon-button/icon-button', () => ({
  IconButton: (props: { 'aria-label'?: string, disabled?: boolean, onClick?: () => void }) => (
    <button
      aria-label={ props['aria-label'] }
      disabled={ props.disabled }
      onClick={ props.onClick }
    />
  )
}))

jest.mock('@Pimcore/components/toolstrip/tool-strip', () => ({
  ToolStrip: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}))

jest.mock('@sdk/components', () => ({
  Dropdown: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  Space: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}))

jest.mock('../../../inheritance-wrapper/inheritance-wrapper', () => ({
  InheritanceWrapper: ({ children }: { children: React.ReactNode }) => <>{children}</>
}))

jest.mock('../../../../helpers/editable-dropzone-sorting/components/editable-dropzone/editable-dropzone', () => ({
  EditableDropzone: () => null
}))

jest.mock('../../../../helpers/editable-dropzone-sorting/components/editable-dropzone/dropzone-content', () => ({
  EditableDropzoneContent: () => null
}))

const textClipboardItem: AreablockClipboardItem = {
  identifier: { name: 'content:1.text', realName: 'text', key: '1' },
  type: 'text',
  values: {}
}

const renderToolbar = (overrides: Partial<EmptyStateAreablockToolbarProps> = {}): EmptyStateAreablockToolbarProps => {
  const props: EmptyStateAreablockToolbarProps = {
    areaTypes: [{ name: 'Text', type: 'text' }],
    config: { types: [{ name: 'Text', type: 'text' }, { name: 'Image', type: 'image' }] },
    onClick: jest.fn(async () => {}),
    onPasteArea: jest.fn(),
    ...overrides
  }

  render(<EmptyStateAreablockToolbar { ...props } />)

  return props
}

const getPasteButton = (): HTMLButtonElement => screen.getByRole('button', { name: 'areablock.paste' })

describe('EmptyStateAreablockToolbar', () => {
  beforeEach(() => {
    useAreablockClipboard.mockReturnValue(null)
  })

  it('renders the add and paste buttons', () => {
    renderToolbar()

    expect(screen.getByRole('button', { name: 'areablock.new' })).toBeTruthy()
    expect(getPasteButton()).toBeTruthy()
  })

  it('disables paste when the clipboard is empty', () => {
    renderToolbar()

    expect(getPasteButton().disabled).toBe(true)
  })

  it('pastes at the first position when the clipboard holds an allowed type', () => {
    useAreablockClipboard.mockReturnValue(textClipboardItem)

    const { onPasteArea } = renderToolbar()

    expect(getPasteButton().disabled).toBe(false)

    fireEvent.click(getPasteButton())

    expect(onPasteArea).toHaveBeenCalledTimes(1)
    expect(onPasteArea).toHaveBeenCalledWith(null)
  })

  it('disables paste when the clipboard type is not available in this areablock', () => {
    useAreablockClipboard.mockReturnValue({ ...textClipboardItem, type: 'video' })

    renderToolbar()

    expect(getPasteButton().disabled).toBe(true)
  })

  it('disables paste when the clipboard type is excluded by the allowed list', () => {
    useAreablockClipboard.mockReturnValue(textClipboardItem)

    renderToolbar({ config: { allowed: ['image'], types: [{ name: 'Text', type: 'text' }, { name: 'Image', type: 'image' }] } })

    expect(getPasteButton().disabled).toBe(true)
  })

  it('disables paste when the areablock limit is already reached', () => {
    useAreablockClipboard.mockReturnValue(textClipboardItem)

    renderToolbar({ config: { limit: 0, types: [{ name: 'Text', type: 'text' }] } })

    expect(getPasteButton().disabled).toBe(true)
  })

  it('does not paste into an inherited areablock', () => {
    useAreablockClipboard.mockReturnValue(textClipboardItem)

    const { onPasteArea } = renderToolbar({ isInherited: true })

    fireEvent.click(getPasteButton())

    expect(onPasteArea).not.toHaveBeenCalled()
  })
})
