import { type Meta } from '@storybook/react'
import { InheritanceOverlay } from './inheritance-overlay'
import { Card } from '@Pimcore/components/card/card'
import React from 'react'
import { Input } from 'antd'
import FormItem from 'antd/es/form/FormItem'

const config: Meta = {
  title: 'Visuals/Inheritance Overlay',
  component: InheritanceOverlay
}

export default config

const demoForm = <FormItem layout="vertical" label="Test Input Label"><Card style={{ width: 300, height: 300 }}><Input/></Card></FormItem>

export const Container = {
  args: {
    inherited: true,
    type: 'container',
    children: demoForm
  },
}

export const FormElement = {
  args: {
    inherited: true,
    type: 'form-element',
    children: demoForm
  },
}

export const Manual = {
  args: {
    inherited: true,
    type: 'manual',
    children: (
      <div>
        <h3>Manually place the "studio-inherited-overlay" class on the item which should contain the overlay</h3>
        <Card style={{ width: 300, height: 300 }}>
          <Card style={{ width: 100, height: 100 }} className="studio-inherited-overlay">
            Hello world
          </Card>
        </Card>
      </div>
    )
  },
}

export const Collection = {
  args: {
    inherited: true,
    type: 'collection',
    children: <Card style={{ width: 300, height: 300 }}>Hello world</Card>
  }
}