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
import { LabelExtra } from '@Pimcore/components/form/item/provider/label-extra/label-extra-provider'
import { RestoreInheritanceLabelExtra, RestoreInheritanceLabelExtraProvider } from './restore-inheritance-label-extra'

const restore = jest.fn()
let canRestore = true
const useRestoreInheritance = jest.fn((name: unknown, emptyValue: unknown) => ({ canRestore, restore }))

jest.mock('@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/label/hooks/use-restore-inheritance', () => ({
  useRestoreInheritance: (name: unknown, emptyValue: unknown) => useRestoreInheritance(name, emptyValue)
}))

jest.mock('@Pimcore/components/form/item/provider/item/use-item', () => ({
  useItemOptional: () => ({ name: ['manufacturer'] })
}))

// The real Divider and Flex transitively import antd-style (untranspiled ESM),
// which jest cannot load — same reason as keyed-list.test.tsx. Style and gap are
// forwarded so the placement of the wrapper (see below) can be asserted on.
jest.mock('@Pimcore/components/divider/divider', () => ({
  Divider: ({ style }: { style?: React.CSSProperties }) => (
    <span
      data-testid="divider"
      style={ style }
    />
  )
}))

jest.mock('@Pimcore/components/flex/flex', () => ({
  Flex: ({ children, gap, style }: { children?: React.ReactNode, gap?: string, style?: React.CSSProperties }) => (
    <div
      data-gap={ gap }
      style={ style }
    >
      {children}
    </div>
  )
}))

jest.mock('./restore-inheritance-button', () => ({
  RestoreInheritanceButton: ({ onRestore }: { onRestore: () => void }) => (
    <button
      onClick={ onRestore }
      type="button"
    >
      restore
    </button>
  )
}))

beforeEach(() => {
  jest.clearAllMocks()
  canRestore = true
})

describe('RestoreInheritanceLabelExtra', () => {
  it('offers the restore of the field the surrounding form item holds', () => {
    render(<RestoreInheritanceLabelExtra />)

    screen.getByRole('button', { name: 'restore' }).click()

    expect(useRestoreInheritance).toHaveBeenCalledWith(['manufacturer'], null)
    expect(restore).toHaveBeenCalled()
  })

  it('sits on the first text line of the label, which is also all the height it can take', () => {
    render(<RestoreInheritanceLabelExtra />)

    const wrapper = screen.getByTestId('divider').parentElement

    expect(wrapper).toHaveStyle({ alignSelf: 'flex-start', height: '1lh' })
  })

  it('spaces the divider off the label and off the button by the same margin', () => {
    render(<RestoreInheritanceLabelExtra />)

    const wrapper = screen.getByTestId('divider').parentElement

    expect(wrapper).toHaveAttribute('data-gap', 'mini')
    expect(wrapper).toHaveStyle({ marginInlineStart: '4px' })
  })

  it('does not let the divider add a vertical margin on top of that one line', () => {
    render(<RestoreInheritanceLabelExtra />)

    expect(screen.getByTestId('divider')).toHaveStyle({ margin: '0px' })
  })

  it('keeps the divider on the text line of the label, not on the offset Ant lifts a vertical divider by', () => {
    render(<RestoreInheritanceLabelExtra />)

    expect(screen.getByTestId('divider')).toHaveStyle({ top: '0px', height: '1em' })
  })

  it('separates the action from the label with a divider', () => {
    render(<RestoreInheritanceLabelExtra />)

    const button = screen.getByRole('button', { name: 'restore' })
    const divider = screen.getByTestId('divider')

    expect(button.compareDocumentPosition(divider)).toBe(Node.DOCUMENT_POSITION_PRECEDING)
  })

  it('renders nothing when the field offers no restore', () => {
    canRestore = false

    const { container } = render(<RestoreInheritanceLabelExtra />)

    expect(container).toBeEmptyDOMElement()
  })

  it('clears the field with the empty value of the surrounding provider', () => {
    render(
      <RestoreInheritanceLabelExtraProvider emptyValue={ [] }>
        <RestoreInheritanceLabelExtra />
      </RestoreInheritanceLabelExtraProvider>
    )

    expect(useRestoreInheritance).toHaveBeenCalledWith(['manufacturer'], [])
  })

  it('is served by the label-extra slot below its provider', () => {
    render(
      <RestoreInheritanceLabelExtraProvider emptyValue={ null }>
        <LabelExtra />
      </RestoreInheritanceLabelExtraProvider>
    )

    expect(screen.getByRole('button', { name: 'restore' })).toBeInTheDocument()
  })
})
