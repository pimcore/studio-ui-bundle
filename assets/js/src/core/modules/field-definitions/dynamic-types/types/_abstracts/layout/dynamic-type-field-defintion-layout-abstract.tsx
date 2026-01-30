/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { DynamicTypeFieldDefinitionAbstract, type FieldDefinitionDataAbstract, type FieldDefinitionContext, type FieldDefinitionAbstractFormFieldsProps } from '@Pimcore/modules/field-definitions/dynamic-types/dynamic-type-field-definition-abstract'
import { FieldDefinitionLayoutFormFields } from '@Pimcore/modules/field-definitions/dynamic-types/types/_abstracts/layout/field-defintion-layout-form-fields'
import React from 'react'

export interface FieldDefinitionLayout extends FieldDefinitionDataAbstract {
  name: string
  title: string
  region: string
}

export abstract class DynamicTypeFieldDefinitionLayoutAbstract extends DynamicTypeFieldDefinitionAbstract {
  getAllowedChildTags (props: FieldDefinitionContext): string[] {
    return [...super.getAllowedChildTags(props), 'group:layout', 'group:data']
  }

  getTags (props: FieldDefinitionContext): string[] {
    return [...super.getTags(props), 'group:layout']
  }

  getGroup (): string[] {
    return ['layout']
  }

  getDefaultData (): FieldDefinitionLayout {
    return {
      fieldtype: this.id,
      datatype: 'layout',
      name: 'Layout',
      title: '',
      region: ''
    }
  }

  getFormFields (context: FieldDefinitionContext, props?: Partial<FieldDefinitionAbstractFormFieldsProps>): React.JSX.Element {
    const id = context.path.at(-1) ?? ''
    const fieldDefinition = context.fieldDefinitions[id]

    return (
      <FieldDefinitionLayoutFormFields
        context={ context }
        id={ fieldDefinition?.name ?? id }
        type={ this.id }
        { ...props }
      />
    )
  }
}
