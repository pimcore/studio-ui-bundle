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
import { FieldDefinitionExternalImageFormFields } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/externalImage/field-definition-external-image-form-fields'
import { type ElementIcon } from '@sdk/modules/widget-manager'
import { injectable } from 'inversify'
import React from 'react'

@injectable()
export class DynamicTypeFieldDefinitionExternalImage extends DynamicTypeFieldDefinitionDataAbstract {
  public id: string = 'externalImage'

  getIcon (): ElementIcon {
    return { type: 'name', value: 'image-external' }
  }

  getGroup (): string[] {
    return [...super.getGroup(), 'media']
  }

  getTags (props: FieldDefinitionContext): string[] {
    return [...super.getTags(props), 'encryptedFieldSupport']
  }

  getFormFields (context: FieldDefinitionContext): React.JSX.Element {
    return super.getFormFields({ ...context, hideUnique: true })
  }

  getSpecificFormFields (context: FieldDefinitionContext): React.JSX.Element {
    const id = this.getId(context)
    const fieldDefinition = context.fieldDefinitions[id]

    return (
      <FieldDefinitionExternalImageFormFields
        context={ context }
        id={ fieldDefinition?.name ?? id }
        type={ this.id }
      />
    )
  }
}
