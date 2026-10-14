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
import { render, screen } from '@testing-library/react'
import { type ISystemInfoModalData, SystemInfoModal } from './system-info-modal'

// The form building blocks and data hooks pull in the store, antd-style and the API layer.
// Only the rendered public URL matters here, so they are replaced by plain elements/stubs.
jest.mock('antd/es/typography/Link', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <span>{children}</span>
}))

jest.mock('@Pimcore/components/form/form-kit', () => {
  const Container = ({ children }: { children: React.ReactNode }): React.JSX.Element => <div>{children}</div>
  return { FormKit: Object.assign(Container, { Panel: Container }) }
})

jest.mock('@Pimcore/components/form/form', () => ({
  Form: {
    Item: ({ label, children }: { label: string, children: React.ReactNode }) => (
      <label>
        {label}
        {children}
      </label>
    )
  }
}))

jest.mock('@Pimcore/components/input/input', () => ({
  Input: ({ value }: { value?: string }) => (
    <input
      readOnly
      value={ value ?? '' }
    />
  )
}))

jest.mock('@Pimcore/components/text/text', () => ({
  Text: ({ children }: { children: React.ReactNode }) => <span>{children}</span>
}))

jest.mock('@Pimcore/components/flex/flex', () => ({
  Flex: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}))

jest.mock('@Pimcore/modules/user/user-api-slice-enhanced', () => ({
  useUserGetCollectionQuery: () => ({ data: { items: [] } })
}))

jest.mock('@Pimcore/modules/auth/hooks/use-user', () => ({
  useUser: () => ({ id: 1 })
}))

jest.mock('@Pimcore/modules/widget-manager/hooks/use-widget-manager', () => ({
  useWidgetManager: () => ({ openMainWidget: jest.fn() })
}))

jest.mock('@Pimcore/modules/user', () => ({
  USERS_WIDGET: { config: {} }
}))

jest.mock('@Pimcore/modules/class-definition/class-definition-slice-enhanced', () => ({
  useClassDefinitionCollectionQuery: () => ({ data: { items: [] } })
}))

jest.mock('@Pimcore/modules/app/settings/hooks/use-settings', () => ({
  useSettings: () => ({ asset_frontend_prefix: null })
}))

jest.mock('@Pimcore/app/config/app-config', () => ({
  currentDomain: 'https://studio.example.com'
}))

jest.mock('@Pimcore/utils/date-time', () => ({
  formatDateTime: () => 'date'
}))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

const createDocument = (settingsData?: Record<string, unknown>): ISystemInfoModalData => ({
  id: 12,
  fullPath: '/gothia/en/about',
  type: 'page',
  elementType: 'document',
  deeplink: 'https://studio.example.com/admin/studio/document_12',
  modificationDate: null,
  creationDate: null,
  userOwner: 0,
  userModification: 0,
  ...(settingsData !== undefined ? { settingsData } : {})
} as unknown as ISystemInfoModalData)

const getPublicUrl = (): string => {
  return screen.getByLabelText<HTMLInputElement>('system-information.public-url').value
}

describe('SystemInfoModal public URL', () => {
  it('uses the site-aware settingsData.url for documents (service-operations#1343)', () => {
    render(
      <SystemInfoModal
        data={ createDocument({ url: 'https://gothia.example.com/en/about' }) }
        onClose={ jest.fn() }
      />
    )

    expect(getPublicUrl()).toBe('https://gothia.example.com/en/about')
  })

  it.each([
    ['without settingsData', undefined],
    ['with a null url', { url: null }],
    ['with an empty url', { url: '' }]
  ])('falls back to currentDomain + fullPath for documents %s', (_, settingsData) => {
    render(
      <SystemInfoModal
        data={ createDocument(settingsData) }
        onClose={ jest.fn() }
      />
    )

    expect(getPublicUrl()).toBe('https://studio.example.com/gothia/en/about')
  })
})
