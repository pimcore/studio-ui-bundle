/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type FieldDefinitionAbstractFormFieldsProps, type FieldDefinitionContext } from '@Pimcore/modules/field-definitions/dynamic-types/dynamic-type-field-definition-abstract'
import { useSyncTitleFromName } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/_abstracts/use-sync-title-from-name'
import { Form, FormKit, Input, Switch, TextArea } from '@sdk/components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { kebabCase } from 'lodash'

// A Classification Store key reads none of these options; the one it does read is `indexed` below.
const CLASSIFICATION_STORE_HIDDEN_OPTIONS: Partial<FieldDefinitionContext> = {
  hideMandatory: true,
  hideIndex: true,
  hideUnique: true,
  hideVisibleGridView: true,
  hideVisibleSearch: true
}

export const FieldDefinitionDataFormFields = (props: FieldDefinitionAbstractFormFieldsProps): React.JSX.Element => {
  useSyncTitleFromName()
  const { t } = useTranslation()
  const isCustomLayout = props.context.area.includes('custom-layout')
  const isClassificationStore = props.context.area.includes('classification-store')
  const context = isClassificationStore
    ? { ...props.context, ...CLASSIFICATION_STORE_HIDDEN_OPTIONS }
    : props.context
  const typeTranslation = t('field-definition.' + kebabCase(props.type))
  const panelTitle = `${props.id} (${t('type')}: ${typeTranslation})`

  return (
    <FormKit.Panel title={ panelTitle }>
      <Form.Item
        label={ t('name') }
        name="name"
      >
        <Input disabled={ isCustomLayout || context.disableName } />
      </Form.Item>

      <Form.Item
        label={ t('title') }
        name="title"
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={ t('tooltip') }
        name="tooltip"
      >
        <TextArea />
      </Form.Item>

      {context.hideMandatory !== true && (
      <Form.Item name="mandatory">
        <Switch
          disabled={ isCustomLayout || context.disableMandatory }
          labelRight={ t('mandatory') }
        />
      </Form.Item>
      )}

      {!isCustomLayout && context.hideIndex !== true && (
      <Form.Item name="index">
        <Switch
          disabled={ context.disableIndex }
          labelRight={ t('index') }
        />
      </Form.Item>
      )}

      {isClassificationStore && (
      // The Classification Store search index, not the object query index the hidden `index` drives.
      <Form.Item
        extra={ t('classification-store.key-indexed-hint') }
        name="indexed"
        valuePropName="checked"
      >
        <Switch labelRight={ t('classification-store.key-indexed') } />
      </Form.Item>
      )}

      {/* @todo check behavior for unique fields */}
      {context.hideUnique !== true && (
      <Form.Item name="unique">
        <Switch
          disabled={ isCustomLayout }
          labelRight={ t('unique') }
        />
      </Form.Item>
      )}

      {context.hideNotEditable !== true && (
        <Form.Item name="noteditable">
          <Switch labelRight={ t('not-editable') } />
        </Form.Item>
      )}

      <Form.Item name="invisible">
        <Switch labelRight={ t('invisible') } />
      </Form.Item>

      {!isCustomLayout && (
        <>
          {context.hideVisibleGridView !== true && (
            <Form.Item name="visibleGridView">
              <Switch
                disabled={ context.disableVisibleGridView }
                labelRight={ t('visible-in-gridview') }
              />
            </Form.Item>
          )}

          {context.hideVisibleSearch !== true && (
            <Form.Item name="visibleSearch">
              <Switch
                disabled={ context.disableVisibleSearch }
                labelRight={ t('visible-in-searchresult') }
              />
            </Form.Item>
          )}
        </>
      )}
    </FormKit.Panel>
  )
}
