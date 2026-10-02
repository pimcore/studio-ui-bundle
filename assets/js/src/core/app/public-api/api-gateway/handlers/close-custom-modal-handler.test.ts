/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ApiGatewayHandlerContext } from '../registry/handler-registry'
import { closeCustomModalHandler } from './close-custom-modal-handler'

// The handler only reads `modalHolderContext`; the other context helpers are irrelevant to it
// here, so this stub only needs to be structurally cast, not fully populated. Casting through an
// identifier (rather than `{ ... } as ApiGatewayHandlerContext`) keeps
// `@typescript-eslint/consistent-type-assertions` (no object-literal assertions) happy.
const asHandlerContext = (value: Pick<ApiGatewayHandlerContext, 'modalHolderContext'>): ApiGatewayHandlerContext => (
  value as ApiGatewayHandlerContext
)

describe('closeCustomModalHandler', () => {
  it('removes the modal with the given id from the modal holder', () => {
    const context = asHandlerContext({
      modalHolderContext: {
        addModal: jest.fn(),
        removeModal: jest.fn(),
        hasModal: jest.fn()
      }
    })

    closeCustomModalHandler({ id: 'close-custom-modal-handler-test.a' }, context)

    expect(context.modalHolderContext.removeModal).toHaveBeenCalledWith('close-custom-modal-handler-test.a')
  })
})
