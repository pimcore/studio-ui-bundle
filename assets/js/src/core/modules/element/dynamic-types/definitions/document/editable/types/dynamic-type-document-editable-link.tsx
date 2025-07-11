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
import { Link, type LinkValue } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/link/link'
import { isNil, isArray } from 'lodash'

export type LinkEditableDefinition = Omit<AbstractDocumentEditableDefinition, 'config'> & {
  config?: {
    allowedTypes?: string[]
    allowedTargets?: string[]
    disabledFields?: string[]
    class?: string
    reload?: boolean
    textPrefix?: string
    textSuffix?: string
  }
}

export interface DocumentLinkEditableValue {
  text: string
  linktype: 'direct' | 'internal'
  internal?: boolean | null
  internalType?: string
  internalId?: number | null
  fullPath: string
  target: string | null
  parameters: string
  anchor: string
  title: string
  accesskey: string
  rel: string
  tabindex: string
  class: string
  path: string
  attributes?: string
}

export class DynamicTypeDocumentEditableLink extends DynamicTypeDocumentEditableAbstract {
  id: string = 'link'

  getEditableDataComponent (props: LinkEditableDefinition): React.ReactElement<AbstractDocumentEditableDefinition> {
    const allowedTypes = isArray(props.config?.allowedTypes) ? props.config.allowedTypes : []
    const allowedTargets = isArray(props.config?.allowedTargets) ? props.config.allowedTargets : []
    const disabledFields = isArray(props.config?.disabledFields) ? props.config.disabledFields : []

    return (
      <Link
        allowedTargets={ allowedTargets }
        allowedTypes={ allowedTypes }
        className={ props.config?.class }
        disabledFields={ disabledFields }
        textPrefix={ props.config?.textPrefix }
        textSuffix={ props.config?.textSuffix }
      />
    )
  }

  transformValue (value: DocumentLinkEditableValue | null | undefined, props: LinkEditableDefinition): LinkValue | null {
    if (isNil(value)) {
      return null
    }

    return {
      ...value,
      internal: value.internalId ?? null,
      fullPath: value.fullPath ?? value.path ?? '',
      direct: value.path ?? null
    }
  }
}
