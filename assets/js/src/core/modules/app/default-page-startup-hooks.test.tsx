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
import { renderHook, waitFor } from '@testing-library/react'
import { MemoryRouter, useLocation } from 'react-router-dom'
import { useHandleDeepLink } from './hook/use-handle-deeplink'
import { useWelcomeScreen } from './welcome-screen/hooks/use-welcome-screen'

const mockHandle = jest.fn()
const mockOpenWelcomeScreen = jest.fn()

jest.mock('@sdk/app', () => ({
  useAppDispatch: () => jest.fn(),
  useAppSelector: () => true
}))
jest.mock('@Pimcore/modules/widget-manager/widget-manager-slice', () => ({
  openMainWidget: jest.fn(),
  selectWidgetManagerRestored: jest.fn()
}))
jest.mock('@Pimcore/modules/auth/profile/profile-container', () => ({ USERPROFILE: { config: {} } }))
jest.mock('@Pimcore/modules/element/hooks/use-element-helper', () => ({
  useElementHelper: () => ({ openElement: jest.fn() })
}))
jest.mock('@Pimcore/modules/auth/hooks/use-user', () => ({
  useUser: () => ({ id: 7, welcomeScreen: true, welcomeScreenTarget: 'studio-dashboards:1' })
}))
jest.mock('@Pimcore/app/depency-injection', () => ({
  container: {
    get: (id: string) => id === 'WelcomeScreen/Registry'
      ? { open: mockOpenWelcomeScreen }
      : { get: () => ({ name: 'tree', handle: mockHandle }) }
  }
}))
jest.mock('@Pimcore/modules/app/error-handler', () => ({
  __esModule: true,
  default: jest.fn(),
  GeneralError: jest.fn(),
  TrackedError: jest.requireActual('@Pimcore/modules/app/error-handler/classes/tracked-error').default
}))
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

describe('DefaultPage startup hooks', () => {
  it('open a named deep link instead of the welcome screen, although the link removes its query in the same render', async () => {
    const { result } = renderHook(() => {
      useHandleDeepLink()
      useWelcomeScreen()

      return useLocation()
    }, {
      wrapper: ({ children }) => <MemoryRouter initialEntries={ ['/studio/?deeplink=tree'] }>{children}</MemoryRouter>
    })

    await waitFor(() => { expect(result.current.search).toBe('') })
    expect(mockHandle).toHaveBeenCalledTimes(1)
    expect(mockOpenWelcomeScreen).not.toHaveBeenCalled()
  })
})
