/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type FieldDefinitionContext } from '@Pimcore/modules/field-definitions/dynamic-types/dynamic-type-field-definition-abstract'
import { DynamicTypeFieldDefinitionDataAbstract } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/_abstracts/dynamic-type-field-defintion-data-abstract'
import { FieldDefinitionBlockFormFields } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/block/field-definition-block-form-fields'
import { Form, FormKit, Switch } from '@sdk/components'
import { type ElementIcon } from '@sdk/modules/widget-manager'
import { t } from 'i18next'
import React from 'react'

export class DynamicTypeFieldDefinitionBlock extends DynamicTypeFieldDefinitionDataAbstract {
  id: string = 'block'

  getIcon (): ElementIcon {
    return { type: 'name', value: 'block' }
  }

  getDropdownTags (props: FieldDefinitionContext): string[] {
    const isCustomLayout = props.area.includes('custom-layout')

    if (isCustomLayout) {
      return ['group:layout']
    }

    return this.getAllowedChildTags(props)
  }

  getAllowedChildTags (props: FieldDefinitionContext): string[] {
    return [...super.getAllowedChildTags(props), 'group:layout', 'group:data']
  }

  getDisallowedRecursiveChildTags (props: FieldDefinitionContext): string[] {
    return [
      ...super.getDisallowedRecursiveChildTags(props),
      'block',
      'classificationstore',
      'consent',
      'objectbricks',
      'fieldcollections',
      'reverseObjectRelation',
      'urlSlug'
    ]
  }

  opensNamespace (): boolean {
    return true
  }

  getGroup (): string[] {
    return [...super.getGroup(), 'structured']
  }

  getCustomLayoutOptions (context: FieldDefinitionContext): React.JSX.Element {
    const isCustomLayout = context.area.includes('custom-layout')
    return (
      <>
        {!isCustomLayout && (
          <FormKit.Panel
            theme="card-with-highlight"
            title={ t('layout-options') }
          >
            <Form.Item name="collapsible">
              <Switch labelRight={ t('collapsible') } />
            </Form.Item>
            <Form.Item name="collapsed">
              <Switch labelRight={ t('collapsed') } />
            </Form.Item>
          </FormKit.Panel>
        )}
      </>
    )
  }

  getSpecificFormFields (context: FieldDefinitionContext): React.JSX.Element {
    const id = this.getId(context)
    const fieldDefinition = context.fieldDefinitions[id]

    return (
      <FieldDefinitionBlockFormFields
        context={ context }
        id={ fieldDefinition?.name ?? id }
        type={ this.id }
      />
    )
  }

  getFormFields (context: FieldDefinitionContext): React.JSX.Element {
    return super.getFormFields({
      ...context,
      hideUnique: true,
      disableMandatory: true,
      disableIndex: true,
      disableVisibleGridView: true,
      disableVisibleSearch: true
    })
  }
}
