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
import { type Meta } from '@storybook/react'
import { Input } from 'antd'
import { Form } from '@Pimcore/components/form/form'
import { LabelExtraProvider } from '@Pimcore/components/form/item/provider/label-extra/label-extra-provider'
import {
  FieldLabel
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/label/field-label'
import { RestoreInheritanceAction } from './restore-inheritance-label-extra'

const config: Meta<typeof RestoreInheritanceAction> = {
  title: 'Modules/Data Object/Restore inheritance action',
  component: RestoreInheritanceAction,
  parameters: {
    layout: 'padded'
  },
  tags: ['autodocs']
}

export default config

export const _default = {
  args: {
    onRestore: () => {}
  }
}

/**
 * How the object editor shows it: at the end of a field label, on a field whose
 * inheritance was broken during the session. The field above has no action, so the
 * two labels show whether the action shifts the label text or the row.
 */
export const InAFieldLabel = {
  render: () => (
    <div style={ { width: 320 } }>
      <Form layout="vertical">
        <Form.Item
          label={ (
            <FieldLabel
              label="Name"
              name="name"
            />
          ) }
          name="name"
        >
          <Input />
        </Form.Item>

        <LabelExtraProvider extra={ <RestoreInheritanceAction onRestore={ () => {} } /> }>
          <Form.Item
            label={ (
              <FieldLabel
                label="Manufacturer"
                name="manufacturer"
              />
            ) }
            name="manufacturer"
          >
            <Input />
          </Form.Item>
        </LabelExtraProvider>
      </Form>
    </div>
  )
}
