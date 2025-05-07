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
import { Form, type FormItemProps } from 'antd'

interface FormItemWrapperProps extends FormItemProps {
  children?: React.JSX.Element
}

export const FormItemWrapper = ({
  children,
  ...props
}: FormItemWrapperProps): React.JSX.Element => {
  return (
    <Form.Item
      { ...props }
    >
      {children}
    </Form.Item>
  )
}
