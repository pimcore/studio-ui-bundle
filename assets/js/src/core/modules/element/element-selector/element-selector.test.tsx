/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => jest.requireActual('@test-utils/mocks/create-styles-mock'))

jest.mock('@Pimcore/components/tabs/tab-context-menu', () => ({
  TabContextMenu: () => null
}))

jest.mock('@sdk/modules/element', () => jest.requireActual('./provider/element-selector/element-selector-provider'))

jest.mock('@Pimcore/components/modal/modal', () => ({
  Modal: (props: Record<string, any>) => (props.open === true
    ? <div data-testid="element-selector">{ props.children }</div>
    : null)
}))

jest.mock('@Pimcore/modules/asset/element-selector/asset-selector-listing', () => ({
  AssetSelectorListing: () => <div>asset listing</div>
}))

jest.mock('@Pimcore/modules/data-object/element-selector/data-object-selector-listing', () => ({
  DataObjectSelectorListing: () => <div>object listing</div>
}))

jest.mock('@Pimcore/modules/document/element-selector/document-selector-listing', () => ({
  DocumentSelectorListing: () => <div>document listing</div>
}))

jest.mock('@Pimcore/modules/asset/services/asset-opening-service', () => ({ assetOpeningService: {} }))
jest.mock('@Pimcore/modules/document/services/document-opening-service', () => ({ documentOpeningService: {} }))
jest.mock('@Pimcore/modules/data-object/services/data-object-opening-service', () => ({ dataObjectOpeningService: {} }))

jest.mock('@Pimcore/app/public-api/api-gateway', () => ({ ApiGatewayEvent: jest.fn(), ApiGatewayEventType: {} }))

const mockFrame = { inIframe: false, parentOpen: jest.fn() }

jest.mock('@Pimcore/utils/iframe', () => ({
  ...jest.requireActual('@Pimcore/utils/iframe'),
  isInIframe: () => mockFrame.inIframe
}))

jest.mock('@Pimcore/app/public-api/helpers/api-helper', () => ({
  isPimcoreStudioApiAvailable: () => mockFrame.inIframe,
  getPimcoreStudioApi: () => ({ element: { openElementSelector: mockFrame.parentOpen } })
}))

// eslint-disable-next-line import/first
import '@testing-library/jest-dom'
// eslint-disable-next-line import/first
import React from 'react'
// eslint-disable-next-line import/first
import { fireEvent, render, screen } from '@testing-library/react'
// eslint-disable-next-line import/first
import {
  type ElementSelectorConfig,
  type ElementSelectorCustomTab,
  ElementSelectorProvider,
  SelectionType
} from './provider/element-selector/element-selector-provider'
// eslint-disable-next-line import/first
import { useElementSelector } from './provider/element-selector/use-element-selector'
// eslint-disable-next-line import/first
import { elementApi } from '@Pimcore/app/public-api/element/element-api'
// eslint-disable-next-line import/first
import { ApiGatewayEvent } from '@Pimcore/app/public-api/api-gateway'
// eslint-disable-next-line import/first
import { runInNewContext } from 'vm'

interface NewElement {
  type: string
  id: string
}

const Opener = ({ name, config }: { name: string, config: ElementSelectorConfig }): React.JSX.Element => {
  const { open } = useElementSelector(config)

  return <button onClick={ open }>{ name }</button>
}

const deliveryTab = (onFinish: jest.Mock, position?: 'start' | 'end'): ElementSelectorCustomTab<NewElement> => ({
  key: 'in-this-delivery',
  label: 'In this delivery',
  position,
  render: ({ finish, selectionType }) => (
    <button onClick={ () => { finish({ type: 'object', id: 'new:abc' }) } }>
      { `pick new element (${selectionType})` }
    </button>
  ),
  onFinish
})

const tabLabels = (): string[] => screen.getAllByRole('tab').map(tab => tab.textContent ?? '')

const renderSelector = (openers: Array<{ name: string, config: ElementSelectorConfig }>): void => {
  render(
    <ElementSelectorProvider>
      { openers.map(opener => (
        <Opener
          config={ opener.config }
          key={ opener.name }
          name={ opener.name }
        />
      )) }
    </ElementSelectorProvider>
  )
}

describe('ElementSelector custom tabs', () => {
  it('shows only the built-in tabs for a caller without custom tabs', () => {
    renderSelector([{ name: 'open', config: {} }])

    fireEvent.click(screen.getByText('open'))

    expect(tabLabels()).toEqual(['Assets', 'Objects', 'Documents'])
  })

  it('adds a caller tab after the built-in ones by default', () => {
    renderSelector([{ name: 'open', config: { customTabs: [deliveryTab(jest.fn())] } }])

    fireEvent.click(screen.getByText('open'))

    expect(tabLabels()).toEqual(['Assets', 'Objects', 'Documents', 'In this delivery'])
    expect(screen.getByRole('tab', { name: 'Assets' })).toHaveAttribute('aria-selected', 'true')
  })

  it('lists caller tabs at the start first, in their order, and selects the first', () => {
    const second = { ...deliveryTab(jest.fn(), 'start'), key: 'second', label: 'Second', render: () => null }
    const customTabs = [deliveryTab(jest.fn(), 'start'), second]
    renderSelector([{ name: 'open', config: { selectionType: SelectionType.Single, customTabs } }])

    fireEvent.click(screen.getByText('open'))

    expect(tabLabels()).toEqual(['In this delivery', 'Second', 'Assets', 'Objects', 'Documents'])
    expect(screen.getByRole('tab', { name: 'In this delivery' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText('pick new element (single)')).toBeInTheDocument()
  })

  it('keeps a caller tab whose key equals a built-in area apart from that area', () => {
    renderSelector([{ name: 'open', config: { customTabs: [{ ...deliveryTab(jest.fn()), key: 'asset' }] } }])

    fireEvent.click(screen.getByText('open'))
    fireEvent.click(screen.getByRole('tab', { name: 'In this delivery' }))
    expect(screen.getAllByRole('tab', { selected: true }).map(tab => tab.textContent)).toEqual(['In this delivery'])
  })

  it('hands the tab result to the tab own callback only and closes the selector', () => {
    const onTabFinish = jest.fn()
    const onFinish = jest.fn()

    renderSelector([{ name: 'open', config: { onFinish, customTabs: [deliveryTab(onTabFinish, 'start')] } }])

    fireEvent.click(screen.getByText('open'))
    fireEvent.click(screen.getByText('pick new element (multiple)'))

    expect(onTabFinish).toHaveBeenCalledTimes(1)
    expect(onTabFinish).toHaveBeenCalledWith({ type: 'object', id: 'new:abc' })
    expect(onFinish).not.toHaveBeenCalled()
    expect(screen.queryByTestId('element-selector')).not.toBeInTheDocument()
  })

  it('lets the tab close the selector without a result', () => {
    const onTabFinish = jest.fn()

    renderSelector([{
      name: 'open',
      config: {
        customTabs: [{
          key: 'cancel-only',
          label: 'Cancel only',
          position: 'start',
          render: ({ close }) => <button onClick={ close }>cancel</button>,
          onFinish: onTabFinish
        }]
      }
    }])

    fireEvent.click(screen.getByText('open'))
    fireEvent.click(screen.getByText('cancel'))

    expect(onTabFinish).not.toHaveBeenCalled()
    expect(screen.queryByTestId('element-selector')).not.toBeInTheDocument()
  })

  it('shows a caller tab alone when every built-in area is off', () => {
    renderSelector([{
      name: 'open',
      config: {
        areas: { asset: false, document: false, object: false },
        customTabs: [deliveryTab(jest.fn())]
      }
    }])

    fireEvent.click(screen.getByText('open'))

    expect(screen.queryAllByRole('tab')).toHaveLength(0)
    expect(screen.getByText('pick new element (multiple)')).toBeInTheDocument()
    expect(screen.queryByText('No areas configured')).not.toBeInTheDocument()
  })

  it('does not carry custom tabs over to the next caller', () => {
    renderSelector([
      { name: 'open with tab', config: { customTabs: [deliveryTab(jest.fn())] } },
      { name: 'open plain', config: {} }
    ])

    fireEvent.click(screen.getByText('open with tab'))
    expect(tabLabels()).toContain('In this delivery')

    fireEvent.click(screen.getByText('open plain'))
    expect(tabLabels()).toEqual(['Assets', 'Objects', 'Documents'])
  })

  describe('opened from an iframe', () => {
    beforeEach(() => {
      mockFrame.inIframe = true
      mockFrame.parentOpen = jest.fn()
      jest.spyOn(console, 'warn').mockImplementation(() => {})
    })

    afterEach(() => {
      mockFrame.inIframe = false
      jest.restoreAllMocks()
    })

    it('drops custom tabs before handing the config to the parent window', () => {
      const onFinish = jest.fn()
      renderSelector([{ name: 'open', config: { onFinish, customTabs: [deliveryTab(jest.fn())] } }])

      fireEvent.click(screen.getByText('open'))

      expect(mockFrame.parentOpen).toHaveBeenCalledTimes(1)
      expect(mockFrame.parentOpen).toHaveBeenCalledWith({ onFinish })
      expect(console.warn).toHaveBeenCalledTimes(1)
      expect(screen.queryByTestId('element-selector')).not.toBeInTheDocument()
    })

    it('hands a config without custom tabs to the parent window as it is', () => {
      const config: ElementSelectorConfig = { selectionType: SelectionType.Single, onFinish: jest.fn() }
      renderSelector([{ name: 'open', config }])

      fireEvent.click(screen.getByText('open'))

      expect(mockFrame.parentOpen).toHaveBeenCalledWith(config)
      expect(console.warn).not.toHaveBeenCalled()
    })

    it('drops custom tabs on the Window API path as well', () => {
      const onFinish = jest.fn()

      elementApi.openElementSelector({ onFinish, customTabs: [deliveryTab(jest.fn())] })

      expect(mockFrame.parentOpen).toHaveBeenCalledWith({ onFinish })
    })
  })

  describe('reached through the Window API from an iframe', () => {
    // getPimcoreStudioApi() hands an iframe this window's elementApi, so the call runs here, where isInIframe() is false.
    const openedConfig = (): ElementSelectorConfig => (ApiGatewayEvent as unknown as jest.Mock).mock.lastCall[1]

    beforeEach(() => {
      jest.spyOn(window, 'dispatchEvent').mockReturnValue(true)
      jest.spyOn(console, 'warn').mockImplementation(() => {})
    })

    afterEach(() => {
      jest.restoreAllMocks()
    })

    it('drops custom tabs whose render comes from another window', () => {
      const onFinish = jest.fn()
      const foreignRender = runInNewContext('(function render () { return null })')

      elementApi.openElementSelector({ onFinish, customTabs: [{ ...deliveryTab(jest.fn()), render: foreignRender }] })

      expect(openedConfig()).toEqual({ onFinish })
      expect(console.warn).toHaveBeenCalledTimes(1)
    })

    it('keeps custom tabs from this window', () => {
      const config: ElementSelectorConfig = { onFinish: jest.fn(), customTabs: [deliveryTab(jest.fn())] }

      elementApi.openElementSelector(config)

      expect(openedConfig()).toBe(config)
      expect(console.warn).not.toHaveBeenCalled()
    })
  })
})
