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

// The real Divider, Flex and style hook import antd-style (untranspiled ESM), which
// jest cannot load — same reason as keyed-list.test.tsx. Class name and gap are
// forwarded so it can be asserted which styles end up where; the rules themselves
// live in restore-inheritance-label-extra.styles.ts.
jest.mock('./restore-inheritance-label-extra.styles', () => ({
  useStyles: () => ({ styles: { action: 'action-class', divider: 'divider-class' } })
}))

jest.mock('@Pimcore/components/divider/divider', () => ({
  Divider: ({ className }: { className?: string }) => (
    <span
      className={ className }
      data-testid="divider"
    />
  )
}))

jest.mock('@Pimcore/components/flex/flex', () => ({
  Flex: ({ children, gap, className }: { children?: React.ReactNode, gap?: string, className?: string }) => (
    <div
      className={ className }
      data-gap={ gap }
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

  it('places the action and its divider in the label row through their styles', () => {
    render(<RestoreInheritanceLabelExtra />)

    const divider = screen.getByTestId('divider')

    expect(divider.parentElement).toHaveClass('action-class')
    expect(divider).toHaveClass('divider-class')
  })

  it('spaces the divider off the button by the gap of the action', () => {
    render(<RestoreInheritanceLabelExtra />)

    expect(screen.getByTestId('divider').parentElement).toHaveAttribute('data-gap', 'mini')
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
