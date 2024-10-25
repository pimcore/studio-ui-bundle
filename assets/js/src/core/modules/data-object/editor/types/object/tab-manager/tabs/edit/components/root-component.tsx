/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import React from 'react'
import { type _layout } from '../data/layout'
import { ObjectComponent } from './object-component'
import { Form } from '@Pimcore/components/form/form'
import { Button } from 'antd'

interface RootComponentProps {
  layout: typeof _layout
}

export const RootComponent = ({ layout }: RootComponentProps): React.JSX.Element => {
  return (
    <Form onFinish={ onFinish }>
      <ObjectComponent { ...layout } />

      <Form.Item>
        <Button
          htmlType="submit"
          type="primary"
        >Submit</Button>
      </Form.Item>
    </Form>
  )

  function onFinish (values: any): void {
    console.log(values)
  }
}
