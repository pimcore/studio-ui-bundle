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

// the styles module reaches antd-style's untranspiled ESM core; only the layout constants
// matter to the behaviour under test, so the emotion class generation is stubbed out
jest.mock('./sidebar.styles', () => ({
  useStyle: () => ({ styles: { sidebar: 'sidebar' } }),
  SIDEBAR_NAV_WIDTH: 45,
  SIDEBAR_CONTENT_WIDTHS: { default: 250, medium: 272, large: 432 },
  MIN_REMAINING_LAYOUT_WIDTH: 200
}))

// the real tooltip pulls antd's portal + token machinery; the placement it is handed is
// what the prop is expected to decide
jest.mock('@Pimcore/components/tooltip/tooltip', () => ({
  Tooltip: ({ children, placement }: any) => <div data-placement={ placement }>{children}</div>
}))

jest.mock('@Pimcore/components/content/content-config-provider', () => ({
  ContentConfigProvider: ({ children }: any) => <div>{children}</div>
}))

jest.mock('@Pimcore/components/split-layout/components/divider/divider', () => ({
  Divider: () => <div data-testid="divider" />
}))

jest.mock('@Pimcore/utils/hooks/use-element-visible', () => ({
  __esModule: true,
  default: () => true
}))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

const { Sidebar } = jest.requireActual('./sidebar')
const { SidebarProvider } = jest.requireActual('./sidebar-provider')

const entries = [
  { key: 'first', icon: <i>first-icon</i>, component: <div>First panel</div>, tooltip: 'First' },
  { key: 'second', icon: <i>second-icon</i>, component: <div>Second panel</div>, tooltip: 'Second' }
]

const railIcon = (key: string): HTMLElement => screen.getByText(`${key}-icon`).parentElement!

const isOpen = (key: string): boolean =>
  document.getElementById(key)!.classList.contains('sidebar--active')

const renderSidebar = (props: Record<string, unknown> = {}, initialActiveTab = ''): void => {
  render(
    <SidebarProvider initialActiveTab={ initialActiveTab }>
      <Sidebar
        entries={ entries }
        { ...props }
      />
    </SidebarProvider>
  )
}

describe('Sidebar', () => {
  describe('collapsible (default)', () => {
    it('closes the active tab when its rail icon is clicked again', () => {
      renderSidebar({}, 'first')
      expect(isOpen('first')).toBe(true)

      fireEvent.click(railIcon('first'))

      expect(isOpen('first')).toBe(false)
    })

    it('closes the active tab on Escape', () => {
      renderSidebar({}, 'first')

      fireEvent.keyDown(screen.getByText('First panel'), { key: 'Escape' })

      expect(isOpen('first')).toBe(false)
    })

    it('starts collapsed when no initial tab is given', () => {
      renderSidebar()

      expect(isOpen('first')).toBe(false)
      expect(isOpen('second')).toBe(false)
    })

    it('stays collapsed when the active tab names no entry', () => {
      const { container } = render(
        <SidebarProvider initialActiveTab="gone">
          <Sidebar entries={ entries } />
        </SidebarProvider>
      )

      // an expanded panel with nothing to show in it would paint blank
      expect(container.querySelector('.sidebar__content')!.classList.contains('expanded')).toBe(false)
    })
  })

  describe('collapsible={false}', () => {
    it('keeps the tab open when its rail icon is clicked again', () => {
      renderSidebar({ collapsible: false }, 'first')

      fireEvent.click(railIcon('first'))

      expect(isOpen('first')).toBe(true)
    })

    it('keeps the tab open on Escape', () => {
      renderSidebar({ collapsible: false }, 'first')

      fireEvent.keyDown(screen.getByText('First panel'), { key: 'Escape' })

      expect(isOpen('first')).toBe(true)
    })

    it('still switches between tabs', () => {
      renderSidebar({ collapsible: false }, 'first')

      fireEvent.click(railIcon('second'))

      expect(isOpen('second')).toBe(true)
      expect(isOpen('first')).toBe(false)
    })

    it('opens the first entry when the caller picked none', () => {
      renderSidebar({ collapsible: false })

      expect(isOpen('first')).toBe(true)
    })

    it('falls back to a remaining entry when the active one is removed', () => {
      const { rerender } = render(
        <SidebarProvider initialActiveTab="second">
          <Sidebar
            collapsible={ false }
            entries={ entries }
          />
        </SidebarProvider>
      )
      expect(isOpen('second')).toBe(true)

      rerender(
        <SidebarProvider initialActiveTab="second">
          <Sidebar
            collapsible={ false }
            entries={ [entries[0]] }
          />
        </SidebarProvider>
      )

      expect(isOpen('first')).toBe(true)
    })
  })

  describe('tooltipPlacement', () => {
    it('opens the rail tooltips to the left by default', () => {
      renderSidebar({}, 'first')

      expect(railIcon('first').closest('[data-placement]'))
        .toHaveAttribute('data-placement', 'left')
    })

    it('opens them to the given side', () => {
      renderSidebar({ tooltipPlacement: 'right' }, 'first')

      expect(railIcon('first').closest('[data-placement]'))
        .toHaveAttribute('data-placement', 'right')
    })
  })

  describe('resizable', () => {
    it('renders its own resize handle by default', () => {
      renderSidebar({}, 'first')

      expect(screen.getByTestId('divider')).toBeInTheDocument()
    })

    it('drops the handle and defers its width to the container when false', () => {
      const { container } = render(
        <SidebarProvider initialActiveTab="first">
          <Sidebar
            entries={ entries }
            resizable={ false }
          />
        </SidebarProvider>
      )

      expect(screen.queryByTestId('divider')).toBeNull()
      expect(container.querySelector('.sidebar--container-sized')).not.toBeNull()
    })
  })
})
