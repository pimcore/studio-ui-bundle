/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type ReactNode } from 'react'
import { render, screen } from '@testing-library/react'
import { FieldLabel } from './field-label'
import { FieldLabelTechnicalNameProvider } from './field-label-technical-name-provider'
import { CheckboxEditable } from '@Pimcore/modules/element/dynamic-types/definitions/document/editable/components/checkbox-editable/checkbox-editable'

let mockIsAdmin = true

jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))
jest.mock('@Pimcore/modules/auth/hooks/use-user', () => ({ useUser: () => ({ isAdmin: mockIsAdmin }) }))
jest.mock('@sdk/utils', () => ({
  isNonEmptyString: (value: unknown) => typeof value === 'string' && value !== ''
}))
jest.mock('@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/inheritance-state-provider/use-inheritance-state', () => ({
  useInheritanceState: () => undefined
}))
jest.mock('@Pimcore/modules/data-object/components/inheritance-button', () => ({
  InheritanceButton: () => <span />
}))
jest.mock('@Pimcore/components/icon/icon', () => ({
  Icon: ({ value }: { value: string }) => <span data-icon={ value } />
}))
jest.mock('@Pimcore/components/flex/flex', () => ({
  Flex: ({ children }: { children: ReactNode }) => <span>{ children }</span>
}))
jest.mock('@Pimcore/components/tooltip/tooltip', () => ({
  Tooltip: ({ title, children }: { title: string, children: ReactNode }) => <span data-tooltip={ title }>{ children }</span>
}))
jest.mock('@sdk/components', () => ({
  Checkbox: () => <input type="checkbox" />,
  Flex: ({ children }: { children: ReactNode }) => <span>{ children }</span>,
  Text: ({ children }: { children: ReactNode }) => <span>{ children }</span>
}))
jest.mock('@Pimcore/modules/element/dynamic-types/definitions/document/editable/components/editable-overlay/editable-overlay', () => ({
  EditableOverlay: ({ children }: { children: ReactNode }) => <>{ children }</>
}))

const tooltipOfLabel = (label: string): string | null =>
  screen.getByText(label).closest('[data-tooltip]')?.getAttribute('data-tooltip') ?? null

const renderDataObjectLabel = (): void => {
  render(
    <FieldLabelTechnicalNameProvider technicalName="shortDescription">
      <FieldLabel
        label="Short description"
        name={ ['localizedfields', 'shortDescription', 'en'] }
      />
    </FieldLabelTechnicalNameProvider>
  )
}

describe('FieldLabel', () => {
  beforeEach(() => {
    mockIsAdmin = true
  })

  it('shows the technical name given by the data object form item on the label text', () => {
    renderDataObjectLabel()

    expect(tooltipOfLabel('Short description')).toBe('shortDescription')
  })

  it('shows no technical name to a user who is not an admin', () => {
    mockIsAdmin = false
    renderDataObjectLabel()

    expect(tooltipOfLabel('Short description')).toBeNull()
  })

  it('shows no technical name on the label of a document editable', () => {
    render(
      <CheckboxEditable
        config={ { label: 'Show teaser' } }
        name="showTeaser"
      />
    )

    expect(tooltipOfLabel('Show teaser')).toBeNull()
  })
})
