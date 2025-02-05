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

import { type Meta } from '@storybook/react'
import { InheritanceOverlay } from './inheritance-overlay'
import { Card } from '@Pimcore/components/card/card'
import React from 'react'
import { Input } from 'antd'
import FormItem from 'antd/es/form/FormItem'

const config: Meta = {
  title: 'Components/Visuals/Inheritance Overlay',
  component: InheritanceOverlay
}

export default config

const demoForm = (
  <FormItem
    label="Test Input Label"
    layout="vertical"
  ><Card style={ { width: 300, height: 300 } }><Input /></Card></FormItem>
)

export const FormItemContainer = {
  args: {
    inherited: true,
    type: 'form-item-container',
    children: demoForm
  }
}

export const FormElement = {
  args: {
    inherited: true,
    type: 'form-element',
    children: demoForm
  }
}

export const Manual = {
  args: {
    inherited: true,
    type: 'manual',
    children: (
      <div>
        <h3>Manually place the &quot;studio-inherited-overlay&quot; class on the item which should contain the overlay</h3>
        <Card style={ { width: 300, height: 300 } }>
          <Card
            className="studio-inherited-overlay"
            style={ { width: 100, height: 100 } }
          >
            Hello world
          </Card>
        </Card>
      </div>
    )
  }
}

export const Wrapper = {
  args: {
    inherited: true,
    type: 'wrapper',
    children: <Card style={ { width: 300, height: 300 } }>Hello world</Card>
  }
}
