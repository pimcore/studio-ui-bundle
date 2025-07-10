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
  }
}

export interface DocumentLinkEditableValue {
  path?: string
  parameters?: string
  anchor?: string
  accesskey?: string
  rel?: string
  tabindex?: string
  target?: string
  class?: string
  attributes?: string
  text?: string
  linktype?: string
  direct?: string
  internalId?: number | null
  internalType?: string
  fullPath?: string
  title?: string
}

export class DynamicTypeDocumentEditableLink extends DynamicTypeDocumentEditableAbstract {
  id: string = 'link'

  getEditableDataComponent (props: LinkEditableDefinition): React.ReactElement<AbstractDocumentEditableDefinition> {
    // Convert config values to arrays with proper defaults
    const allowedTypes = isArray(props.config?.allowedTypes) ? props.config.allowedTypes : []
    const allowedTargets = isArray(props.config?.allowedTargets) ? props.config.allowedTargets : []
    const disabledFields = isArray(props.config?.disabledFields) ? props.config.disabledFields : []

    return (
      <Link
        allowedTypes={allowedTypes}
        allowedTargets={allowedTargets}
        disabledFields={disabledFields}
        className={props.config?.class}
      />
    )
  }

  transformValue (value: DocumentLinkEditableValue | null | undefined, props: LinkEditableDefinition): LinkValue | null {
    if (isNil(value)) {
      return null
    }

    // Transform document link data format to LinkValue format
    // Document link format: {"path":"","parameters":"","anchor":"","accesskey":"","rel":"","tabindex":"","target":"","class":"","attributes":""}
    // LinkValue format from existing component
    if (typeof value === 'object') {
      // Ensure linktype is one of the allowed values
      const linktype: 'direct' | 'internal' = value.linktype === 'internal' ? 'internal' : 'direct'
      
      return {
        text: value.text || '',
        linktype,
        direct: value.path || value.direct || null,
        internal: value.internalId || null,
        internalType: value.internalType || null,
        fullPath: value.fullPath || value.path || '',
        target: value.target || null,
        parameters: value.parameters || '',
        anchor: value.anchor || '',
        title: value.title || '',
        accesskey: value.accesskey || '',
        rel: value.rel || '',
        tabindex: value.tabindex || '',
        class: value.class || ''
      }
    }

    return null
  }
}