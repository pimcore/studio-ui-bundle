/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

// TEMPORARY probe for the form-item annotation layout — reachable at ?annotationProbe=1
// without logging in. Delete this file and its branch in app-runner before merging.

import React from 'react'
import { App as AntApp, Select } from 'antd'
import { GlobalProvider } from './global-provider'
import { FormAnnotationsProvider } from '@Pimcore/components/form/annotations/form-annotations-provider'
import { Form, Switch } from '@sdk/components'

export const AnnotationProbe = (): React.JSX.Element => (
  <GlobalProvider>
    <AntApp>
      <div style={ { padding: 24, width: 560 } }>
        <FormAnnotationsProvider
          annotations={ {
            border: { status: 'added' },
            inherited: { status: 'removed' },
            layout: { status: 'changed', hint: 'was: fit' },
            title: { status: 'moved' }
          } }
        >
          <Form initialValues={ { border: true, inherited: false, layout: 'default', title: 'Name' } }>
            {/* the case under test: no label, the control carries its own text on the right */}
            <Form.Item name="border">
              <Switch labelRight="Cleanup Not Imported Elements" />
            </Form.Item>

            <Form.Item name="inherited">
              <Switch labelRight="Inherited" />
            </Form.Item>

            <Form.Item label="Layout" name="layout">
              <Select options={ [{ label: 'Default', value: 'default' }, { label: 'Fit', value: 'fit' }] } />
            </Form.Item>

            <Form.Item extra="own extra" label="Title" name="title">
              <input />
            </Form.Item>
          </Form>
        </FormAnnotationsProvider>
      </div>
    </AntApp>
  </GlobalProvider>
)
