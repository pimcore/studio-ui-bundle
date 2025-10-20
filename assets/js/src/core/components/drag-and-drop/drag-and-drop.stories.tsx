/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type Meta } from '@storybook/react'
import React, { useState } from 'react'
import { Draggable } from './draggable'
import { DNDDemoDroppableContent } from './__STORIES__/dnd-demo-droppable-content'
import { Button } from '../button/button'
import { Droppable } from './droppable'
import { HotspotDroppable } from './hotspot-droppable'
import { type DragAndDropInfo } from '@sdk/components'

const DragAndDropDemo = (): React.JSX.Element => {
  const [valueDemo1, setValueDemo1] = useState<any>('')
  const [valueDemo2, setValueDemo2] = useState<any>('')
  const [valueDemo3, setValueDemo3] = useState<any>('')

  return (
    <div style={ { display: 'flex', flexDirection: 'column', gap: 10 } }>
      <h3>Drag context 1</h3>
      <div style={ { display: 'flex', gap: 5 } }>
        <Draggable info={ { type: 'dnd-demo-1', title: 'Button 1', icon: { value: 'widget-default' }, data: { value: 'Button 1' } } }>
          <Button>Button 1</Button>
        </Draggable>

        <Draggable info={ { type: 'dnd-demo-1', title: 'Button 2', icon: { value: 'widget-default' }, data: { value: 'Button 2' } } }>
          <Button>Button 2</Button>
        </Draggable>

        <Draggable info={ { type: 'dnd-demo-1', title: 'Button 3', icon: { value: 'widget-default' }, data: { value: 'Button 3' } } }>
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
        <Draggable info={ { type: 'dnd-demo-2', title: 'Button 1', icon: { value: 'widget-default' }, data: { value: 'Button 1' } } }>
          <Button>Button 1</Button>
        </Draggable>

        <Draggable info={ { type: 'dnd-demo-2', title: 'Button 2', icon: { value: 'widget-default' }, data: { value: 'Button 2' } } }>
          <Button>Button 2</Button>
        </Draggable>

        <Draggable info={ { type: 'dnd-demo-2', title: 'Button 3', icon: { value: 'widget-default' }, data: { value: 'Button 3' } } }>
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
        <Draggable info={ { type: 'dnd-demo-3', title: 'Button 1', icon: { value: 'widget-default' }, data: { value: 'Button 1' } } }>
          <Button>Button 1</Button>
        </Draggable>

        <Draggable info={ { type: 'dnd-demo-3', title: 'Button 2', icon: { value: 'widget-default' }, data: { value: 'Button 2' } } }>
          <Button>Button 2</Button>
        </Draggable>

        <Draggable info={ { type: 'dnd-demo-3', title: 'Button 3', icon: { value: 'widget-default' }, data: { value: 'Button 3' } } }>
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

const HotspotDroppableDemo = (): React.JSX.Element => {
  const [hotspot1Value, setHotspot1Value] = useState<any>('')
  const [hotspot2Value, setHotspot2Value] = useState<any>('')
  const [hotspot3Value, setHotspot3Value] = useState<any>('')

  return (
    <div style={ { display: 'flex', flexDirection: 'column', gap: 20 } }>
      <h3>Hotspot Droppable Demo</h3>
      <div style={ { display: 'flex', gap: 5 } }>
        <Draggable info={ { type: 'hotspot-demo', title: 'Item A', icon: { value: 'widget-default' }, data: { value: 'Item A' } } }>
          <Button>Item A</Button>
        </Draggable>

        <Draggable info={ { type: 'hotspot-demo', title: 'Item B', icon: { value: 'widget-default' }, data: { value: 'Item B' } } }>
          <Button>Item B</Button>
        </Draggable>

        <Draggable info={ { type: 'other-demo', title: 'Wrong Context', icon: { value: 'widget-default' }, data: { value: 'Wrong Context' } } }>
          <Button variant="outlined">Wrong Context</Button>
        </Draggable>
      </div>

      <HotspotDroppable
        hotspots={[
          {
            id: 'hotspot1',
            position: { x: 0, y: 0, width: '100%', height: '25%' },
            variant: 'outline',
            shape: 'round',
            isValidContext: (info: DragAndDropInfo) => info.type === 'hotspot-demo',
            onDrop: (info: DragAndDropInfo) => { setHotspot1Value(info.data.value) },
            children: (
              <div style={ { 
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(82, 196, 26, 0.2)',
                border: '2px solid #52c41a',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 'bold'
              } }>
                Zone 1
              </div>
            )
          },
          {
            id: 'hotspot2',
            position: { x: 0, y: '25%', width: '100%', height: '50%' },
            variant: 'default',
            shape: 'angular',
            isValidContext: (info: DragAndDropInfo) => info.type === 'hotspot-demo',
            isValidData: (info: DragAndDropInfo) => info.data?.value === 'Item A',
            onDrop: (info: DragAndDropInfo) => { setHotspot2Value(info.data.value) },
            children: (
              <div style={ { 
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(24, 144, 255, 0.2)',
                border: '2px solid #1890ff',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: 'bold'
              } }>
                Zone 2 (A only)
              </div>
            )
          },
          {
            id: 'hotspot3',
            position: { x: 0, y: '75%', width: '100%', height: '25%' },
            variant: 'outline',
            shape: 'angular',
            isValidContext: (info: DragAndDropInfo) => info.type === 'hotspot-demo',
            isValidData: (info: DragAndDropInfo) => info.data?.value === 'Item B',
            onDrop: (info: DragAndDropInfo) => { setHotspot3Value(info.data.value) },
            children: (
              <div style={ { 
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(245, 34, 45, 0.2)',
                border: '2px solid #f5222d',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: 'bold'
              } }>
                Zone 3 (B only)
              </div>
            )
          }
        ]}
      >
        <div style={ { 
          width: 600,
          height: 400,
          padding: 20, 
          border: '2px dashed #ccc', 
          borderRadius: 8, 
          background: '#f9f9f9',
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="20" height="20" xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3Cpattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"%3E%3Cpath d="M 20 0 L 0 0 0 20" fill="none" stroke="%23e0e0e0" stroke-width="1"/%3E%3C/pattern%3E%3C/defs%3E%3Crect width="100%25" height="100%25" fill="url(%23grid)" /%3E%3C/svg%3E")',
          position: 'relative'
        } }>
          <h4 style={ { margin: '0 0 10px 0' } }>Image or Container with Coordinate-Based Hotspots</h4>
          <p style={ { margin: 0, fontSize: '14px', color: '#666' } }>
            Hotspots are positioned using coordinates relative to this container. 
            Try dragging items to the colored zones positioned at specific coordinates.
          </p>
          
          <div style={ { position: 'absolute', bottom: 10, left: 10, fontSize: '12px', color: '#999' } }>
            Dropped: Zone 1: {hotspot1Value || 'none'} | Zone 2: {hotspot2Value || 'none'} | Zone 3: {hotspot3Value || 'none'}
          </div>
        </div>
      </HotspotDroppable>
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

export const HotspotDemo = {
  render: HotspotDroppableDemo
}
