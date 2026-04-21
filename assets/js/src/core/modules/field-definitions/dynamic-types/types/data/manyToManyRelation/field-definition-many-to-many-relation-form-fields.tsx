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
import { Form, FormKit, Input, InputNumber, Select, Switch } from '@sdk/components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useClassDefinitionOptions } from '@Pimcore/modules/field-definitions/dynamic-types/hooks/use-class-definition-options'
import { useAssetTypeOptions } from '@Pimcore/modules/field-definitions/dynamic-types/hooks/use-asset-type-options'
import { useDocumentTypeOptions } from '@Pimcore/modules/field-definitions/dynamic-types/hooks/use-document-type-options'
import { relationSelectFormItemTransformation } from '@Pimcore/modules/field-definitions/dynamic-types/utils/relations-helper'

export const FieldDefinitionManyToManyRelationFormFields = (props: FieldDefinitionAbstractFormFieldsProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { options: classOptions } = useClassDefinitionOptions(true)
  const assetTypeOptions = useAssetTypeOptions()
  const documentTypeOptions = useDocumentTypeOptions()
  const isCustomLayout = props.context.area.includes('custom-layout')

  return (
    <>

      <Form.Item
        label={ t('width') }
        name="width"
        tooltip={ t('width-tooltip') }
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={ t('height') }
        name="height"
        tooltip={ t('height-tooltip') }
      >
        <Input />
      </Form.Item>

      {!isCustomLayout && (
      <>
        <Form.Item
          label={ t('maximum-items') }
          name="maxItems"
        >
          <InputNumber
            min={ 0 }
            precision={ 0 }
          />
        </Form.Item>

        <Form.Item
          label={ t('path-formatter-service') }
          name="pathFormatterClass"
        >
          <Input />
        </Form.Item>

        <Form.Item name="allowToClearRelation">
          <Switch labelRight={ t('allow-to-clear-relation') } />
        </Form.Item>

        <Form.Item name="enableTextSelection">
          <Switch labelRight={ t('enable-text-selection') } />
        </Form.Item>

        <FormKit.Panel
          border
          theme="fieldset"
          title={ t('document-restrictions') }
        >

          <Form.Item name="documentsAllowed">
            <Switch labelRight={ t('allow-documents') } />
          </Form.Item>

          <Form.Conditional condition={ (values) => values.documentsAllowed === true }>
            <Form.Item
              { ...relationSelectFormItemTransformation('documentTypes') }
              label={ t('allowed-document-types') }
              name="documentTypes"
            >
              <Select
                mode="multiple"
                options={ documentTypeOptions }
              />
            </Form.Item>
          </Form.Conditional>

        </FormKit.Panel>

        <FormKit.Panel
          border
          theme="fieldset"
          title={ t('asset-restrictions') }
        >

          <Form.Item name="assetsAllowed">
            <Switch labelRight={ t('allow-assets') } />
          </Form.Item>

          <Form.Conditional condition={ (values) => values.assetsAllowed === true }>
            <>
              <Form.Item name="assetInlineDownloadAllowed">
                <Switch labelRight={ t('asset-inline-download-allowed') } />
              </Form.Item>

              <Form.Item
                { ...relationSelectFormItemTransformation('assetTypes') }
                label={ t('allowed-asset-types') }
                name="assetTypes"
              >
                <Select
                  mode="multiple"
                  options={ assetTypeOptions }
                />
              </Form.Item>

              <Form.Item
                label={ t('upload-path') }
                name="assetUploadPath"
              >
                <Input />
              </Form.Item>
            </>
          </Form.Conditional>
        </FormKit.Panel>

        <FormKit.Panel
          border
          theme="fieldset"
          title={ t('object-restrictions') }
        >

          <Form.Item name="objectsAllowed">
            <Switch labelRight={ t('allow-objects') } />
          </Form.Item>

          <Form.Conditional condition={ (values) => values.objectsAllowed === true }>
            <Form.Item
              { ...relationSelectFormItemTransformation('classes') }
              label={ t('allowed-classes') }
              name="classes"
            >
              <Select
                mode="multiple"
                options={ classOptions }
                showSearch
              />
            </Form.Item>
          </Form.Conditional>
        </FormKit.Panel>
      </>
      )}
    </>
  )
}
