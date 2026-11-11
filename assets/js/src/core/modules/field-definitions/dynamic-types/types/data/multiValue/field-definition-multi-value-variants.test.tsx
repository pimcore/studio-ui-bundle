/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

// The @sdk/components barrel reaches antd-style's untranspiled ESM; plain elements stand in for the controls.
jest.mock('@sdk/components', () => ({
  IconButton: ({ tooltip, onClick, disabled }: any) => (
    <button
      aria-label={ tooltip.title }
      disabled={ disabled }
      onClick={ onClick }
      type='button'
    />
  ),
  Input: (props: any) => <input { ...props } />,
  Space: ({ children }: any) => <div>{children}</div>
}))

jest.mock('@sdk/utils', () => ({}))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string, params?: Record<string, string>) => params?.name !== undefined ? `${key}:${params.name}` : key })
}))

// eslint-disable-next-line import/first
import React, { useState } from 'react'
// eslint-disable-next-line import/first
import { fireEvent, render, screen } from '@testing-library/react'
// eslint-disable-next-line import/first
import { FieldDefinitionMultiValueVariants } from './field-definition-multi-value-variants'
// eslint-disable-next-line import/first
import { type ClassificationStoreVariantLayout } from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice-enhanced'

const NAME = 'classification-store.multi-value.variant-name'
const ADD = 'classification-store.multi-value.variant-add'
const EMPTY_REFUSAL = 'classification-store.multi-value.variant-name-empty'
const DUPLICATE_REFUSAL = 'classification-store.multi-value.variant-name-duplicate:metric'

let emitted: ClassificationStoreVariantLayout[] | undefined

const Host = ({ initial }: { initial: ClassificationStoreVariantLayout[] | null }): React.JSX.Element => {
  const [value, setValue] = useState(initial)

  return (
    <FieldDefinitionMultiValueVariants
      onChange={ (next) => { emitted = next; setValue(next) } }
      value={ value }
    />
  )
}

describe('FieldDefinitionMultiValueVariants', () => {
  beforeEach(() => { emitted = undefined })

  it('refuses a second row of the same name, with its reason', () => {
    render(<Host initial={ [{ name: 'metric' }] } />)
    fireEvent.click(screen.getByLabelText(ADD))
    fireEvent.change(screen.getAllByLabelText(NAME)[1], { target: { value: 'metric' } })

    expect(screen.getByText(DUPLICATE_REFUSAL)).toBeInTheDocument()
  })

  it('refuses a name that differs from another only by surrounding whitespace', () => {
    render(<Host initial={ [{ name: 'metric' }] } />)
    fireEvent.click(screen.getByLabelText(ADD))
    fireEvent.change(screen.getAllByLabelText(NAME)[1], { target: { value: 'metric ' } })

    expect(screen.getByText(DUPLICATE_REFUSAL)).toBeInTheDocument()
  })

  it('refuses an empty name, with its reason', () => {
    render(<Host initial={ [{ name: 'metric' }] } />)
    fireEvent.change(screen.getByLabelText(NAME), { target: { value: '' } })

    expect(screen.getByText(EMPTY_REFUSAL)).toBeInTheDocument()
  })

  it('shows no refusal for a valid list, and none for null', () => {
    const { unmount } = render(<Host initial={ [{ name: 'metric' }, { name: 'imperial' }] } />)
    expect(screen.queryByRole('alert')).toBeNull()
    unmount()

    render(<Host initial={ null } />)
    expect(screen.queryByRole('alert')).toBeNull()
  })

  it('emits the rows in the order they were moved to', () => {
    render(<Host initial={ [{ name: 'metric' }, { name: 'imperial', label: 'Imperial' }] } />)
    fireEvent.click(screen.getAllByLabelText('classification-store.multi-value.move-up')[1])

    expect(emitted).toEqual([{ name: 'imperial', label: 'Imperial' }, { name: 'metric' }])
  })

  // The stored blob can hold a row with no name; it is shown as the empty name it is and refused.
  it('shows a row carrying no name as an empty name, and refuses it', () => {
    render(<Host initial={ [{} as any] } />)

    expect(screen.getByLabelText(NAME)).toHaveValue('')
    expect(screen.getByText(EMPTY_REFUSAL)).toBeInTheDocument()
  })

  it('shows a space as it is typed and trims the name on blur', () => {
    render(<Host initial={ [{ name: 'metric' }] } />)
    const input = screen.getAllByLabelText(NAME)[0] as HTMLInputElement

    fireEvent.change(input, { target: { value: 'metric ' } })
    expect(input.value).toBe('metric ')

    fireEvent.blur(input)
    expect(emitted).toEqual([{ name: 'metric' }])
    expect(input.value).toBe('metric')
  })

  it('removes a row', () => {
    render(<Host initial={ [{ name: 'metric' }, { name: 'imperial' }] } />)
    fireEvent.click(screen.getAllByLabelText('delete')[0])

    expect(emitted).toEqual([{ name: 'imperial' }])
  })
})
