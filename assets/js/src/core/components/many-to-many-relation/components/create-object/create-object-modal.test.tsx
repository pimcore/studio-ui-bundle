/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

let mockIsCreating = false

jest.mock('./use-create-object', () => ({
  useCreateObject: () => ({ createObject: jest.fn(), isCreating: mockIsCreating })
}))

// Exposes the props that decide whether the modal can be dismissed.
jest.mock('@Pimcore/components/modal/modal', () => ({
  Modal: (props: Record<string, any>) => (props.open === true
    ? (
      <div>
        <button
          data-closable={ String(props.closable) }
          data-keyboard={ String(props.keyboard) }
          data-mask-closable={ String(props.maskClosable) }
          data-testid="cancel"
          disabled={ props.cancelButtonProps?.disabled }
          onClick={ props.onCancel }
        />
        { props.children }
      </div>
      )
    : null)
}))

jest.mock('./create-object-form', () => ({
  CreateObjectForm: ({ disabled }: { disabled?: boolean }) => (
    <div
      data-disabled={ String(disabled) }
      data-testid="form"
    />
  )
}))

// eslint-disable-next-line import/first
import '@testing-library/jest-dom'
// eslint-disable-next-line import/first
import React from 'react'
// eslint-disable-next-line import/first
import { fireEvent, render, screen } from '@testing-library/react'
// eslint-disable-next-line import/first
import { CreateObjectModal } from './create-object-modal'

const renderModal = (setOpen = jest.fn()): jest.Mock => {
  render(
    <CreateObjectModal
      classes={ [] }
      isLoading={ false }
      onCreated={ jest.fn() }
      open
      setOpen={ setOpen }
    />
  )

  return setOpen
}

describe('CreateObjectModal while a request is pending', () => {
  afterEach(() => {
    mockIsCreating = false
  })

  it('can be dismissed when idle', () => {
    const setOpen = renderModal()

    expect(screen.getByTestId('cancel')).toHaveAttribute('data-closable', 'true')
    expect(screen.getByTestId('cancel')).toHaveAttribute('data-keyboard', 'true')
    expect(screen.getByTestId('cancel')).toHaveAttribute('data-mask-closable', 'true')
    expect(screen.getByTestId('form')).toHaveAttribute('data-disabled', 'false')

    fireEvent.click(screen.getByTestId('cancel'))

    expect(setOpen).toHaveBeenCalledWith(false)
  })

  it('locks closing, Esc, mask click and the form, and ignores cancel', () => {
    mockIsCreating = true
    const setOpen = renderModal()

    expect(screen.getByTestId('cancel')).toHaveAttribute('data-closable', 'false')
    expect(screen.getByTestId('cancel')).toHaveAttribute('data-keyboard', 'false')
    expect(screen.getByTestId('cancel')).toHaveAttribute('data-mask-closable', 'false')
    expect(screen.getByTestId('cancel')).toBeDisabled()
    expect(screen.getByTestId('form')).toHaveAttribute('data-disabled', 'true')

    fireEvent.click(screen.getByTestId('cancel'))

    expect(setOpen).not.toHaveBeenCalled()
  })
})
