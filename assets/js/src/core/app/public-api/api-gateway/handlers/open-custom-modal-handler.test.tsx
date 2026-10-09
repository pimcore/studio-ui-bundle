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
import { registerCustomModal, type CustomModalComponentProps } from '@Pimcore/app/public-api/modal/custom-modal-registry'
import { type ApiGatewayHandlerContext } from '../registry/handler-registry'
import { openCustomModalHandler } from './open-custom-modal-handler'

// The handler only reads `modalHolderContext`; the other context helpers are irrelevant to it
// here, so this stub only needs to be structurally cast, not fully populated. Casting through an
// identifier (rather than `{ ... } as ApiGatewayHandlerContext`) keeps
// `@typescript-eslint/consistent-type-assertions` (no object-literal assertions) happy.
const asHandlerContext = (value: Pick<ApiGatewayHandlerContext, 'modalHolderContext'>): ApiGatewayHandlerContext => (
  value as ApiGatewayHandlerContext
)

const createContext = (): ApiGatewayHandlerContext => asHandlerContext({
  modalHolderContext: {
    addModal: jest.fn(),
    removeModal: jest.fn(),
    hasModal: jest.fn()
  }
})

describe('openCustomModalHandler', () => {
  it('warns and does nothing when no modal is registered for the id', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
    const context = createContext()

    openCustomModalHandler({ id: 'unregistered-modal-id', payload: undefined }, context)

    expect(context.modalHolderContext.addModal).not.toHaveBeenCalled()
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('unregistered-modal-id'))

    warnSpy.mockRestore()
  })

  it('adds the registered component to the modal holder with the payload', () => {
    const TestModal = ({ payload }: CustomModalComponentProps<{ label: string }>): React.JSX.Element => (
      <div>{ payload.label }</div>
    )
    registerCustomModal('open-custom-modal-handler-test.with-payload', TestModal)
    const context = createContext()

    openCustomModalHandler({ id: 'open-custom-modal-handler-test.with-payload', payload: { label: 'hello' } }, context)

    expect(context.modalHolderContext.addModal).toHaveBeenCalledTimes(1)
    const [id, element] = (context.modalHolderContext.addModal as jest.Mock).mock.calls[0]
    expect(id).toBe('open-custom-modal-handler-test.with-payload')
    expect(element.props.payload).toEqual({ label: 'hello' })
  })

  it('removes the modal and forwards the result when the rendered component closes', () => {
    const TestModal = (_props: CustomModalComponentProps<undefined, string>): React.JSX.Element => <div />
    registerCustomModal('open-custom-modal-handler-test.on-close', TestModal)
    const context = createContext()
    const onClose = jest.fn()

    openCustomModalHandler({ id: 'open-custom-modal-handler-test.on-close', payload: undefined, onClose }, context)

    const [, element] = (context.modalHolderContext.addModal as jest.Mock).mock.calls[0]
    // Simulate the rendered component invoking the `onClose` prop it was given.
    element.props.onClose('the-result')

    expect(context.modalHolderContext.removeModal).toHaveBeenCalledWith('open-custom-modal-handler-test.on-close')
    expect(onClose).toHaveBeenCalledWith('the-result')
  })

  it('closes only once when the rendered component invokes onClose repeatedly', () => {
    const TestModal = (_props: CustomModalComponentProps<undefined, string>): React.JSX.Element => <div />
    registerCustomModal('open-custom-modal-handler-test.close-once', TestModal)
    const context = createContext()
    const onClose = jest.fn()

    openCustomModalHandler({ id: 'open-custom-modal-handler-test.close-once', payload: undefined, onClose }, context)

    const [, element] = (context.modalHolderContext.addModal as jest.Mock).mock.calls[0]
    element.props.onClose('first')
    element.props.onClose('second')

    expect(context.modalHolderContext.removeModal).toHaveBeenCalledTimes(1)
    expect(onClose).toHaveBeenCalledTimes(1)
    expect(onClose).toHaveBeenCalledWith('first')
  })
})
