/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type Meta, type StoryObj } from '@storybook/react/*'
import React from 'react'
import { Editor } from '@Pimcore/modules/field-definitions/components/editor'
import { ItemDetail } from '@Pimcore/modules/field-definitions/components/editor/items/detail'
import { type Layout } from '@Pimcore/modules/field-definitions/utils/layout-provider-factory'
import carLayout from './editor-review-layout.json'
import { FormAnnotationsProvider, type FormAnnotations, Form, Input, type TreeDataItem } from '@sdk/components'

/**
 * The editor in review mode: a proposed class definition rendered read-only, with the
 * change set's own decorations on the tree and on the selected field's settings.
 */
const config: Meta<typeof Editor> = {
  title: 'Modules/Field Definitions/Editor in review mode',
  component: Editor,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A change set proposing electric-vehicle data on the demo `Car` class. The tree, the settings forms and the type catalogue are the editor\'s own — review mode only takes the writes away and adds the decorations.'
      }
    }
  }
}

export default config

/** the live layout of the demo `Car` class, with the proposed field already in it */
const LAYOUT = carLayout as unknown as Layout

const GENERAL = {
  id: 'CAR',
  name: 'Car',
  title: 'Car',
  description: 'Vehicles offered in the sales portal',
  parentClass: '',
  allowInherit: true,
  allowVariants: true,
  showVariants: false
}

/** what the change set touches, by field name */
const CHANGES: Record<string, { status: 'added' | 'changed' | 'removed' | 'moved', note: string }> = {
  batteryCapacityKwh: { status: 'added', note: 'new field' },
  color: { status: 'changed', note: 'two options added' },
  series: { status: 'removed', note: '1,240 objects carry a value' },
  country: { status: 'moved', note: 'from Sale Information' }
}

const BADGE: Record<string, { bg: string, fg: string }> = {
  added: { bg: '#f6ffed', fg: '#2f7a12' },
  changed: { bg: '#fffbe6', fg: '#97600a' },
  removed: { bg: '#fff2f0', fg: '#b21d29' },
  moved: { bg: '#efeaf7', fg: '#635a7a' }
}

const decorateTreeItem = (item: TreeDataItem, { fieldDefinition }: { fieldDefinition: any }): TreeDataItem => {
  const change = CHANGES[fieldDefinition?.name as string]
  if (change === undefined) return item

  const tone = BADGE[change.status]

  return {
    ...item,
    title: (
      <span style={ { display: 'inline-flex', alignItems: 'center', gap: 8 } }>
        <span style={ { textDecoration: change.status === 'removed' ? 'line-through' : undefined } }>{item.title as React.ReactNode}</span>
        <span style={ {
          background: tone.bg,
          color: tone.fg,
          border: `1px solid ${tone.fg}33`,
          borderRadius: 4,
          padding: '0 6px',
          fontSize: 10,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '.03em'
        } }
        >{change.status}
        </span>
      </span>
    )
  }
}

/**
 * What the change set alters on the selected field. Keyed by form-item name, so only keys a
 * FIELD's settings carry are listed — the class's own general settings are untouched here and
 * must stay unannotated.
 */
const ANNOTATIONS: FormAnnotations = {
  options: { status: 'added', hint: 'two options added: Matte black, Racing green' },
  mandatory: { status: 'changed', hint: 'was: off' }
}

const GeneralSettingsFormFields = (): React.JSX.Element => (
  <>
    <Form.Item
      label="Name"
      name="name"
    ><Input /></Form.Item>
    <Form.Item
      label="Title"
      name="title"
    ><Input /></Form.Item>
    <Form.Item
      label="Description"
      name="description"
    ><Input /></Form.Item>
  </>
)

const query = (data: unknown): any => () => ({ data, isLoading: false, isFetching: false, refetch: () => {} })

export const ProposedClassDefinition: StoryObj<typeof Editor> = {
  render: () => (
    <div style={ { height: '780px' } }>
      <FormAnnotationsProvider annotations={ ANNOTATIONS }>
        <Editor
          GeneralSettingsFormFields={ GeneralSettingsFormFields }
          area={ ['class', 'review'] }
          decorateTreeItem={ decorateTreeItem }
          readOnly
          useDetailGeneralSettingsQuery={ query(GENERAL) }
          useDetailLayoutQuery={ query(LAYOUT) }
          useItemsQuery={ query({ items: [{ id: 'CAR', name: 'Car' }] }) }
          view={ <ItemDetail configuration={ { id: 'CAR', name: 'Car' } } /> }
        />
      </FormAnnotationsProvider>
    </div>
  )
}
