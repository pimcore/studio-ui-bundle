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
import { type AbstractDocumentEditableDefinition, DynamicTypeDocumentEditableAbstract } from '../dynamic-type-document-editable-abstract'
import { type AreablockEditableProps, type AreablockEditableConfig, type AreablockValue } from '../components/areablock-editable/areablock-editable'
import { WithAreablockRenderQuery } from '../components/areablock-editable/with-areablock-render-query'
import { AreablockManager } from '../components/areablock-editable/utils/areablock-manager'
import { buildGroupedTypes } from '../components/areablock-editable/utils/areablock-utils'
import { getPimcoreStudioApi } from '@Pimcore/app/public-api/helpers/api-helper'

export { DEFAULT_AREABLOCK_GROUP, UNCATEGORIZED_AREABLOCK_GROUP } from '../components/areablock-editable/utils/areablock-utils'

export interface AreablockEditableDefinition extends Omit<AbstractDocumentEditableDefinition, 'config'> {
  config?: AreablockEditableConfig
}

export class DynamicTypeDocumentEditableAreablock extends DynamicTypeDocumentEditableAbstract {
  id: string = 'areablock'

  getEditableComponent (): React.ComponentType<Omit<AreablockEditableProps, 'renderTrigger'>> {
    return WithAreablockRenderQuery
  }

  getEditableDataComponent (props: AreablockEditableDefinition): React.ReactElement<AbstractDocumentEditableDefinition> {
    const EditableComponent = this.getEditableComponent()

    return (
      <EditableComponent
        className={ props.config?.class }
        config={ props.config }
        containerRef={ props.containerRef }
        disabled={ props.inherited }
        editableName={ props.name }
        editableType={ this.id }
        isInherited={ props.inherited }
      />
    )
  }

  transformValue (value: any, props: AreablockEditableDefinition): AreablockValue {
    const containerElement = document.getElementById(props.id) as HTMLDivElement | null
    const fallbackContainerRef: React.RefObject<HTMLDivElement> = { current: containerElement }
    const containerRef = props.containerRef ?? fallbackContainerRef
    const areablockManager = new AreablockManager(props.name, containerRef, this.id)
    return areablockManager.getAreablockValue()
  }

  onDocumentReady (documentId: number, editableDefinitions: AbstractDocumentEditableDefinition[]): void {
    try {
      const { document: documentApi } = getPimcoreStudioApi()
      const allGroupedTypes = buildGroupedTypes(editableDefinitions, this.id)
      documentApi.notifyAreablockTypes(documentId, this.id, allGroupedTypes)
    } catch (error) {
      console.warn('Could not notify parent about areablock types:', error)
    }
  }
}
