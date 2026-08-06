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
import { DynamicTypePipelineGridSourceFieldsRelationFieldComponent } from '../../components/relation-field/relation-field'
import { type AvailableColumn } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider'

interface RelationSourceFieldOption {
  key: unknown
  fields?: Array<{ key: unknown, config?: { classificationStore?: boolean } | null }>
}

@injectable()
export class DynamicTypePipelineGridSourceFieldsRelationField extends DynamicTypePipelineAbstract {
  readonly id = 'relationField'

  isAvailableForSelection (config: Record<string, any>): boolean {
    return Array.isArray(config.relationField) && config.relationField.length > 0
  }

  /**
   * A relation column is represented by resolving one field of the related object(s), so the
   * relation itself is only half of the config. Both halves are seeded here – the backend requires
   * a field, so claiming the column without one would produce a config it cannot resolve.
   *
   * Note that this is the one conversion that does not preserve what the column showed: the
   * original column renders the related elements, the converted one renders a field of them.
   */
  getConversionConfig (column: AvailableColumn, config: Record<string, any>): Record<string, any> | undefined {
    if (!this.isAvailableForSelection(config)) {
      return undefined
    }

    const key = String(column.key)
    const relation = (config.relationField as RelationSourceFieldOption[])
      .find((candidate) => String(candidate.key) === key)

    if (relation === undefined) {
      return undefined
    }

    const field = this.getDefaultField(relation)

    // Nothing we can resolve without further input – the allowed classes share no field, or the
    // only ones they share are classification store fields. Leave the column unconvertible rather
    // than seed a config that fails at resolve time.
    if (field === undefined) {
      return undefined
    }

    return {
      relation: key,
      field: String(field.key)
    }
  }

  /**
   * Field to start from. Classification store fields are never used: they resolve only with a
   * group/key, which the conversion cannot infer, and the backend throws on a missing one – taking
   * the whole grid request with it, not just the column.
   */
  private getDefaultField (
    relation: RelationSourceFieldOption
  ): NonNullable<RelationSourceFieldOption['fields']>[number] | undefined {
    return (relation.fields ?? []).find((field) => field.config?.classificationStore !== true)
  }

  getComponent (): ReactElement {
    return (
      <DynamicTypePipelineGridSourceFieldsRelationFieldComponent />
    )
  }
}
