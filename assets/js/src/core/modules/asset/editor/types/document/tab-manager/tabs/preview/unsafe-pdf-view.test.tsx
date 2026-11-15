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
import { fireEvent, render, screen } from '@testing-library/react'
import { UnsafePdfView } from './unsafe-pdf-view'

const mockSettings: { asset_frontend_prefix: string | null } = { asset_frontend_prefix: null }

jest.mock('@Pimcore/modules/app/settings/hooks/use-settings', () => ({
  useSettings: () => mockSettings
}))

jest.mock('@Pimcore/app/config/app-config', () => ({
  currentDomain: 'https://studio.example.com'
}))

jest.mock('@Pimcore/app/api/pimcore/route', () => ({
  getPrefix: () => '/pimcore-studio/api'
}))

jest.mock('./unsafe-pdf-view.styles', () => ({
  useStyle: () => ({ styles: {} })
}))

jest.mock('@Pimcore/components/button/button', () => ({
  Button: ({ children, onClick }: { children: React.ReactNode, onClick: () => void }) => (
    <button onClick={ onClick }>{children}</button>
  )
}))

jest.mock('@Pimcore/components/flex/flex', () => ({
  Flex: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}))

jest.mock('@Pimcore/components/box/box', () => ({
  Box: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}))

jest.mock('antd', () => ({
  Image: () => <img alt="" />
}))

jest.mock('@sdk/components', () => ({
  Spin: () => <span />
}))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

describe('UnsafePdfView', () => {
  let openSpy: jest.SpyInstance

  beforeEach(() => {
    openSpy = jest.spyOn(window, 'open').mockImplementation(() => null)
  })

  afterEach(() => {
    openSpy.mockRestore()
    mockSettings.asset_frontend_prefix = null
  })

  const clickOpenInNewWindow = (): void => {
    render(
      <UnsafePdfView
        assetId={ 7 }
        fullPath="/documents/large.pdf"
      />
    )

    fireEvent.click(screen.getByText('asset.asset-editor-tabs.preview.open-in-new-window'))
  }

  it('opens the asset through the configured asset frontend prefix', () => {
    mockSettings.asset_frontend_prefix = 'https://cdn.example.com/assets'

    clickOpenInNewWindow()

    expect(openSpy).toHaveBeenCalledWith('https://cdn.example.com/assets/documents/large.pdf', '_blank')
  })

  it('opens the asset on the current domain when no prefix is configured', () => {
    clickOpenInNewWindow()

    expect(openSpy).toHaveBeenCalledWith('https://studio.example.com/documents/large.pdf', '_blank')
  })
})
