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
import { useSyncTitleFromName } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/_abstracts/use-sync-title-from-name'
import { Form, FormKit, Input, Switch, TextArea } from '@sdk/components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { kebabCase } from 'lodash'

export const FieldDefinitionDataFormFields = (props: FieldDefinitionAbstractFormFieldsProps): React.JSX.Element => {
  useSyncTitleFromName()
  const { t } = useTranslation()
  const isCustomLayout = props.context.area.includes('custom-layout')
  const typeTranslation = t('field-definition.' + kebabCase(props.type))
  const panelTitle = `${props.id} (${t('type')}: ${typeTranslation})`

  return (
    <FormKit.Panel title={ panelTitle }>
      <Form.Item
        label={ t('name') }
        name="name"
      >
        <Input disabled={ isCustomLayout || props.context.disableName } />
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

      <Form.Item name="mandatory">
        <Switch
          disabled={ isCustomLayout || props.context.disableMandatory }
          labelRight={ t('mandatory') }
        />
      </Form.Item>

      {!isCustomLayout && (
      <Form.Item name="index">
        <Switch
          disabled={ props.context.disableIndex }
          labelRight={ t('index') }
        />
      </Form.Item>
      )}

      {/* @todo check behavior for unique fields */}
      {props.context.hideUnique !== true && (
      <Form.Item name="unique">
        <Switch
          disabled={ isCustomLayout }
          labelRight={ t('unique') }
        />
      </Form.Item>
      )}

      {props.context.hideNotEditable !== true && (
        <Form.Item name="noteditable">
          <Switch labelRight={ t('not-editable') } />
        </Form.Item>
      )}

      <Form.Item name="invisible">
        <Switch labelRight={ t('invisible') } />
      </Form.Item>

      {!isCustomLayout && (
        <>
          <Form.Item name="visibleGridView">
            <Switch
              disabled={ props.context.disableVisibleGridView }
              labelRight={ t('visible-in-gridview') }
            />
          </Form.Item>

          <Form.Item name="visibleSearch">
            <Switch
              disabled={ props.context.disableVisibleSearch }
              labelRight={ t('visible-in-searchresult') }
            />
          </Form.Item>
        </>
      )}
    </FormKit.Panel>
  )
}
