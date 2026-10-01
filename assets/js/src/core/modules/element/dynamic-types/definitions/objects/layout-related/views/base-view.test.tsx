/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

const mockExists = jest.fn()
const mockT = jest.fn()

jest.mock('i18next', () => ({
  __esModule: true,
  default: {
    exists: (...args: unknown[]) => mockExists(...args),
    t: (...args: unknown[]) => mockT(...args)
  }
}))

// CollapseItem and Card transitively import antd/antd-style (untranspiled ESM),
// which jest cannot load — same reason as field-container.test.tsx. The stubs
// keep the one prop asserted on here: the rendered title/label node.
jest.mock('@Pimcore/components/collapse/item/collapse-item', () => ({
  CollapseItem: ({ children, label }: { children?: ReactNode, label?: ReactNode }) => (
    <div>
      <span data-testid='accordion-title'>{label}</span>
      {children}
    </div>
  )
}))

jest.mock('@Pimcore/components/card/card', () => ({
  Card: ({ children, title }: { children?: ReactNode, title?: ReactNode }) => (
    <div>
      <span data-testid='card-title'>{title}</span>
      {children}
    </div>
  )
}))

jest.mock('@Pimcore/components/icon/icon', () => ({
  Icon: () => <span data-testid='icon' />
}))

jest.mock('@Pimcore/components/flex/flex', () => ({
  Flex: ({ children }: { children?: ReactNode }) => <div>{children}</div>
}))

// eslint-disable-next-line import/first
import React, { type ReactNode } from 'react'
// eslint-disable-next-line import/first
import { render, screen } from '@testing-library/react'
// eslint-disable-next-line import/first
import { BaseView } from './base-view'

describe('BaseView', () => {
  beforeEach(() => {
    mockExists.mockReset()
    mockT.mockReset()
  })

  // Regression test for https://github.com/pimcore/platform-version/issues/249#issuecomment-5410079431:
  // the block data type passes a <FieldLabel /> element as title. Coercing it
  // through translateLabel() JSON-stringified the React element, so the panel
  // header showed '{"key":null,"ref":null,"props":{...},"_owner":null}'.
  it('renders a ReactNode title of a collapsible panel as-is instead of stringifying it', () => {
    render(
      <BaseView collapsible>
        content
      </BaseView>
    )

    expect(screen.getByTestId('accordion-title')).toBeInTheDocument()
  })

  it('renders a ReactNode title inside the accordion header instead of JSON', () => {
    render(
      <BaseView
        collapsible
        title={ <span data-testid='node-title'>My Block</span> }
      >
        content
      </BaseView>
    )

    expect(screen.getByTestId('node-title')).toHaveTextContent('My Block')
    expect(screen.getByTestId('accordion-title').textContent).not.toContain('"key":null')
    expect(mockExists).not.toHaveBeenCalled()
    expect(mockT).not.toHaveBeenCalled()
  })

  it('renders a ReactNode title inside the card header instead of JSON', () => {
    render(
      <BaseView
        border
        title={ <span data-testid='node-title'>My Block</span> }
      >
        content
      </BaseView>
    )

    expect(screen.getByTestId('node-title')).toHaveTextContent('My Block')
    expect(screen.getByTestId('card-title').textContent).not.toContain('"key":null')
  })

  it('translates a string title with an existing translation', () => {
    mockExists.mockReturnValue(true)
    mockT.mockReturnValue('Translated Title')

    render(
      <BaseView
        collapsible
        title='some.translation.key'
      >
        content
      </BaseView>
    )

    expect(screen.getByTestId('accordion-title')).toHaveTextContent('Translated Title')
    expect(mockExists).toHaveBeenCalledWith('some.translation.key', { nsSeparator: false })
  })

  it('shows an untranslated string title verbatim without calling t()', () => {
    mockExists.mockReturnValue(false)

    render(
      <BaseView
        collapsible
        title='Color: Blue'
      >
        content
      </BaseView>
    )

    expect(screen.getByTestId('accordion-title')).toHaveTextContent('Color: Blue')
    expect(mockT).not.toHaveBeenCalled()
  })
})
