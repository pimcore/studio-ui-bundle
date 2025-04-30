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
import { ManyToOneRelation, type ManyToOneRelationProps, type ManyToOneRelationValueType } from '../../../../components/many-to-one-relation/many-to-one-relation'
import { type HotspotObjectType } from '../../types/hotspot-types'
import { isNil, isNull } from 'lodash'
import { mapToElementType } from '@Pimcore/modules/element/utils/element-type'

interface HotspotManyToOneRelationProps extends Omit<ManyToOneRelationProps, 'value' | 'onChange'> {
  type: 'asset' | 'object' | 'document'
  value?: HotspotObjectType | null
  onChange?: (value: HotspotObjectType | null) => void
}

export const HotspotManyToOneRelation = (props: HotspotManyToOneRelationProps): React.JSX.Element => {
  const onChange = (value: ManyToOneRelationValueType): void => {
    if (isNil(value) || value.textInput === true) {
      props.onChange?.(null)
      return
    }

    const formattedValue: HotspotObjectType = {
      value: value.id,
      fullPath: value.fullPath ?? '',
      subtype: value.subtype ?? '',
      published: value?.isPublished ?? null
    }

    props.onChange?.(formattedValue)
  }
  const value: ManyToOneRelationValueType = isNil(props.value) || isNull(props.value.value)
    ? null
    : {
        type: String(mapToElementType(props.type)),
        id: props.value.value,
        fullPath: props.value.fullPath,
        subtype: props.value.subtype,
        isPublished: props.value.published
      }
  return (
    <ManyToOneRelation
      { ...props }
      onChange={ onChange }
      value={ value }
    />
  )
}
