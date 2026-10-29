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
import { render } from '@testing-library/react'
import { useAreablockMenu, type UseAreablockMenuReturn } from './use-areablock-menu'
import { type AreaInsertPosition, type AreablockEditableConfig } from '../areablock-editable'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

// The menu item labels pull in IconButton, and through it antd-style, which is
// untranspiled ESM that jest cannot parse. Stub the style factory at the root of
// that chain; these tests only read the label props, never render them.
jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => ({
  createStyles: () => () => ({ styles: {}, cx: (...classNames: unknown[]) => classNames.filter(Boolean).join(' '), theme: {} })
}))

type MenuItems = NonNullable<UseAreablockMenuReturn['menuItems']>
type OnAddArea = (areaType: string, position: AreaInsertPosition) => void

interface MenuItemLabelProps {
  tooltipTitle: React.ReactNode
  onInsert?: (position: AreaInsertPosition) => void
}

const getMenuItems = (config?: AreablockEditableConfig, options?: { onAddArea?: OnAddArea, showInsertPosition?: boolean }): MenuItems => {
  let result: UseAreablockMenuReturn['menuItems']

  const Probe = (): null => {
    result = useAreablockMenu({
      config,
      onAddArea: options?.onAddArea ?? jest.fn(),
      showInsertPosition: options?.showInsertPosition
    }).menuItems
    return null
  }

  render(<Probe />)

  return result ?? []
}

const getLabelProps = (item: MenuItems[number]): MenuItemLabelProps => {
  return (item as { label: React.ReactElement<MenuItemLabelProps> }).label.props
}

const getTooltipTitle = (item: MenuItems[number]): React.ReactNode => getLabelProps(item).tooltipTitle

const renderTooltipTitle = (title: React.ReactNode): HTMLElement => render(<div>{ title }</div>).container

describe('useAreablockMenu previewHtml tooltip', () => {
  it('renders the sanitized previewHtml in the tooltip and keeps the description above it', () => {
    const items = getMenuItems({
      types: [{
        name: 'My Brick',
        type: 'my-brick',
        description: 'My description',
        previewHtml: '<img src="/preview.png" onerror="alert(1)"><script>alert(2)</script><p>preview text</p>'
      }]
    })

    expect(items).toHaveLength(1)

    const container = renderTooltipTitle(getTooltipTitle(items[0]))

    expect(container.textContent).toContain('My description')
    expect(container.textContent).toContain('preview text')

    const img = container.querySelector('img')
    expect(img).not.toBeNull()
    expect(img?.getAttribute('src')).toBe('/preview.png')
    expect(img?.getAttribute('onerror')).toBeNull()
    expect(container.querySelector('script')).toBeNull()
  })

  it('renders the previewHtml without a description wrapper when no description is set', () => {
    const items = getMenuItems({
      types: [{
        name: 'My Brick',
        type: 'my-brick',
        previewHtml: '<p>preview only</p>'
      }]
    })

    const container = renderTooltipTitle(getTooltipTitle(items[0]))

    expect(container.textContent).toBe('preview only')
  })

  it.each([
    ['undefined', undefined],
    ['null', null],
    ['empty', '']
  ])('falls back to the plain description when previewHtml is %s', (_label, previewHtml) => {
    const items = getMenuItems({
      types: [{
        name: 'My Brick',
        type: 'my-brick',
        description: 'My description',
        previewHtml
      }]
    })

    expect(getTooltipTitle(items[0])).toBe('My description')
  })

  it('has no tooltip title when neither description nor previewHtml are set', () => {
    const items = getMenuItems({
      types: [{ name: 'My Brick', type: 'my-brick' }]
    })

    expect(getTooltipTitle(items[0])).toBeUndefined()
  })

  it('renders the previewHtml tooltip for grouped menu entries too', () => {
    const items = getMenuItems({
      types: [{
        name: 'My Brick',
        type: 'my-brick',
        previewHtml: '<p>grouped preview</p>'
      }],
      group: { 'My Group': ['my-brick'] }
    })

    expect(items).toHaveLength(1)

    const children = (items[0] as { children: MenuItems }).children
    expect(children).toHaveLength(1)

    const container = renderTooltipTitle(getTooltipTitle(children[0]))
    expect(container.textContent).toBe('grouped preview')
  })
})

describe('useAreablockMenu insert position', () => {
  const config: AreablockEditableConfig = {
    types: [{ name: 'My Brick', type: 'my-brick' }]
  }

  it('leaves the position buttons out unless they are asked for', () => {
    expect(getLabelProps(getMenuItems(config)[0]).onInsert).toBeUndefined()
  })

  it('adds below when the row itself is clicked', () => {
    const onAddArea = jest.fn()
    const item = getMenuItems(config, { onAddArea, showInsertPosition: true })[0]

    ;(item as unknown as { onClick: () => void }).onClick()

    expect(onAddArea).toHaveBeenCalledWith('my-brick', 'below')
  })

  it.each<AreaInsertPosition>(['above', 'below'])('passes %s on from the position buttons', (position) => {
    const onAddArea = jest.fn()
    const item = getMenuItems(config, { onAddArea, showInsertPosition: true })[0]

    getLabelProps(item).onInsert?.(position)

    expect(onAddArea).toHaveBeenCalledWith('my-brick', position)
  })

  it('offers the position buttons on grouped entries too', () => {
    const items = getMenuItems(
      { ...config, group: { 'My Group': ['my-brick'] } },
      { showInsertPosition: true }
    )

    const children = (items[0] as { children: MenuItems }).children

    expect(getLabelProps(children[0]).onInsert).toBeDefined()
  })
})
