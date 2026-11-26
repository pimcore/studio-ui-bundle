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
import { type IJsonModel } from 'flexlayout-react'
import { useAppSelector } from '@sdk/app'
import { getFocusInnerModelJson, initFocusMode } from './focus-mode'
import { FocusLayoutView } from './focus-layout-view'

jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => ({
  createStyles: () => () => ({ styles: {} })
}))

jest.mock('@sdk/app', () => ({
  useAppSelector: jest.fn()
}))

jest.mock('@Pimcore/modules/widget-manager/widget-manager-slice', () => ({
  selectInnerModel: jest.fn()
}))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

jest.mock('@Pimcore/components/button/button', () => ({
  Button: ({ href, children }: { href: string, children: React.ReactNode }) => <a href={ href }>{children}</a>
}))

jest.mock('@Pimcore/modules/widget-manager/widget-manager-inner-container', () => ({
  WidgetManagerInnerContainer: () => <div data-testid="inner-widget-manager" />
}))

const withTab = (): IJsonModel => {
  const model = getFocusInnerModelJson()
  model.layout.children = [{
    type: 'tabset',
    id: 'main_tabset',
    selected: 0,
    children: [{ type: 'tab', id: 'cr', name: 'cr', component: 'change-control-change-request', config: { label: 'Change request 42' } }]
  }]

  return model
}

describe('FocusLayoutView', () => {
  beforeEach(() => {
    initFocusMode({ href: 'https://studio.test/pimcore-studio/?changeRequest=abc&focus=1', search: '?changeRequest=abc&focus=1' } as unknown as Location, document)
  })

  it('shows the opened tab with its title and a link to the full Studio', () => {
    jest.mocked(useAppSelector).mockReturnValue(withTab())

    render(<FocusLayoutView />)

    expect(screen.getByText('Change request 42')).toBeInTheDocument()
    expect(screen.getByTestId('inner-widget-manager')).toBeInTheDocument()
    expect(screen.getByText('focus-view.open-in-studio').closest('a')).toHaveAttribute('href', '/pimcore-studio/?changeRequest=abc')
  })

  it('says so while no tab is open', () => {
    jest.mocked(useAppSelector).mockReturnValue(getFocusInnerModelJson())

    render(<FocusLayoutView />)

    expect(screen.getByText('focus-view.nothing-to-show')).toBeInTheDocument()
    expect(screen.queryByTestId('inner-widget-manager')).not.toBeInTheDocument()
  })
})
