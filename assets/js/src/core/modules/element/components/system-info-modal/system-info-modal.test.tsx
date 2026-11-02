/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isUndefined } from 'lodash'
import React from 'react'
import { render, screen } from '@testing-library/react'
import { type ISystemInfoModalData, SystemInfoModal } from './system-info-modal'

// The form building blocks and data hooks pull in the store, antd-style and the API layer.
// Only the rendered rows matter here, so they are replaced by plain elements/stubs.
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

const useAssetCustomSettingsGetByIdQuery = jest.fn()
jest.mock('@Pimcore/modules/asset/asset-api-slice-enhanced', () => ({
  useAssetCustomSettingsGetByIdQuery: (...args: unknown[]) => useAssetCustomSettingsGetByIdQuery(...args)
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
  ...(!isUndefined(settingsData) ? { settingsData } : {})
} as unknown as ISystemInfoModalData)

const createElement = (elementType: string, type: string): ISystemInfoModalData => ({
  id: 7,
  fullPath: '/images/hero.jpg',
  type,
  elementType,
  deeplink: `https://studio.example.com/admin/studio/${elementType}_7`,
  modificationDate: null,
  creationDate: null,
  userOwner: 0,
  userModification: 0
} as unknown as ISystemInfoModalData)

const mockCustomSettings = (dynamicCustomSettings?: Record<string, unknown>): void => {
  useAssetCustomSettingsGetByIdQuery.mockReturnValue({
    data: isUndefined(dynamicCustomSettings) ? undefined : { items: { dynamicCustomSettings } }
  })
}

const getPublicUrl = (): string => {
  return screen.getByLabelText<HTMLInputElement>('system-information.public-url').value
}

const queryChecksum = (): HTMLInputElement | null => {
  return screen.queryByLabelText<HTMLInputElement>('system-information.checksum')
}

beforeEach(() => {
  useAssetCustomSettingsGetByIdQuery.mockReset()
  mockCustomSettings()
})

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

describe('SystemInfoModal checksum (#1963)', () => {
  it('shows the stored checksum of an asset from its custom settings', () => {
    mockCustomSettings({ checksum: 'd41d8cd98f00b204e9800998ecf8427e', focalPointX: 50 })

    render(
      <SystemInfoModal
        data={ createElement('asset', 'image') }
        onClose={ jest.fn() }
      />
    )

    expect(useAssetCustomSettingsGetByIdQuery).toHaveBeenCalledWith({ id: 7 }, { skip: false })
    expect(queryChecksum()?.value).toBe('d41d8cd98f00b204e9800998ecf8427e')
  })

  it.each([
    ['no custom settings are loaded yet', undefined],
    ['the custom settings have no checksum', { focalPointX: 50 }],
    ['the checksum is empty', { checksum: '' }],
    ['the checksum is not a string', { checksum: 12345 }]
  ])('hides the row when %s', (_, dynamicCustomSettings) => {
    mockCustomSettings(dynamicCustomSettings)

    render(
      <SystemInfoModal
        data={ createElement('asset', 'image') }
        onClose={ jest.fn() }
      />
    )

    expect(queryChecksum()).toBeNull()
  })

  it.each([
    ['folder', 'asset', 'folder'],
    ['document', 'document', 'page'],
    ['data object', 'data-object', 'object']
  ])('does not request or show a checksum for a %s', (_, elementType, type) => {
    mockCustomSettings({ checksum: 'd41d8cd98f00b204e9800998ecf8427e' })

    render(
      <SystemInfoModal
        data={ createElement(elementType, type) }
        onClose={ jest.fn() }
      />
    )

    expect(useAssetCustomSettingsGetByIdQuery).toHaveBeenCalledWith({ id: 7 }, { skip: true })
    expect(queryChecksum()).toBeNull()
  })
})
