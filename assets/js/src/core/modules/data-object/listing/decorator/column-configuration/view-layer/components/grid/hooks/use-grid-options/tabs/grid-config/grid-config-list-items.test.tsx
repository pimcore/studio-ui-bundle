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
import { buildAdvancedBody, renderColumnTitle, renderRightToolbar } from './grid-config-list-items'
import { truncatePath } from '@Pimcore/components/preview-mode/preview-mode-bar'

jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => ({
  createStyles: () => () => ({ styles: {}, cx: (...classNames: unknown[]) => classNames.filter(Boolean).join(' '), theme: {} }),
  css: () => '',
  cx: () => '',
  keyframes: () => ''
}))
jest.mock('@Pimcore/components/icon-button/icon-button', () => ({
  IconButton: ({ tooltip, onClick }: any) => <button onClick={ onClick }>{tooltip.title}</button>
}))
jest.mock('@Pimcore/components/space/space', () => ({ Space: ({ children }: any) => <div data-testid='toolbar'>{children}</div> }))
jest.mock('@Pimcore/components/tooltip/tooltip', () => ({ Tooltip: ({ children, title }: any) => <span data-title={ title }>{children}</span> }))
jest.mock('@Pimcore/modules/element/listing/decorators/utils/column-configuration/view-layer/components/search-mode-column-badge/search-mode-column-badge', () => ({
  SearchModeColumnBadge: () => <i>badge</i>
}))
jest.mock('./forms/advanced-column-form/advanced-column-form', () => ({ AdvancedColumnForm: () => <i>form</i> }))
jest.mock('./forms/advanced-column-form/preview/preview', () => ({ Preview: () => <i>preview</i> }))
jest.mock('@Pimcore/components/preview-mode/column-preview', () => ({ ColumnPreview: ({ children }: any) => <>{children()}</> }))
jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))
jest.mock('@Pimcore/modules/element/components/language-selection/permission-based-language-selection-control', () => ({
  PermissionBasedLanguageSelectionControl: () => null
}))
jest.mock('@Pimcore/components/language-selection/provider/use-language-selection', () => ({ useLanguageSelection: jest.fn() }))
jest.mock('@Pimcore/modules/element/element-selector/provider/element-selector/element-selector-provider', () => ({ SelectionType: {} }))
jest.mock('@Pimcore/modules/element/element-selector/provider/element-selector/use-element-selector', () => ({ useElementSelector: jest.fn() }))

const t = ((key: string) => `t:${key}`) as any
const simple: any = { key: 'title', group: ['a', 'b'], config: { fieldDefinition: { title: 'Field title' } } }
const plain: any = { key: 'id', config: {} }
const advanced: any = { key: 'advanced', __meta: { advancedColumnConfig: { title: 'Mine' } } }

describe('AC1: the list helpers render the same items as before', () => {
  it('AC1: a simple column shows its translated field title with the group as tooltip', () => {
    render(<>{renderColumnTitle(simple, t)}</>)
    expect(screen.getByText('t:Field title').closest('span[data-title]')?.getAttribute('data-title')).toBe('a/b')
  })

  it('AC1: a simple column without field definition falls back to its key', () => {
    render(<>{renderColumnTitle(plain, t)}</>)
    expect(screen.getByText('t:id')).toBeTruthy()
  })

  it('AC1: an advanced column shows its title, or the placeholder', () => {
    const { unmount } = render(<>{renderColumnTitle(advanced, t)}</>)
    expect(screen.getByText('Mine')).toBeTruthy()
    unmount()
    render(<>{renderColumnTitle({ key: 'advanced' } as any, t)}</>)
    expect(screen.getByText('Add a title')).toBeTruthy()
  })

  it('AC1: an open advanced item has the form body, a collapsed one adds the preview only while preview is on', () => {
    const options = { column: advanced, uniqueId: 'u1', onChange: jest.fn() }
    expect(buildAdvancedBody({ ...options, previewEnabled: false })).not.toHaveProperty('collapsedBody')
    const withPreview = buildAdvancedBody({ ...options, previewEnabled: true })
    expect(withPreview).toHaveProperty('body')
    render(<>{withPreview.body}{withPreview.collapsedBody}</>)
    expect(screen.getByText('form')).toBeTruthy()
    expect(screen.getByText('preview')).toBeTruthy()
  })

  it('AC1: the toolbar has convert (when convertible), language and remove; search-mode columns only the badge', () => {
    const onConvert = jest.fn()
    const onRemove = jest.fn()
    const { unmount } = render(<>{renderRightToolbar({ column: plain, uniqueId: 'u', t, isConvertible: true, languageSelection: <b>lang</b>, onConvert, onRemove })}</>)
    screen.getByText('t:listing.grid-config.convert-to-advanced').click()
    screen.getByText('t:remove').click()
    expect(onConvert).toHaveBeenCalledTimes(1)
    expect(onRemove).toHaveBeenCalledTimes(1)
    expect(screen.getByText('lang')).toBeTruthy()
    unmount()

    render(<>{renderRightToolbar({ column: plain, uniqueId: 'u', t, isConvertible: false, languageSelection: null, onConvert, onRemove })}</>)
    expect(screen.queryByText('t:listing.grid-config.convert-to-advanced')).toBeNull()
  })
})

describe('AC2: the preview bar shortens paths as before', () => {
  it('AC2: one, two and five parts', () => {
    expect(truncatePath('/a')).toBe('a')
    expect(truncatePath('/a/b')).toBe('a/ b')
    expect(truncatePath('/a/b/c/d/e')).toBe('.../ d/ e')
  })
})
