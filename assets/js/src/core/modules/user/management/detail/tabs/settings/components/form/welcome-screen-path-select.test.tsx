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
import { Form } from 'antd'
import { fireEvent, render, screen } from '@testing-library/react'
import { type IMainNavItem } from '@Pimcore/modules/app/base-layout/main-nav/services/main-nav-registry'
import { WelcomeScreenPathSelect } from './welcome-screen-path-select'

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
jest.mock('@Pimcore/components/form/form', () => {
  const { Form } = jest.requireActual('antd')
  // the real Conditional imports this mocked module, so it can only be loaded once the mock exists
  const Conditional = (props: object): React.JSX.Element => {
    const { Conditional: ActualConditional } = jest.requireActual('@Pimcore/components/form/conditional/conditional')
    return <ActualConditional { ...props } />
  }

  return { Form: { Item: Form.Item, useFormInstance: Form.useFormInstance, useWatch: Form.useWatch, Conditional } }
})
jest.mock('@Pimcore/components/select/select', () => ({
  Select: ({ value, onChange, options, placeholder }: { value?: string | null, onChange?: (value: string) => void, options: Array<{ value: string, label: string }>, placeholder?: string }) => (
    <select
      aria-label="welcome-screen-path"
      data-placeholder={ placeholder }
      onChange={ (event) => onChange?.(event.target.value) }
      value={ value ?? '' }
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

const renderForm = (welcomeScreenPath: string | null, welcomeScreen = true, onValuesChange = jest.fn()): void => {
  render(
    <Form
      initialValues={ { welcomeScreen, welcomeScreenPath } }
      onValuesChange={ onValuesChange }
    >
      <Form.Item
        name="welcomeScreen"
        valuePropName="checked"
      >
        <input
          aria-label="welcome-screen"
          type="checkbox"
        />
      </Form.Item>
      <WelcomeScreenPathSelect />
    </Form>
  )
}

const getSelect = (): HTMLSelectElement => screen.getByLabelText<HTMLSelectElement>('welcome-screen-path')

const renderSelect = (welcomeScreenPath: string | null, onValuesChange = jest.fn()): HTMLSelectElement => {
  renderForm(welcomeScreenPath, true, onValuesChange)

  return getSelect()
}

describe('WelcomeScreenPathSelect', () => {
  it('offers only the dashboard entries of the main navigation, without a None option', () => {
    const select = renderSelect(null)

    expect(Array.from(select.options).map((option) => [option.value, option.text])).toEqual([
      [DASHBOARD_PATH, 'Overview']
    ])
    expect(select.dataset.placeholder).toBe('user-management.welcomeScreenPath')
  })

  it('shows the stored dashboard', () => {
    expect(renderSelect(DASHBOARD_PATH).value).toBe(DASHBOARD_PATH)
  })

  it('sends the chosen dashboard', () => {
    const onValuesChange = jest.fn()
    const select = renderSelect(null, onValuesChange)

    fireEvent.change(select, { target: { value: DASHBOARD_PATH } })

    expect(onValuesChange).toHaveBeenCalledWith(
      { welcomeScreenPath: DASHBOARD_PATH },
      { welcomeScreen: true, welcomeScreenPath: DASHBOARD_PATH }
    )
  })

  it('is hidden while the welcome screen switch is off', () => {
    renderForm(DASHBOARD_PATH, false)

    expect(screen.queryByLabelText('welcome-screen-path')).toBeNull()
  })

  it('shows the kept choice again when the switch is turned off and on', () => {
    renderForm(DASHBOARD_PATH)

    fireEvent.click(screen.getByLabelText('welcome-screen'))
    expect(screen.queryByLabelText('welcome-screen-path')).toBeNull()

    fireEvent.click(screen.getByLabelText('welcome-screen'))
    expect(getSelect().value).toBe(DASHBOARD_PATH)
  })
})
