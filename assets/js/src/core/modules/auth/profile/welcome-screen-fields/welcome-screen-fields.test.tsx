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
import { WelcomeScreenFields } from './welcome-screen-fields'

const TARGET = 'studio-dashboards:0196a7c2_1b2d_7c3e_9f40_5a6b7c8d9e0f'

jest.mock('@Pimcore/app/depency-injection', () => ({
  container: { get: () => ({ getOptions: () => [{ target: 'studio-dashboards:0196a7c2_1b2d_7c3e_9f40_5a6b7c8d9e0f', label: 'Overview' }] }) }
}))
jest.mock('@Pimcore/app/config/services/service-ids', () => ({ serviceIds: { 'WelcomeScreen/Registry': 'WelcomeScreen/Registry' } }))
jest.mock('@Pimcore/components/form/form', () => {
  const { Form } = jest.requireActual('antd')

  return { Form: { Item: Form.Item, useFormInstance: Form.useFormInstance, useWatch: Form.useWatch } }
})
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

const SWITCH_NAME = 'user-management.welcomeScreen'
const SELECT_NAME = 'user-management.welcomeScreenDashboard'

const renderFields = (welcomeScreenTarget: string | null, welcomeScreen = true, onValuesChange = jest.fn()): void => {
  render(
    <Form
      initialValues={ { welcomeScreen, welcomeScreenTarget } }
      onValuesChange={ onValuesChange }
    >
      <WelcomeScreenFields />
    </Form>
  )
}

const getSelect = (): HTMLSelectElement => screen.getByLabelText<HTMLSelectElement>(SELECT_NAME)

describe('WelcomeScreenFields', () => {
  it('offers the targets of the welcome screen registry with their labels as they are, without a None option', () => {
    renderFields(null)

    expect(Array.from(getSelect().options).map((option) => [option.value, option.text])).toEqual([[TARGET, 'Overview']])
  })

  it('has no visible select label, only an accessible name and a select prompt as placeholder', () => {
    renderFields(null)

    expect(screen.queryByText(SELECT_NAME)).toBeNull()
    expect(getSelect().dataset.placeholder).toBe('user-management.welcomeScreenDashboard.placeholder')
  })

  it.each([
    ['nothing is stored', null],
    ['the choice was cleared', ''],
    ['the stored target cannot be opened any more', 'studio-dashboards:0196a7c2_0000_7000_8000_000000000000']
  ])('shows the placeholder when %s', (_, welcomeScreenTarget) => {
    renderFields(welcomeScreenTarget)

    expect(getSelect().dataset.hasValue).toBe('false')
  })

  it('shows and sends the chosen target', () => {
    const onValuesChange = jest.fn()
    renderFields(null, true, onValuesChange)

    fireEvent.change(getSelect(), { target: { value: TARGET } })

    expect(getSelect().value).toBe(TARGET)
    expect(onValuesChange).toHaveBeenCalledWith({ welcomeScreenTarget: TARGET }, { welcomeScreen: true, welcomeScreenTarget: TARGET })
  })

  it('hides the select while the switch is off and shows the kept choice again when it is turned on', () => {
    renderFields(TARGET)

    fireEvent.click(screen.getByLabelText(SWITCH_NAME))
    expect(screen.queryByLabelText(SELECT_NAME)).toBeNull()

    fireEvent.click(screen.getByLabelText(SWITCH_NAME))
    expect(getSelect().value).toBe(TARGET)
  })
})
