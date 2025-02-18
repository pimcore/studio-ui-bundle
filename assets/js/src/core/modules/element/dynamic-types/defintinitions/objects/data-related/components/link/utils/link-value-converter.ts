/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import {
  type ManyToOneRelationValue, type PathTextInputValue
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/many-to-one-relation/many-to-one-relation'
import {
  type LinkValue
} from '../link'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { mapToElementType } from '@Pimcore/modules/element/utils/element-type'

export interface InternalLinkValue {
  text?: string
  path?: ManyToOneRelationValue | PathTextInputValue | null
  target?: string
  parameters?: string
  anchor?: string
  title?: string
  accesskey?: string
  rel?: string
  tabindex?: string
  class?: string
}

export const convertToInternalLinkValue = (value: LinkValue): InternalLinkValue => {
  return {
    text: value.text,
    path: getInternalPath(value),
    target: value.target ?? undefined,
    parameters: value.parameters,
    anchor: value.anchor,
    title: value.title,
    accesskey: value.accesskey,
    rel: value.rel,
    tabindex: value.tabindex,
    class: value.class
  }
}

export const convertFromInternalLinkValue = (value: InternalLinkValue): LinkValue => {
  return {
    text: value.text ?? '',
    linktype: value.path?.textInput === true ? 'direct' : 'internal',
    direct: value.path?.textInput === true ? value.path.fullPath : null,
    internal: value.path?.textInput === true ? null : value.path?.id,
    internalType: value.path?.textInput === true ? null : reverseConvertType(value.path?.type),
    fullPath: value.path?.fullPath,
    target: value.target ?? null,
    parameters: value.parameters ?? '',
    anchor: value.anchor ?? '',
    title: value.title ?? '',
    accesskey: value.accesskey ?? '',
    rel: value.rel ?? '',
    tabindex: value.tabindex ?? '',
    class: value.class ?? ''
  }
}

const getInternalPath = (value: LinkValue): ManyToOneRelationValue | PathTextInputValue | null => {
  if (value.linktype === 'internal') {
    const type = convertType(value.internalType)
    if (type === null) {
      return null
    }
    return {
      type,
      id: value.internal ?? 0,
      fullPath: value.fullPath,
      subtype: value.internalType ?? undefined
    }
  } else {
    return {
      textInput: true,
      fullPath: value.direct ?? ''
    }
  }
}

export const convertType = (type?: string | null): ElementType | null => {
  if (typeof type === 'string') {
    return mapToElementType(type)
  }

  return null
}

const reverseConvertType = (type?: ElementType | null): string | null => {
  if (type === 'data-object') {
    return 'object'
  }
  return type ?? null
}
