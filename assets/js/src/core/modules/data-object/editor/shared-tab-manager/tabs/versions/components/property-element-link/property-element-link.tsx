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
import { isNil, isObject } from 'lodash'
import { ManyToOneRelation, type ManyToOneRelationValue } from '@Pimcore/components/many-to-one-relation'
import { isEmptyValue } from '@Pimcore/utils/type-utils'

interface IPropertyElementLinkProps {
  propertyType: string
  value: unknown
  className?: string
}

interface IElementReferenceValue {
  id?: number
  path?: string
  fullPath?: string
  published?: boolean
  isPublished?: boolean
}

export const PropertyElementLink = ({ propertyType, value, className }: IPropertyElementLinkProps): React.JSX.Element => {
  if (isNil(value)) return <></>

  const record = isObject(value) ? value as IElementReferenceValue : undefined
  const elementId = record?.id ?? (typeof value === 'number' ? value : undefined)

  if (isNil(elementId)) return <></>

  const fullPathValue = isEmptyValue(record?.fullPath) ? record?.path : record?.fullPath

  const relationValue: ManyToOneRelationValue = {
    type: propertyType,
    id: elementId,
    fullPath: fullPathValue ?? `${propertyType} [ID: ${String(elementId)}]`,
    isPublished: record?.published ?? record?.isPublished ?? null
  }

  return (
    <ManyToOneRelation
      className={ className }
      disabled
      hideOpenButton
      readOnly
      value={ relationValue }
    />
  )
}
