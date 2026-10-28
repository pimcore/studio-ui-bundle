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
import { HotspotImageFooter } from './footer'
import { type HotspotImageValue } from './hotspot-image'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

// antd-style ships untranspiled ESM. Styling is irrelevant to this behaviour.
jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => ({
  createStyles: () => () => ({ styles: {}, cx: (...classNames: unknown[]) => classNames.filter(Boolean).join(' '), theme: {} }),
  css: jest.fn(),
  cx: jest.fn(),
  keyframes: jest.fn()
}))

jest.mock('@Pimcore/components/icon/icon', () => ({
  Icon: () => <span />
}))

// The Studio dropdown pulls in the whole app graph; antd's dropdown triggers the same way.
jest.mock('@Pimcore/components/dropdown/dropdown', () => ({
  Dropdown: jest.requireActual('antd').Dropdown
}))

jest.mock('@Pimcore/components/button-group/button-group', () => ({
  ButtonGroup: ({ items }: { items: React.ReactNode[] }) => (
    <div>{items.map((item, index) => <span key={ index }>{item}</span>)}</div>
  )
}))

jest.mock('@Pimcore/modules/asset/hooks/use-asset-helper', () => ({
  useAssetHelper: () => ({ openAsset: jest.fn() })
}))

jest.mock('@Pimcore/components/message/useMessage', () => ({
  useMessage: () => ({ success: jest.fn() })
}))

jest.mock('@Pimcore/modules/element/element-selector/components/triggers/button/element-selector-button', () => ({
  ElementSelectorButton: () => null
}))

jest.mock('@Pimcore/modules/element/element-selector/provider/element-selector/element-selector-provider', () => ({
  SelectionType: { Single: 'single' }
}))

jest.mock('./hotspot-image', () => ({}))

describe('HotspotImageFooter', () => {
  it('shows a tooltip on the more button and still opens its menu', async () => {
    render(
      <HotspotImageFooter
        replaceImage={ jest.fn() }
        setCropModalOpen={ jest.fn() }
        setMarkerModalOpen={ jest.fn() }
        setValue={ jest.fn() }
        value={ { image: { type: 'asset', id: 1 }, hotspots: [], marker: [] } as unknown as HotspotImageValue }
      />
    )

    const button = screen.getByRole('button', { name: 'more-actions' })

    fireEvent.mouseEnter(button)
    expect(await screen.findByRole('tooltip')).toHaveTextContent('more-actions')

    fireEvent.click(button)
    expect(await screen.findByText('crop')).toBeInTheDocument()
  })
})
