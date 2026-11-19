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
import { WelcomeScreenHelp } from './welcome-screen-help'

jest.mock('@Pimcore/components/form/form', () => {
  const { Form } = jest.requireActual('antd')
  // the real Conditional imports this mocked module, so it can only be loaded once the mock exists
  const Conditional = (props: object): React.JSX.Element => {
    const { Conditional: ActualConditional } = jest.requireActual('@Pimcore/components/form/conditional/conditional')
    return <ActualConditional { ...props } />
  }

  return { Form: { Item: Form.Item, useFormInstance: Form.useFormInstance, useWatch: Form.useWatch, Conditional } }
})
jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))

const HELP = 'user-management.welcomeScreen.help'

const renderForm = (welcomeScreen: boolean): void => {
  render(
    <Form initialValues={ { welcomeScreen } }>
      <Form.Item
        name="welcomeScreen"
        valuePropName="checked"
      >
        <input
          aria-label="welcome-screen"
          type="checkbox"
        />
      </Form.Item>
      <WelcomeScreenHelp />
    </Form>
  )
}

describe('WelcomeScreenHelp', () => {
  it('shows while the switch is on', () => {
    renderForm(false)

    fireEvent.click(screen.getByLabelText('welcome-screen'))
    expect(screen.getByText(HELP)).toBeInTheDocument()

    fireEvent.click(screen.getByLabelText('welcome-screen'))
    expect(screen.queryByText(HELP)).toBeNull()
  })
})
