/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type Reducer } from '@reduxjs/toolkit'
import { injectSliceWithState, type RootState } from '@sdk/app'
import { selectThemeId, setThemeId, type ThemeState } from './theme-slice'
import { studioThemeIds } from './constants/theme-ids'

jest.mock('@sdk/app', () => ({
  injectSliceWithState: jest.fn()
}))

interface SliceLike {
  reducerPath: string
  reducer: Reducer<ThemeState>
}

const injectSliceWithStateMock = injectSliceWithState as unknown as jest.Mock
const slice = injectSliceWithStateMock.mock.calls[0][0] as SliceLike

describe('theme-slice', () => {
  it('registers itself in the store on import', () => {
    expect(injectSliceWithStateMock).toHaveBeenCalledTimes(1)
    expect(slice.reducerPath).toBe('theme')
  })

  it('defaults to the light theme', () => {
    const state = slice.reducer(undefined, { type: '@@INIT' })

    expect(state.themeId).toBe(studioThemeIds.light)
  })

  it('setThemeId updates the theme id', () => {
    const initialState = slice.reducer(undefined, { type: '@@INIT' })

    const nextState = slice.reducer(initialState, setThemeId('my-bundle:dark'))

    expect(nextState.themeId).toBe('my-bundle:dark')
  })

  it('selectThemeId reads the theme id from the root state', () => {
    const rootState = { theme: { themeId: 'my-bundle:dark' } } as unknown as RootState

    expect(selectThemeId(rootState)).toBe('my-bundle:dark')
  })
})
