/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useGeneralSettings } from '@Pimcore/modules/field-definitions/components/editor/items/detail/general-settings-provider'
import { FormKit } from '@sdk/components'
import { isNil, isString, upperFirst } from 'lodash'
import React, { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Input } from '@Pimcore/components/input/input'
import { TextArea } from '@Pimcore/components/textarea/textarea'
import { IconSelector } from '@Pimcore/components/icon-selector/icon-selector'
import { Switch } from '@Pimcore/components/switch/switch'
import { Block } from '@Pimcore/components/block/block'
import { Form } from '@Pimcore/components/form/form'
import { Select } from '@Pimcore/components/select/select'
import { ObjectBricksGrid } from '@Pimcore/modules/class-definition/components/class-editor/object-bricks-grid'

const getPhpClassName = (name: string): string => {
  return "Pimcore\\Model\\DataObject\\" + upperFirst(name)
}

export const ClassDefinitionGeneralSettingsFormFields = (): React.JSX.Element => {
  const form = Form.useFormInstance()
  const nameValue = Form.useWatch('name', form)
  const classId = form.getFieldValue('id');

  useEffect(() => {
    if (isString(nameValue)) {
      const newPhpClassName = getPhpClassName(nameValue)
      const currentPhpClassName = form.getFieldValue('phpClassName')

      if (currentPhpClassName !== newPhpClassName) {
        form.setFieldValue('phpClassName', newPhpClassName, { triggerChange: true })
      }
    }
  }, [nameValue])

  return useMemo(() => (
    <>
      <FormKit.Panel title="General">
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please enter a name' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
      >
        <TextArea rows={3} />
      </Form.Item>

      <Form.Item
        label="ID"
        name="id"
      >
        <Input disabled />
      </Form.Item>

      <Form.Item
        label="PHP Class Name"
        name="phpClassName"
      >
        <Input disabled />
      </Form.Item>

      <Form.Item
        label="Group"
        name="group"
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Icon"
        name="icon"
      >
        <IconSelector />
      </Form.Item>

      <Form.Item
        label="Parent Class"
        name="parentClass"
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Implements Interfaces"
        name="implementsInterfaces"
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Listing Parent Class"
        name="listingParentClass"
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Use Traits"
        name="useTraits"
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Listing Use Traits"
        name="listingUseTraits"
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Link Generator Reference"
        name="linkGeneratorReference"
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Preview Generator Reference"
        name="previewGeneratorReference"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="allowInherit"
        valuePropName="checked"
      >
        <Switch labelRight="Allow Inheritance" />
      </Form.Item>

      <Form.Item
        name="allowVariants"
        valuePropName="checked"
      >
        <Switch labelRight="Allow Variants" />
      </Form.Item>

      <Form.Item
        name="showVariants"
        valuePropName="checked"
      >
        <Switch labelRight="Show Variants" />
      </Form.Item>

      <Form.Item
        name="showAppLoggerTab"
        valuePropName="checked"
      >
        <Switch labelRight="Show App Logger Tab" />
      </Form.Item>

      <Form.Item
        name="showFieldLookup"
        valuePropName="checked"
      >
        <Switch labelRight="Show Field Lookup" />
      </Form.Item>

      <Form.Item
        name="enableGridLocking"
        valuePropName="checked"
      >
        <Switch labelRight="Enable Grid Locking" />
      </Form.Item>

      <Form.Item
        name="encryption"
        valuePropName="checked"
      >
        <Switch labelRight="Encrypt Data" />
      </Form.Item>
      </FormKit.Panel>

      <FormKit.Panel title="Property Visibility">
      <Form.Item
        name={['propertyVisibility', 'grid', 'id']}
        valuePropName="checked"
      >
        <Switch labelRight="ID (Grid)" />
      </Form.Item>

      <Form.Item
        name={['propertyVisibility', 'search', 'id']}
        valuePropName="checked"
      >
        <Switch labelRight="ID (Search)" />
      </Form.Item>

      <Form.Item
        name={['propertyVisibility', 'grid', 'key']}
        valuePropName="checked"
      >
        <Switch labelRight="Key (Grid)" />
      </Form.Item>

      <Form.Item
        name={['propertyVisibility', 'search', 'key']}
        valuePropName="checked"
      >
        <Switch labelRight="Key (Search)" />
      </Form.Item>

      <Form.Item
        name={['propertyVisibility', 'grid', 'path']}
        valuePropName="checked"
      >
        <Switch labelRight="Path (Grid)" />
      </Form.Item>

      <Form.Item
        name={['propertyVisibility', 'search', 'path']}
        valuePropName="checked"
      >
        <Switch labelRight="Path (Search)" />
      </Form.Item>

      <Form.Item
        name={['propertyVisibility', 'grid', 'modificationDate']}
        valuePropName="checked"
      >
        <Switch labelRight="Modification Date (Grid)" />
      </Form.Item>

      <Form.Item
        name={['propertyVisibility', 'search', 'modificationDate']}
        valuePropName="checked"
      >
        <Switch labelRight="Modification Date (Search)" />
      </Form.Item>

      <Form.Item
        name={['propertyVisibility', 'grid', 'creationDate']}
        valuePropName="checked"
      >
        <Switch labelRight="Creation Date (Grid)" />
      </Form.Item>

      <Form.Item
        name={['propertyVisibility', 'search', 'creationDate']}
        valuePropName="checked"
      >
        <Switch labelRight="Creation Date (Search)" />
      </Form.Item>
      </FormKit.Panel>

      <Form.Item name="compositeIndices">
        <Block
          getItemTitle={(item, index) => item?.index ?? `Index ${index + 1}`}
          title="Composite Indices"
        >
          <Form.Item
            label="Index Name"
            name="index_key"
          >
            <Input placeholder="Enter index name" />
          </Form.Item>

          <Form.Item
            label="Type"
            name="index_type"
          >
            <Select
              options={[
                { label: 'Query', value: 'query' },
                { label: 'Localized Query', value: 'localized_query' },
                { label: 'Store', value: 'store' },
                { label: 'Localized Store', value: 'localized_store' }
              ]}
              placeholder="Select index type"
            />
          </Form.Item>

          <Form.Item
            label="Columns"
            name="index_columns"
          >
            <Input placeholder="Enter column names (comma-separated)" />
          </Form.Item>
        </Block>
      </Form.Item>

      {classId && (
        <FormKit.Panel title="Object Bricks">
          <ObjectBricksGrid classId={classId} />
        </FormKit.Panel>
      )}
    </>
  ), [])
}
