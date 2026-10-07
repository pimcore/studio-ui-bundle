/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext, useContext, useEffect } from 'react'
import { render, screen, act } from '@testing-library/react'
import { ModalHolderOutlet, ModalHolderProvider } from './modal-holder-provider'
import { useModalHolder } from './use-modal-holder'

const MODAL_ID = 'test-modal'

const ScopeContext = createContext<string | undefined>(undefined)

const ScopedModal = (): React.JSX.Element => {
  const scope = useContext(ScopeContext)

  return <div data-testid="scoped-modal">{ scope ?? 'no scope' }</div>
}

let holder: ReturnType<typeof useModalHolder> | undefined

const CaptureHolder = (): null => {
  holder = useModalHolder()

  return null
}

const AddModalOnMount = ({ modal }: { modal: React.ReactElement }): null => {
  const { addModal } = useModalHolder()

  useEffect(() => {
    addModal(MODAL_ID, modal)
  }, [])

  return null
}

describe('ModalHolderProvider', () => {
  beforeEach(() => {
    holder = undefined
  })

  it('renders held modals after its children by default', () => {
    render(
      <ModalHolderProvider>
        <div data-testid="child">child</div>
        <AddModalOnMount modal={ <ScopedModal /> } />
      </ModalHolderProvider>
    )

    const child = screen.getByTestId('child')
    const modal = screen.getByTestId('scoped-modal')

    expect(modal).toHaveTextContent('no scope')
    expect(child.compareDocumentPosition(modal) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  })

  it('renders held modals only through the outlet when renderModals is false', () => {
    render(
      <ModalHolderProvider renderModals={ false }>
        <ScopeContext.Provider value="inner scope">
          <AddModalOnMount modal={ <ScopedModal /> } />
          <div data-testid="outlet-wrapper">
            <ModalHolderOutlet />
          </div>
        </ScopeContext.Provider>
      </ModalHolderProvider>
    )

    expect(screen.getAllByTestId('scoped-modal')).toHaveLength(1)
    expect(screen.getByTestId('outlet-wrapper')).toContainElement(screen.getByTestId('scoped-modal'))
  })

  it('lets modals rendered through the outlet read providers mounted between provider and outlet', () => {
    render(
      <ModalHolderProvider renderModals={ false }>
        <ScopeContext.Provider value="inner scope">
          <AddModalOnMount modal={ <ScopedModal /> } />
          <ModalHolderOutlet />
        </ScopeContext.Provider>
      </ModalHolderProvider>
    )

    expect(screen.getByTestId('scoped-modal')).toHaveTextContent('inner scope')
  })

  it('removes a held modal from the outlet again', () => {
    render(
      <ModalHolderProvider renderModals={ false }>
        <CaptureHolder />
        <AddModalOnMount modal={ <ScopedModal /> } />
        <ModalHolderOutlet />
      </ModalHolderProvider>
    )

    expect(screen.getByTestId('scoped-modal')).toBeInTheDocument()

    act(() => {
      holder?.removeModal(MODAL_ID)
    })

    expect(screen.queryByTestId('scoped-modal')).toBeNull()
  })

  it('throws when the outlet is used outside of a provider', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => render(<ModalHolderOutlet />)).toThrow('ModalHolderOutlet must be used within a ModalHolderProvider')

    jest.restoreAllMocks()
  })
})
