/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type FieldDefinitionAbstractFormFieldsProps } from '@Pimcore/modules/field-definitions/dynamic-types/dynamic-type-field-definition-abstract'
import { Form, FormKit, Input, Select, Switch } from '@sdk/components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useClassDefinitionOptions } from '@Pimcore/modules/field-definitions/dynamic-types/hooks/use-class-definition-options'
import { useAssetTypeOptions } from '@Pimcore/modules/field-definitions/dynamic-types/hooks/use-asset-type-options'
import { useDocumentTypeOptions } from '@Pimcore/modules/field-definitions/dynamic-types/hooks/use-document-type-options'

export const FieldDefinitionManyToManyFormFields = (props: FieldDefinitionAbstractFormFieldsProps): React.JSX.Element => {
  const { t } = useTranslation()
  const classOptions = useClassDefinitionOptions(true)
  const assetTypeOptions = useAssetTypeOptions()
  const documentTypeOptions = useDocumentTypeOptions()

  return (
    <FormKit.Panel title={ t('specific-settings') }>
      <Form.Item
        label={ t('width') }
        name="width"
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={ t('height') }
        name="height"
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={ t('allowed-asset-types') }
        name="assetTypes"
      >
        <Select
          mode="multiple"
          options={ assetTypeOptions }
        />
      </Form.Item>

      <Form.Item
        label={ t('allowed-document-types') }
        name="documentTypes"
      >
        <Select
          mode="multiple"
          options={ documentTypeOptions }
        />
      </Form.Item>

      <Form.Item
        label={ t('allowed-classes') }
        name="classes"
      >
        <Select
          mode="multiple"
          options={ classOptions }
          showSearch
        />
      </Form.Item>

      <Form.Item
        label={ t('path-formatter-service') }
        name="pathFormatterService"
      >
        <Input />
      </Form.Item>

      <Form.Item name="remoteOwner">
        <Switch labelRight={ t('remote-owner') } />
      </Form.Item>
    </FormKit.Panel>
  )
}
