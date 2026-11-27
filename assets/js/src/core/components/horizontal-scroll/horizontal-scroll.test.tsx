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

// the styles module reaches antd-style's untranspiled ESM core
jest.mock('./horizontal-scroll.styles', () => ({
  useStyles: () => ({ styles: { scrollContainer: 'scroll-container', scroll: 'scroll' } })
}))

jest.mock('@Pimcore/components/icon-button/icon-button', () => ({
  IconButton: ({ icon, theme, ...props }: any) => <button { ...props } />
}))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

const { HorizontalScroll } = jest.requireActual('./horizontal-scroll')

describe('HorizontalScroll', () => {
  const overflow = (scrollWidth: number): void => {
    Object.defineProperty(HTMLElement.prototype, 'scrollWidth', { configurable: true, get: () => scrollWidth })
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', { configurable: true, get: () => 100 })
  }

  beforeAll(() => {
    globalThis.ResizeObserver = class {
      observe (): void {}
      disconnect (): void {}
    } as any
  })

  afterEach(() => {
    overflow(0)
  })

  it('names both scroll buttons when the content overflows', () => {
    overflow(500)
    render(<HorizontalScroll><span>content</span></HorizontalScroll>)

    expect(screen.getByRole('button', { name: 'aria.horizontal-scroll.scroll-left' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'aria.horizontal-scroll.scroll-right' })).toBeInTheDocument()
  })

  it('renders no scroll buttons when the content fits', () => {
    overflow(100)
    render(<HorizontalScroll><span>content</span></HorizontalScroll>)

    expect(screen.queryAllByRole('button')).toHaveLength(0)
  })
})
