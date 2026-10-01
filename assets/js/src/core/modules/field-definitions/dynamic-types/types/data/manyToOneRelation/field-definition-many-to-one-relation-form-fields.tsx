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
import React, { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useClassDefinitionOptions } from '@Pimcore/modules/field-definitions/dynamic-types/hooks/use-class-definition-options'
import { useAssetTypeOptions } from '@Pimcore/modules/field-definitions/dynamic-types/hooks/use-asset-type-options'
import { useDocumentTypeOptions } from '@Pimcore/modules/field-definitions/dynamic-types/hooks/use-document-type-options'
import { relationSelectFormItemTransformation } from '@Pimcore/modules/field-definitions/dynamic-types/utils/relations-helper'
import { ManyToOneRelationPath } from '@Pimcore/components/many-to-one-relation'
import {
  supportsInlineSearch
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/relations/inline-search'

export const FieldDefinitionManyToOneRelationFormFields = (props: FieldDefinitionAbstractFormFieldsProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { options: classOptions } = useClassDefinitionOptions(true)
  const assetTypeOptions = useAssetTypeOptions()
  const documentTypeOptions = useDocumentTypeOptions()
  const form = Form.useFormInstance()
  const displayMode = Form.useWatch('displayMode')
  const objectsAllowed = Form.useWatch<boolean | undefined>('objectsAllowed')
  const assetsAllowed = Form.useWatch<boolean | undefined>('assetsAllowed')
  const documentsAllowed = Form.useWatch<boolean | undefined>('documentsAllowed')
  const classes = Form.useWatch<Array<{ classes: string }> | undefined>('classes')
  const isCustomLayout = props.context.area.includes('custom-layout')

  // The data component only renders the inline search for a relation restricted to
  // objects of a single class. Offering the display mode for anything else would
  // store a setting that then does nothing.
  const inlineSearchAvailable = useMemo(
    () => supportsInlineSearch({ objectsAllowed, assetsAllowed, documentsAllowed, classes }),
    [objectsAllowed, assetsAllowed, documentsAllowed, classes]
  )

  useEffect(() => {
    if (displayMode === null) {
      form.setFieldValue('displayMode', 'grid')
    }
  }, [displayMode, form])

  return (
    <>
      <Form.Item
        label={ t('width') }
        name="width"
        tooltip={ t('width-tooltip') }
      >
        <Input />
      </Form.Item>

      {!isCustomLayout && (
        <>
          <Form.Item
            label={ t('path-formatter-service') }
            name="pathFormatterClass"
          >
            <Input />
          </Form.Item>

          <Form.Item name="allowToClearRelation">
            <Switch labelRight={ t('allow-to-clear-relation') } />
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
                  <ManyToOneRelationPath
                    allowToClearRelation
                    allowedAssetTypes={ ['folder'] }
                    assetsAllowed
                  />
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

          <Form.Item
            label={ t('display-mode') }
            name="displayMode"
            tooltip={ inlineSearchAvailable ? undefined : t('display-mode-inline-search-unavailable-tooltip') }
          >
            <Select
              options={ [
                { label: t('display-mode-display'), value: 'grid' },
                {
                  label: t('display-mode-inline-search'),
                  value: 'combo',
                  // Kept in the list so a stored value still renders its label
                  // rather than the raw 'combo'.
                  disabled: !inlineSearchAvailable
                }
              ] }
            />
          </Form.Item>
        </>
      )}
    </>
  )
}
