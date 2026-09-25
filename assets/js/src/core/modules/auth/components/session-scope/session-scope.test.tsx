/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

let mockIsAuthenticated: boolean | undefined

jest.mock('@sdk/app', () => ({
  useAppSelector: () => mockIsAuthenticated
}))

jest.mock('../../auth-slice', () => ({
  selectIsAuthenticated: jest.fn()
}))

// eslint-disable-next-line import/first
import React, { useState } from 'react'
// eslint-disable-next-line import/first
import { act, render, screen } from '@testing-library/react'
// eslint-disable-next-line import/first
import { SessionScope } from './session-scope'

// Stands in for UI state held above the router, e.g. an open modal in a provider.
let openModal: () => void

const ModalHoldingProvider = (): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)
  openModal = () => { setIsOpen(true) }

  return <>{isOpen && <div data-testid="modal" />}</>
}

const renderScope = (): (() => void) => {
  const { rerender } = render(
    <SessionScope>
      <ModalHoldingProvider />
    </SessionScope>
  )

  return () => {
    rerender(
      <SessionScope>
        <ModalHoldingProvider />
      </SessionScope>
    )
  }
}

describe('SessionScope', () => {
  it('drops the UI state of a session when the session ends', () => {
    mockIsAuthenticated = true
    const update = renderScope()
    act(() => { openModal() })
    expect(screen.getByTestId('modal')).toBeInTheDocument()

    mockIsAuthenticated = false
    update()

    expect(screen.queryByTestId('modal')).not.toBeInTheDocument()
  })

  it('keeps its children when the initial check finds no session', () => {
    mockIsAuthenticated = undefined
    const update = renderScope()
    act(() => { openModal() })

    mockIsAuthenticated = false
    update()

    expect(screen.getByTestId('modal')).toBeInTheDocument()
  })

  it('keeps its children when the user logs in', () => {
    mockIsAuthenticated = false
    const update = renderScope()
    act(() => { openModal() })

    mockIsAuthenticated = true
    update()

    expect(screen.getByTestId('modal')).toBeInTheDocument()
  })
})
