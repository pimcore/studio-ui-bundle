/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type RootState } from '@Pimcore/app/store'
import { maintenanceModeSlice, selectIsLockedOut, setLockedOut } from './maintenance-mode-slice'

jest.mock('@Pimcore/app/store', () => ({
  injectSliceWithState: jest.fn()
}))

describe('maintenance-mode-slice', () => {
  it('starts unlocked', () => {
    const state = maintenanceModeSlice.reducer(undefined, { type: '@@INIT' })

    expect(state.isLockedOut).toBe(false)
  })

  // The store middleware dispatches this type as a string
  it('keeps the action type the store middleware dispatches', () => {
    const state = maintenanceModeSlice.reducer(undefined, { type: 'maintenance-mode/setLockedOut', payload: true })

    expect(setLockedOut(true).type).toBe('maintenance-mode/setLockedOut')
    expect(state.isLockedOut).toBe(true)
  })

  it('reads the lock-out from the root state', () => {
    expect(selectIsLockedOut({ 'maintenance-mode': { isLockedOut: true } } as unknown as RootState)).toBe(true)
    expect(selectIsLockedOut({} as unknown as RootState)).toBe(false)
  })
})
