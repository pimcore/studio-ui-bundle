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
import { FieldDefinitionFieldcollectionsFormFields } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/fieldcollections/field-definition-fieldcollections-form-fields'
import { Form, FormKit, Switch } from '@sdk/components'
import { type ElementIcon } from '@sdk/modules/widget-manager'
import { t } from 'i18next'
import React from 'react'

export class DynamicTypeFieldDefinitionFieldcollections extends DynamicTypeFieldDefinitionDataAbstract {
  id: string = 'fieldcollections'

  getIcon (): ElementIcon {
    return { type: 'name', value: 'field-collection-field' }
  }

  getAllowedChildTags (props: FieldDefinitionContext): string[] {
    return [...super.getAllowedChildTags(props), 'group:layout', 'group:data']
  }

  getDisallowedRecursiveChildTags (props: FieldDefinitionContext): string[] {
    return [...super.getDisallowedRecursiveChildTags(props), 'fieldcollections']
  }

  getGroup (): string[] {
    return [...super.getGroup(), 'structured']
  }

  getFormFields (context: FieldDefinitionContext): React.JSX.Element {
    const isCustomLayout = context.area.includes('custom-layout')
    const id = this.getId(context)
    const fieldDefinition = context.fieldDefinitions[id]
    const enrichedContext = {
      ...context,
      hideUnique: true,
      disableMandatory: true,
      disableIndex: true,
      disableVisibleGridView: true,
      disableVisibleSearch: true
    }
    return (
      <>
        {super.getFormFields(enrichedContext)}
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
            <Form.Item name="border">
              <Switch labelRight={ t('border') } />
            </Form.Item>
          </FormKit.Panel>
        )}
        <FieldDefinitionFieldcollectionsFormFields
          context={ context }
          id={ fieldDefinition?.name ?? id }
          type={ this.id }
        />
      </>
    )
  }
}
