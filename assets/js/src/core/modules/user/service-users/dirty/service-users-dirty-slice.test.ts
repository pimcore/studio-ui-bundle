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
import { selectServiceUsersDirty, serviceUsersDirtySlice, setServiceUsersDirty } from './service-users-dirty-slice'

jest.mock('@Pimcore/app/store', () => ({ injectSliceWithState: jest.fn() }))

describe('serviceUsersDirtySlice', () => {
  const asRootState = (state: unknown): RootState => state as RootState
  const stateWith = (dirty: boolean): RootState =>
    asRootState({ 'service-users-dirty': serviceUsersDirtySlice.reducer(undefined, setServiceUsersDirty(dirty)) })

  it('is clean until an opened service user is edited', () => {
    expect(selectServiceUsersDirty(asRootState({}))).toBe(false)
    expect(serviceUsersDirtySlice.reducer(undefined, { type: 'noop' })).toEqual({ dirty: false })
  })

  it('reports the edits of the widget and their disappearance', () => {
    expect(selectServiceUsersDirty(stateWith(true))).toBe(true)
    expect(selectServiceUsersDirty(stateWith(false))).toBe(false)
  })
})
