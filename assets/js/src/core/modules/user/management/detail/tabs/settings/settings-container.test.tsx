/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

const mockDraft: { user: Record<string, any>, isLoading: boolean, changeUserInState: jest.Mock, updateUserImageInState: jest.Mock } = {
  user: {},
  isLoading: false,
  changeUserInState: jest.fn(),
  updateUserImageInState: jest.fn()
}

jest.mock('@Pimcore/modules/user/hooks/use-user-management-draft', () => ({ useUserManagementDraft: () => mockDraft }))
jest.mock('@Pimcore/modules/user/hooks/use-user-management-context', () => ({ useUserManagementContext: () => ({ id: 5 }) }))
jest.mock('@Pimcore/modules/auth/hooks/use-user', () => ({ useUser: () => ({ id: 1, isAdmin: true }) }))
jest.mock('@Pimcore/modules/app/settings/hooks/use-settings', () => ({ useSettings: () => ({ validLanguages: [] }) }))
jest.mock('@Pimcore/modules/user/user-api-slice-enhanced', () => ({
  useUserGetAvailablePermissionsQuery: () => ({ data: { items: [] }, isLoading: false })
}))
jest.mock('@Pimcore/modules/perspectives/perspectives-slice.enhanced', () => ({
  usePerspectiveGetConfigCollectionQuery: () => ({ isLoading: false })
}))
jest.mock('@Pimcore/components/accordion/accordion', () => ({
  Accordion: ({ items }: { items: Array<{ key: string, children: React.ReactNode }> }) => <>{items.map((item) => <div key={ item.key }>{item.children}</div>)}</>
}))
jest.mock('@Pimcore/components/switch/switch', () => ({
  Switch: ({ value, onChange, labelRight }: { value?: boolean, onChange?: (checked: boolean) => void, labelRight?: string }) => (
    <input
      aria-label={ labelRight }
      checked={ value === true }
      onChange={ (event) => onChange?.(event.target.checked) }
      type="checkbox"
    />
  )
}))
jest.mock('@Pimcore/components/form/form', () => ({ Form: jest.requireActual('antd').Form }))
jest.mock('@Pimcore/components/content/content', () => ({
  Content: ({ children }: { children?: React.ReactNode }) => <div>{children}</div>
}))
jest.mock('@Pimcore/components/icon-button/icon-button', () => ({ IconButton: () => null }))
jest.mock('@Pimcore/modules/user/management/detail/tabs/settings/components/user-avatar', () => ({ UserAvatar: () => null }))
jest.mock('@Pimcore/modules/user/management/detail/tabs/settings/components/two-factor-reset-button/two-factor-reset-button', () => ({
  TwoFactorResetButton: () => null
}))
jest.mock('@Pimcore/modules/user/management/detail/tabs/settings/components/form/admin-accordion', () => ({ AdminAccordion: () => null }))
jest.mock('@Pimcore/modules/user/management/detail/tabs/settings/components/form/customisation-accordion', () => ({ CustomisationAccordion: () => null }))
jest.mock('@Pimcore/modules/user/management/detail/tabs/settings/components/form/appearance-branding-accordion', () => ({ AppearanceBrandingAccordion: () => null }))
jest.mock('@Pimcore/modules/user/management/detail/tabs/settings/components/form/permissions-accordion', () => ({ PermissionsAccordion: () => null }))
jest.mock('@Pimcore/modules/user/management/detail/tabs/settings/components/form/types-classes-accordion', () => ({ TypesAndClassesAccordion: () => null }))
jest.mock('@Pimcore/modules/user/management/detail/tabs/settings/components/form/editor-settings-accordion', () => ({ EditorSettingsAccordion: () => null }))
jest.mock('@Pimcore/modules/user/management/detail/tabs/settings/components/form/shared-translation-settings-accordion', () => ({ SharedTranslationSettingsAccordion: () => null }))
jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))

// eslint-disable-next-line import/first
import React from 'react'
// eslint-disable-next-line import/first
import { render, screen, waitFor } from '@testing-library/react'
// eslint-disable-next-line import/first
import { SettingsContainer } from './settings-container'

const switchLabel = 'user-management.two-factor-authentication'

const userWithTwoFactor = (required: boolean): Record<string, any> => ({
  id: 5,
  name: 'jane',
  roles: [],
  perspectives: [],
  permissions: [],
  twoFactorAuthentication: { required, enabled: required, type: required ? 'google' : '', active: required }
})

const isSwitchOn = (): boolean => screen.getByLabelText<HTMLInputElement>(switchLabel).checked

describe('SettingsContainer', () => {
  it('moves the 2FA switch when a setup elsewhere makes it required', async () => {
    mockDraft.user = userWithTwoFactor(false)
    const { rerender } = render(<SettingsContainer />)
    expect(isSwitchOn()).toBe(false)

    mockDraft.user = userWithTwoFactor(true)
    rerender(<SettingsContainer />)

    await waitFor(() => { expect(isSwitchOn()).toBe(true) })
  })
})
