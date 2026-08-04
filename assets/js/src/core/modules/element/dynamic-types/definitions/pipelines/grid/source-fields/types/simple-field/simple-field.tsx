/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type ReactElement } from 'react'
import { DynamicTypePipelineAbstract } from '../../../../dynamic-type-pipeline-abstract'
import { injectable } from 'inversify'
import { DynamicTypePipelineGridSourceFieldsSimpleFieldComponent } from '../../components/simple-field/simple-field'
import { type AvailableColumn } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider'
import { isEmptyValue } from '@Pimcore/utils/type-utils'
import { hasFieldDefinition } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/has-field-definition'
import { isObject } from 'lodash'

@injectable()
export class DynamicTypePipelineGridSourceFieldsSimpleField extends DynamicTypePipelineAbstract {
  readonly id = 'simpleField'

  isAvailableForSelection (config: Record<string, any>): boolean {
    return Array.isArray(config.simpleField) && config.simpleField.length > 0
  }

  /**
   * A column can be represented as a simple field whenever the backend offers its key as a source
   * field. Relations are deliberately not offered there (they are only reachable through
   * `relationField`, which additionally needs a field of the related object), so relation columns
   * are not convertible.
   */
  getConversionConfig (column: AvailableColumn, config: Record<string, any>): Record<string, any> | undefined {
    if (!this.isAvailableForSelection(config)) {
      return undefined
    }

    const key = String(column.key)
    const isSourceField = (config.simpleField as Array<{ key: unknown }>)
      .some((sourceField) => String(sourceField.key) === key)

    if (!isSourceField) {
      return undefined
    }

    return {
      field: key,
      ...this.getClassificationStoreConfig(column)
    }
  }

  /**
   * Carries the group/key a classification store column was configured with over to the source
   * field, so the converted column resolves the same value it did before.
   */
  private getClassificationStoreConfig (column: AvailableColumn): Record<string, any> {
    if (column.type !== 'dataobject.classificationstore' || !isObject(column.config)) {
      return {}
    }

    const { groupId, keyId } = column.config as { groupId?: unknown, keyId?: unknown }

    if (isEmptyValue(groupId) || isEmptyValue(keyId)) {
      return {}
    }

    const classificationStoreConfig: Record<string, any> = { groupId, keyId }
    const keyName = hasFieldDefinition(column.config)
      ? column.config.fieldDefinition?.title ?? column.config.fieldDefinition?.name
      : undefined

    // Display only – the chip falls back to the raw key id when it is missing.
    if (!isEmptyValue(keyName)) {
      classificationStoreConfig.keyName = keyName
    }

    return classificationStoreConfig
  }

  getComponent (): ReactElement {
    return (
      <DynamicTypePipelineGridSourceFieldsSimpleFieldComponent />
    )
  }
}
