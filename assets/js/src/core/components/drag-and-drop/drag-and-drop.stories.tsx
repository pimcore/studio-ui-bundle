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
import React, { useState } from 'react'
import { Draggable } from './draggable'
import { DNDDemoDroppableContent } from './__STORIES__/dnd-demo-droppable-content'
import { Button } from '../button/button'
import { Droppable } from './droppable'
import { type DragAndDropInfo } from './context-provider'

const DragAndDropDemo = (): React.JSX.Element => {
  const [valueDemo1, setValueDemo1] = useState<any>('')
  const [valueDemo2, setValueDemo2] = useState<any>('')
  const [valueDemo3, setValueDemo3] = useState<any>('')

  return (
    <div style={ { display: 'flex', flexDirection: 'column', gap: 10 } }>
      <h3>Drag context 1</h3>
      <div style={ { display: 'flex', gap: 5 } }>
        <Draggable info={ { type: 'dnd-demo-1', title: 'Button 1', icon: 'widget-default', data: { value: 'Button 1' } } }>
          <Button>Button 1</Button>
        </Draggable>

        <Draggable info={ { type: 'dnd-demo-1', title: 'Button 2', icon: 'widget-default', data: { value: 'Button 2' } } }>
          <Button>Button 2</Button>
        </Draggable>

        <Draggable info={ { type: 'dnd-demo-1', title: 'Button 3', icon: 'widget-default', data: { value: 'Button 3' } } }>
          <Button>Button 3</Button>
        </Draggable>
      </div>

      <Droppable
        isValidContext={ (info: DragAndDropInfo) => info.type === 'dnd-demo-1' }
        onDrop={ (info: DragAndDropInfo) => { setValueDemo1(info.data.value) } }
      >
        <DNDDemoDroppableContent
          title="Only draggable items from context 1 allowed"
          value={ valueDemo1 }
        />
      </Droppable>

      <h3>Drag context 2</h3>
      <div style={ { display: 'flex', gap: 5 } }>
        <Draggable info={ { type: 'dnd-demo-2', title: 'Button 1', icon: 'widget-default', data: { value: 'Button 1' } } }>
          <Button>Button 1</Button>
        </Draggable>

        <Draggable info={ { type: 'dnd-demo-2', title: 'Button 2', icon: 'widget-default', data: { value: 'Button 2' } } }>
          <Button>Button 2</Button>
        </Draggable>

        <Draggable info={ { type: 'dnd-demo-2', title: 'Button 3', icon: 'widget-default', data: { value: 'Button 3' } } }>
          <Button>Button 3</Button>
        </Draggable>
      </div>

      <Droppable
        isValidContext={ (info: DragAndDropInfo) => info.type === 'dnd-demo-2' }
        onDrop={ (info: DragAndDropInfo) => { setValueDemo2(info.data.value) } }
      >
        <DNDDemoDroppableContent
          title="Only draggable items from context 2 allowed"
          value={ valueDemo2 }
        />
      </Droppable>

      <h3>Drag context 3</h3>
      <div style={ { display: 'flex', gap: 5 } }>
        <Draggable info={ { type: 'dnd-demo-3', title: 'Button 1', icon: 'widget-default', data: { value: 'Button 1' } } }>
          <Button>Button 1</Button>
        </Draggable>

        <Draggable info={ { type: 'dnd-demo-3', title: 'Button 2', icon: 'widget-default', data: { value: 'Button 2' } } }>
          <Button>Button 2</Button>
        </Draggable>

        <Draggable info={ { type: 'dnd-demo-3', title: 'Button 3', icon: 'widget-default', data: { value: 'Button 3' } } }>
          <Button>Button 3</Button>
        </Draggable>
      </div>

      <Droppable
        isValidContext={ (info: DragAndDropInfo) => info.type === 'dnd-demo-3' }
        isValidData={ (info: DragAndDropInfo) => info.data?.value === 'Button 3' }
        onDrop={ (info: DragAndDropInfo) => { setValueDemo3(info.data.value) } }
      >
        <DNDDemoDroppableContent
          title="Validates data and only accepts button 3"
          value={ valueDemo3 }
        />
      </Droppable>
    </div>
  )
}

const config: Meta = {
  title: 'Components/Controls/DragAndDrop',
  component: DragAndDropDemo,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default config

export const _default = {}
