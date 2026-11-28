/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { Children, cloneElement, isValidElement } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { withFieldAddons } from './field-addon-control'

jest.mock('../form-item.styles', () => ({
  useStyles: () => ({ styles: {} })
}))

interface TextControlProps {
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
  placeholder?: string
}

const TextControl = ({ value, onChange, disabled, placeholder }: TextControlProps): React.JSX.Element => (
  <input
    disabled={ disabled }
    onChange={ (event) => onChange?.(event.target.value) }
    placeholder={ placeholder }
    value={ value ?? '' }
  />
)

// Binds its single child the way AntD's Form.Item (and Studio's keyed and localized
// item controls) do: by handing value and onChange to the element it is given.
const BindingHost = ({ children, value, onChange }: { children: React.ReactNode, value: string, onChange: (value: string) => void }): React.JSX.Element => {
  const child = Children.only(children)

  if (!isValidElement(child)) {
    throw new Error('expected a single element')
  }

  return cloneElement(child as React.ReactElement<TextControlProps>, { value, onChange })
}

describe('withFieldAddons', () => {
  it('returns the control itself when no addon is given', () => {
    const control = <TextControl />

    expect(withFieldAddons(control, undefined, undefined)).toBe(control)
  })

  it('renders the after addon next to the control and the below addon under it', () => {
    render(<>{ withFieldAddons(<TextControl />, <span>after addon</span>, <span>below addon</span>) }</>)

    const after = screen.getByText('after addon')
    const below = screen.getByText('below addon')

    expect(after.closest('.pimcore-field-addon__row')).toContainElement(screen.getByRole('textbox'))
    expect(below.closest('.pimcore-field-addon__row')).toBeNull()
    expect(below.closest('.pimcore-field-addon__below')).not.toBeNull()
  })

  // the control has to be a flex item of the row itself: in a box of its own, a `width: 100%`
  // control would shrink to its intrinsic width instead of filling up to its max-width
  it('makes the control a direct child of the row', () => {
    render(<>{ withFieldAddons(<TextControl />, <span>after addon</span>, undefined) }</>)

    expect(screen.getByRole('textbox').parentElement).toHaveClass('pimcore-field-addon__row')
  })

  it('leaves the control out of a row when only the below addon is given', () => {
    render(<>{ withFieldAddons(<TextControl />, undefined, <span>below addon</span>) }</>)

    expect(screen.getByRole('textbox').closest('.pimcore-field-addon__row')).toBeNull()
  })

  it('passes the value and change handler bound by the form item through to the control', () => {
    const onChange = jest.fn()

    render(
      <BindingHost
        onChange={ onChange }
        value="5"
      >
        { withFieldAddons(<TextControl placeholder="Warranty" />, <span>Manufacturer</span>, undefined) }
      </BindingHost>
    )

    const input = screen.getByPlaceholderText('Warranty')
    expect(input).toHaveValue('5')

    fireEvent.change(input, { target: { value: '7' } })
    expect(onChange).toHaveBeenCalledWith('7')
  })

  // Studio's localized item control reads the child's own `disabled` to decide whether a
  // locale permission may override it. Hiding the control's props behind the wrapper would
  // make a read-only field editable.
  it('keeps the props of the control readable on the element it returns', () => {
    const wrapped = withFieldAddons(<TextControl disabled />, <span>after addon</span>, undefined)

    expect((wrapped as React.ReactElement<TextControlProps>).props.disabled).toBe(true)
  })
})
