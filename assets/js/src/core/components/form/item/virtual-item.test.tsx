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
import { LabelExtraProvider } from './provider/label-extra/label-extra-provider'
import { VirtualItem } from './virtual-item'

// The real Space transitively imports antd-style (untranspiled ESM), which jest
// cannot load — same reason as keyed-list.test.tsx.
jest.mock('@Pimcore/components/space/space', () => ({
  Space: ({ children }: { children?: React.ReactNode }) => <div>{children}</div>
}))

jest.mock('@Pimcore/components/tooltip/tooltip', () => ({
  Tooltip: ({ children }: { children?: React.ReactNode }) => children
}))

jest.mock('@Pimcore/components/icon/icon', () => ({
  Icon: () => <span data-testid="tooltip-icon" />
}))

jest.mock('./virtual-item.styles', () => ({
  useStyles: () => ({ styles: { virtualItem: 'virtual-item' } })
}))

jest.mock('@Pimcore/components/form/use-form', () => ({
  useFormInstance: () => null
}))

jest.mock('./hooks/use-virtual-validator-registry', () => ({
  useVirtualValidatorRegistry: () => null
}))

jest.mock('./hooks/use-virtual-validation', () => ({
  useVirtualValidation: () => ({
    validationState: { validateStatus: '', errors: [], warnings: [] },
    validate: jest.fn()
  })
}))

describe('VirtualItem', () => {
  it('renders the label extra at the end of the label row, after the label and its tooltip icon', () => {
    render(
      <LabelExtraProvider extra={ <button type="button">restore</button> }>
        <VirtualItem
          label="Name"
          name="field"
          tooltip="A description"
        >
          <input />
        </VirtualItem>
      </LabelExtraProvider>
    )

    const button = screen.getByRole('button', { name: 'restore' })
    const label = screen.getByText('Name').closest('label')
    const tooltipIcon = screen.getByTestId('tooltip-icon')

    // The label element owns the name and the tooltip icon; the extra follows it.
    expect(label).toContainElement(tooltipIcon)
    expect(label).not.toContainElement(button)
    expect(label?.parentElement?.parentElement).toBe(button.parentElement)
    expect(button.compareDocumentPosition(tooltipIcon)).toBe(Node.DOCUMENT_POSITION_PRECEDING)
  })

  it('renders no label extra outside a provider', () => {
    render(
      <VirtualItem
        label="Name"
        name="field"
      >
        <input />
      </VirtualItem>
    )

    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
})
