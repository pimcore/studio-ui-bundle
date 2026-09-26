/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { type AdvancedEditorColumn } from './types'
import { ColumnPipelineForm } from './column-pipeline-form'

export interface ColumnEditorItemBodyProps {
  column: AdvancedEditorColumn
  entity: string
  /** Class definition id the pipeline form scopes class-bound pickers (e.g. classification store) to. */
  classDefinitionId?: string
  objectId: number | null
  onPipelineChange: (id: string, pipeline: Record<string, any>) => void
  /** Service ID of the DynamicTypePipelineRegistry to use for source fields. */
  sourceFieldsRegistryId: string
  /** Service ID of the DynamicTypePipelineRegistry to use for transformers. */
  transformersRegistryId: string
  /** True when the pipeline form is rendered in a horizontally constrained context. */
  compact?: boolean
  /** When true, the pipeline form (title, source fields, transformers) is fully disabled. */
  readOnly?: boolean
}

export const ColumnEditorItemBody = ({
  column,
  entity,
  classDefinitionId,
  objectId,
  onPipelineChange,
  sourceFieldsRegistryId,
  transformersRegistryId,
  compact,
  readOnly
}: ColumnEditorItemBodyProps): React.JSX.Element => {
  return (
    <ColumnPipelineForm
      classDefinitionId={ classDefinitionId }
      column={ column }
      compact={ compact }
      config={ column.pipelineConfig }
      entity={ entity }
      objectId={ objectId }
      onChange={ (pipeline) => { onPipelineChange(column._id, pipeline) } }
      readOnly={ readOnly }
      sourceFieldsRegistryId={ sourceFieldsRegistryId }
      transformersRegistryId={ transformersRegistryId }
      value={ column.pipeline }
    />
  )
}
