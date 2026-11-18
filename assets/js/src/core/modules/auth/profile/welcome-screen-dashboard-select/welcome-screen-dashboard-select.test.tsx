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
import { WelcomeScreenDashboardSelect } from './welcome-screen-dashboard-select'

const DASHBOARD_PATH = 'Reporting/Dashboards/Sales/Overview'
const DASHBOARD_ID = '0196a7c2_1b2d_7c3e_9f40_5a6b7c8d9e0f'

jest.mock('@Pimcore/app/depency-injection', () => ({
  container: { get: () => ({ getOptions: () => [{ id: '0196a7c2_1b2d_7c3e_9f40_5a6b7c8d9e0f', label: 'Overview' }] }) }
}))
jest.mock('@Pimcore/app/config/services/service-ids', () => ({ serviceIds: { 'WelcomeScreen/Registry': 'WelcomeScreen/Registry' } }))
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
  Select: ({ value, onChange, options, placeholder, 'aria-label': ariaLabel }: { value?: string | null, onChange?: (value: string) => void, options: Array<{ value: string, label: string }>, placeholder?: string, 'aria-label'?: string }) => (
    <select
      aria-label={ ariaLabel }
      data-has-value={ value !== undefined }
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

const renderForm = (welcomeScreenDashboardId: string | null, welcomeScreen = true, onValuesChange = jest.fn()): void => {
  render(
    <Form
      initialValues={ { welcomeScreen, welcomeScreenDashboardId } }
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
      <WelcomeScreenDashboardSelect />
    </Form>
  )
}

const SELECT_NAME = 'user-management.welcomeScreenDashboard'

const getSelect = (): HTMLSelectElement => screen.getByLabelText<HTMLSelectElement>(SELECT_NAME)

const renderSelect = (welcomeScreenDashboardId: string | null, onValuesChange = jest.fn()): HTMLSelectElement => {
  renderForm(welcomeScreenDashboardId, true, onValuesChange)

  return getSelect()
}

describe('WelcomeScreenDashboardSelect', () => {
  it('offers the options of the welcome screen registry, without a None option', () => {
    const select = renderSelect(null)

    expect(Array.from(select.options).map((option) => [option.value, option.text])).toEqual([
      [DASHBOARD_ID, 'Overview']
    ])
  })

  it('has no visible label, only an accessible name and a select prompt as placeholder', () => {
    const select = renderSelect(null)

    expect(screen.queryByText(SELECT_NAME)).toBeNull()
    expect(select.dataset.placeholder).toBe('user-management.welcomeScreenDashboard.placeholder')
  })

  it.each([[''], [null]])('passes no value when no dashboard is stored (%p), so the placeholder shows', (welcomeScreenDashboardId) => {
    expect(renderSelect(welcomeScreenDashboardId).dataset.hasValue).toBe('false')
  })

  it('shows the placeholder for a stored dashboard the user can no longer open, not its ID', () => {
    expect(renderSelect('0196a7c2_0000_7000_8000_000000000000').dataset.hasValue).toBe('false')
  })

  it('shows the placeholder for a navigation path stored before the switch to IDs', () => {
    expect(renderSelect(DASHBOARD_PATH).dataset.hasValue).toBe('false')
  })

  it('shows the stored dashboard', () => {
    expect(renderSelect(DASHBOARD_ID).value).toBe(DASHBOARD_ID)
  })

  it('sends the chosen dashboard', () => {
    const onValuesChange = jest.fn()
    const select = renderSelect(null, onValuesChange)

    fireEvent.change(select, { target: { value: DASHBOARD_ID } })

    expect(onValuesChange).toHaveBeenCalledWith(
      { welcomeScreenDashboardId: DASHBOARD_ID },
      { welcomeScreen: true, welcomeScreenDashboardId: DASHBOARD_ID }
    )
  })

  it('is hidden while the welcome screen switch is off', () => {
    renderForm(DASHBOARD_ID, false)

    expect(screen.queryByLabelText(SELECT_NAME)).toBeNull()
  })

  it('shows the kept choice again when the switch is turned off and on', () => {
    renderForm(DASHBOARD_ID)

    fireEvent.click(screen.getByLabelText('welcome-screen'))
    expect(screen.queryByLabelText(SELECT_NAME)).toBeNull()

    fireEvent.click(screen.getByLabelText('welcome-screen'))
    expect(getSelect().value).toBe(DASHBOARD_ID)
  })
})
