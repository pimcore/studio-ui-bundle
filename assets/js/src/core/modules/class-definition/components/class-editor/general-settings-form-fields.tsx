/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { FormKit } from '@sdk/components'
import { isNil, isString, upperFirst } from 'lodash'
import React, { useEffect, useMemo } from 'react'
import { Input } from '@Pimcore/components/input/input'
import { TextArea } from '@Pimcore/components/textarea/textarea'
import { IconSelector } from '@Pimcore/components/icon-selector/icon-selector'
import { Switch } from '@Pimcore/components/switch/switch'
import { Form } from '@Pimcore/components/form/form'
import { ObjectBricksGrid } from '@Pimcore/modules/class-definition/components/class-editor/object-bricks-grid'
import { CompositeIndicesBlock } from '@Pimcore/modules/class-definition/components/class-editor/composite-indices-block'
import { useTranslation } from 'react-i18next'

const getPhpClassName = (name: string): string => {
  return 'Pimcore\\Model\\DataObject\\' + upperFirst(name)
}

export const ClassDefinitionGeneralSettingsFormFields = (): React.JSX.Element => {
  const { t } = useTranslation()
  const form = Form.useFormInstance()
  const nameValue = Form.useWatch('name', form)
  const classId = form.getFieldValue('id')

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
      <FormKit.Panel title={ t('class-definition.general-settings.title') }>
        <Form.Item
          label={ t('name') }
          name="name"
          rules={ [{ required: true, message: t('class-definition.general-settings.enter-name') }] }
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={ t('class-definition.general-settings.description') }
          name="description"
        >
          <TextArea rows={ 3 } />
        </Form.Item>

        <Form.Item
          label={ t('class-definition.general-settings.id') }
          name="id"
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          label={ t('class-definition.general-settings.php-class-name') }
          name="phpClassName"
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          label={ t('class-definition.general-settings.group') }
          name="group"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={ t('class-definition.general-settings.icon') }
          name="icon"
        >
          <IconSelector />
        </Form.Item>

        <Form.Item
          label={ t('class-definition.general-settings.parent-class') }
          name="parentClass"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={ t('class-definition.general-settings.implements-interfaces') }
          name="implementsInterfaces"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={ t('class-definition.general-settings.listing-parent-class') }
          name="listingParentClass"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={ t('class-definition.general-settings.use-traits') }
          name="useTraits"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={ t('class-definition.general-settings.listing-use-traits') }
          name="listingUseTraits"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={ t('class-definition.general-settings.link-generator-reference') }
          name="linkGeneratorReference"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={ t('class-definition.general-settings.preview-generator-reference') }
          name="previewGeneratorReference"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="allowInherit"
          valuePropName="checked"
        >
          <Switch labelRight={ t('class-definition.general-settings.allow-inherit') } />
        </Form.Item>

        <Form.Item
          name="allowVariants"
          valuePropName="checked"
        >
          <Switch labelRight={ t('class-definition.general-settings.allow-variants') } />
        </Form.Item>

        <Form.Item
          name="showVariants"
          valuePropName="checked"
        >
          <Switch labelRight={ t('class-definition.general-settings.show-variants') } />
        </Form.Item>

        <Form.Item
          name="showAppLoggerTab"
          valuePropName="checked"
        >
          <Switch labelRight={ t('class-definition.general-settings.show-app-logger-tab') } />
        </Form.Item>

        <Form.Item
          name="showFieldLookup"
          valuePropName="checked"
        >
          <Switch labelRight={ t('class-definition.general-settings.show-field-lookup') } />
        </Form.Item>

        <Form.Item
          name="enableGridLocking"
          valuePropName="checked"
        >
          <Switch labelRight={ t('class-definition.general-settings.enable-grid-locking') } />
        </Form.Item>

        <Form.Item
          name="encryption"
          valuePropName="checked"
        >
          <Switch labelRight={ t('class-definition.general-settings.encrypt-data') } />
        </Form.Item>
      </FormKit.Panel>

      <FormKit.Panel title={ t('class-definition.property-visibility.title') }>
        <Form.Item
          name={ ['propertyVisibility', 'grid', 'id'] }
          valuePropName="checked"
        >
          <Switch labelRight={ t('class-definition.property-visibility.id-grid') } />
        </Form.Item>

        <Form.Item
          name={ ['propertyVisibility', 'search', 'id'] }
          valuePropName="checked"
        >
          <Switch labelRight={ t('class-definition.property-visibility.id-search') } />
        </Form.Item>

        <Form.Item
          name={ ['propertyVisibility', 'grid', 'key'] }
          valuePropName="checked"
        >
          <Switch labelRight={ t('class-definition.property-visibility.key-grid') } />
        </Form.Item>

        <Form.Item
          name={ ['propertyVisibility', 'search', 'key'] }
          valuePropName="checked"
        >
          <Switch labelRight={ t('class-definition.property-visibility.key-search') } />
        </Form.Item>

        <Form.Item
          name={ ['propertyVisibility', 'grid', 'path'] }
          valuePropName="checked"
        >
          <Switch labelRight={ t('class-definition.property-visibility.path-grid') } />
        </Form.Item>

        <Form.Item
          name={ ['propertyVisibility', 'search', 'path'] }
          valuePropName="checked"
        >
          <Switch labelRight={ t('class-definition.property-visibility.path-search') } />
        </Form.Item>

        <Form.Item
          initialValue
          name={ ['propertyVisibility', 'grid', 'published'] }
          valuePropName="checked"
        >
          <Switch labelRight={ t('class-definition.property-visibility.published-grid') } />
        </Form.Item>

        <Form.Item
          initialValue
          name={ ['propertyVisibility', 'search', 'published'] }
          valuePropName="checked"
        >
          <Switch labelRight={ t('class-definition.property-visibility.published-search') } />
        </Form.Item>

        <Form.Item
          name={ ['propertyVisibility', 'grid', 'modificationDate'] }
          valuePropName="checked"
        >
          <Switch labelRight={ t('class-definition.property-visibility.modification-date-grid') } />
        </Form.Item>

        <Form.Item
          name={ ['propertyVisibility', 'search', 'modificationDate'] }
          valuePropName="checked"
        >
          <Switch labelRight={ t('class-definition.property-visibility.modification-date-search') } />
        </Form.Item>

        <Form.Item
          name={ ['propertyVisibility', 'grid', 'creationDate'] }
          valuePropName="checked"
        >
          <Switch labelRight={ t('class-definition.property-visibility.creation-date-grid') } />
        </Form.Item>

        <Form.Item
          name={ ['propertyVisibility', 'search', 'creationDate'] }
          valuePropName="checked"
        >
          <Switch labelRight={ t('class-definition.property-visibility.creation-date-search') } />
        </Form.Item>
      </FormKit.Panel>

      <CompositeIndicesBlock />

      {!isNil(classId) && (
        <FormKit.Panel title={ t('class-definition.object-bricks.title') }>
          <ObjectBricksGrid classId={ classId } />
        </FormKit.Panel>
      )}
    </>
  ), [])
}
