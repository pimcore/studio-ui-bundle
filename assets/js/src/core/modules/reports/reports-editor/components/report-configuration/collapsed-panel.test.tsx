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
import { Form } from 'antd'
import { Panel } from '@Pimcore/components/panel'

jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => ({
  createStyles: () => () => ({ styles: {}, cx: () => '', theme: {} }),
  css: () => '',
  cx: () => '',
  keyframes: () => ''
}))

jest.mock('@Pimcore/components/icon/icon', () => ({ Icon: () => null }))

let submitted: Record<string, unknown> = {}

const Harness = (): React.JSX.Element => {
  const [form] = Form.useForm()

  return (
    <Form
      form={ form }
      initialValues={ { niceName: 'Cars', sharedGlobally: true } }
    >
      <Panel
        collapsed
        collapsible
        title="Collapsed"
      >
        <Form.Item name="niceName">
          <input data-testid="nice-name" />
        </Form.Item>
        <Form.Item name="sharedGlobally">
          <input data-testid="shared" />
        </Form.Item>
      </Panel>
      <button
        data-testid="save"
        onClick={ () => { submitted = form.getFieldsValue() } }
      />
    </Form>
  )
}

describe('collapsed Panel', () => {
  it('keeps its form fields mounted so they are part of the submitted values', () => {
    render(<Harness />)

    screen.getByTestId('save').click()

    expect(submitted).toEqual({ niceName: 'Cars', sharedGlobally: true })
  })
})
