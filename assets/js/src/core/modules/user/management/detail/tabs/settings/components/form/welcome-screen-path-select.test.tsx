/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type IMainNavItem } from '@Pimcore/modules/app/base-layout/main-nav/services/main-nav-registry'

const DASHBOARD_PATH = 'Reporting/Dashboards/Sales/Overview'

const mockNavItems: IMainNavItem[] = [{
  path: 'Reporting',
  children: [
    {
      path: 'Reporting/Dashboards',
      children: [
        {
          path: 'Reporting/Dashboards/Dashboards',
          label: 'navigation.dashboards-all',
          widgetConfig: { component: 'dashboard-container', id: 'dashboard-container', config: {} }
        },
        {
          path: 'Reporting/Dashboards/Sales',
          children: [{
            path: DASHBOARD_PATH,
            label: 'Overview',
            widgetConfig: { component: 'dashboard-single-container', id: '7', config: {} }
          }]
        }
      ]
    },
    {
      path: 'Reporting/Reports',
      label: 'navigation.reports',
      widgetConfig: { component: 'reports', id: 'reports', config: {} }
    }
  ]
}]

jest.mock('@Pimcore/modules/app/base-layout/main-nav/hooks/use-main-nav', () => ({ useMainNav: () => ({ navItems: mockNavItems }) }))
jest.mock('@Pimcore/components/form/form', () => ({ Form: jest.requireActual('antd').Form }))
jest.mock('@Pimcore/components/select/select', () => ({
  Select: ({ value, onChange, options }: { value?: string, onChange?: (value: string) => void, options: Array<{ value: string, label: string }> }) => (
    <select
      aria-label="welcome-screen-path"
      onChange={ (event) => onChange?.(event.target.value) }
      value={ value }
    >
      {options.map((option) => (
        <option
          key={ option.value }
          value={ option.value }
        >{option.label}</option>
      ))}
    </select>
  )
}))
jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))

// eslint-disable-next-line import/first
import React from 'react'
// eslint-disable-next-line import/first
import { Form } from 'antd'
// eslint-disable-next-line import/first
import { fireEvent, render, screen } from '@testing-library/react'
// eslint-disable-next-line import/first
import { WelcomeScreenPathSelect } from './welcome-screen-path-select'

const renderSelect = (welcomeScreenPath: string, onValuesChange = jest.fn()): HTMLSelectElement => {
  render(
    <Form
      initialValues={ { welcomeScreenPath } }
      onValuesChange={ onValuesChange }
    >
      <WelcomeScreenPathSelect />
    </Form>
  )

  return screen.getByLabelText<HTMLSelectElement>('welcome-screen-path')
}

describe('WelcomeScreenPathSelect', () => {
  it('offers only the dashboard entries of the main navigation', () => {
    const select = renderSelect('')

    expect(Array.from(select.options).map((option) => [option.value, option.text])).toEqual([
      ['', 'none'],
      [DASHBOARD_PATH, 'Overview']
    ])
  })

  it('shows the stored dashboard', () => {
    expect(renderSelect(DASHBOARD_PATH).value).toBe(DASHBOARD_PATH)
  })

  it('sends an empty string when the choice is removed, so the stored one is cleared', () => {
    const onValuesChange = jest.fn()
    const select = renderSelect(DASHBOARD_PATH, onValuesChange)

    fireEvent.change(select, { target: { value: '' } })

    expect(onValuesChange).toHaveBeenCalledWith({ welcomeScreenPath: '' }, { welcomeScreenPath: '' })
  })
})
