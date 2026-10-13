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
import { CheckboxEditable } from './checkbox-editable'

// The SDK barrel loads every Studio component and its styles; antd's own controls are all this needs.
jest.mock('@sdk/components', () => {
  const { createElement, Fragment } = jest.requireActual('react')
  const antd = jest.requireActual('antd')
  return {
    Checkbox: antd.Checkbox,
    Flex: ({ children }: any) => createElement('div', null, children),
    Switch: ({ labelRight, ...props }: any) => createElement(Fragment, null, createElement(antd.Switch, props), labelRight),
    Text: ({ children }: any) => createElement('span', null, children)
  }
})
jest.mock('../editable-overlay/editable-overlay', () => ({ EditableOverlay: ({ children }: any) => <div>{children}</div> }))
jest.mock('@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/label/field-label', () => ({
  FieldLabel: ({ label }: { label: string }) => <span>{label}</span>
}))

describe('CheckboxEditable', () => {
  it('draws a checkbox by default', () => {
    render(<CheckboxEditable config={ { label: 'Only guest user' } } />)

    expect(screen.getByRole('checkbox')).toBeInTheDocument()
    expect(screen.queryByRole('switch')).not.toBeInTheDocument()
    expect(screen.getByText('Only guest user')).toBeInTheDocument()
  })

  it('draws a switch with its label when display is switch', () => {
    render(
      <CheckboxEditable
        config={ { label: 'Enable language redirect', display: 'switch' } }
        value
      />
    )

    expect(screen.getByRole('switch')).toBeChecked()
    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument()
    expect(screen.getByText('Enable language redirect')).toBeInTheDocument()
  })

  it('reports the new state when the switch is toggled', () => {
    const onChange = jest.fn()
    render(
      <CheckboxEditable
        config={ { display: 'switch' } }
        onChange={ onChange }
        value={ false }
      />
    )

    fireEvent.click(screen.getByRole('switch'))

    expect(onChange).toHaveBeenCalledWith(true)
  })

  it('disables the switch when the value is inherited', () => {
    render(
      <CheckboxEditable
        config={ { display: 'switch' } }
        inherited
      />
    )

    expect(screen.getByRole('switch')).toBeDisabled()
  })
})
