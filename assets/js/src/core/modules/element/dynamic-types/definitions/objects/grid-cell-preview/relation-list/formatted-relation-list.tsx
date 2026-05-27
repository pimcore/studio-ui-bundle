/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useState } from 'react'
import { useFormatPath, type IFormatPathItem } from '@Pimcore/modules/data-object/hooks/use-format-path'
import { RelationList, type RelationItem } from './relation-list'
import { isNonEmptyString } from '@Pimcore/utils/type-utils'
import { isNil } from 'lodash'
import { useResolvedFieldName } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/relations/utils/resolve-field-name'
import { SkeletonInput } from '@Pimcore/components/skeleton/components/skeleton-input/skeleton-input'

interface FormattedRelationListProps {
  relations: RelationItem[] | null
  pathFormatterClass?: string | null
  dataObjectId?: number | null
  columnId?: string
  fieldNameFallback?: string | null
  isClickable?: boolean
  noWrapper?: boolean
}

export const FormattedRelationList = ({
  relations,
  pathFormatterClass,
  dataObjectId,
  columnId,
  fieldNameFallback,
  isClickable,
  noWrapper
}: FormattedRelationListProps): React.JSX.Element => {
  const { formatPath } = useFormatPath()
  const fieldName = useResolvedFieldName(columnId, fieldNameFallback)
  const [displayRelations, setDisplayRelations] = useState<RelationItem[] | null>(relations)
  const [isFormatted, setIsFormatted] = useState(false)
  const [isLoading, setIsLoading] = useState(() =>
    isNonEmptyString(pathFormatterClass) && !isNil(relations) && relations.length > 0
  )

  useEffect(() => {
    let cancelled = false
    setDisplayRelations(relations)
    setIsFormatted(false)

    if (!isNonEmptyString(pathFormatterClass) || !isNonEmptyString(fieldName) || isNil(dataObjectId) || isNil(relations) || relations.length === 0) {
      setIsLoading(false)
      return
    }

    const items: IFormatPathItem[] = relations
      .filter(r => !isNil(r.id) && isNonEmptyString(r.type) && isNonEmptyString(r.fullPath))
      .map(r => ({ id: r.id!, type: r.type!, fullPath: r.fullPath! }))

    if (items.length === 0) {
      setIsLoading(false)
      return
    }

    setIsLoading(true)

    void formatPath(items, fieldName, dataObjectId, false).then(data => {
      if (cancelled) return
      if (!isNil(data)) {
        setDisplayRelations(
          relations.map(r => {
            const formatted = data.items.find(i => String(i.objectReference) === `${r.type}_${r.id}`)
            return !isNil(formatted) ? { ...r, fullPath: String(formatted.formatedPath) } : r
          })
        )
        setIsFormatted(true)
      }
      setIsLoading(false)
    })

    return () => { cancelled = true }
  }, [relations, pathFormatterClass, fieldName, dataObjectId])

  if (isLoading) {
    return (
      <SkeletonInput
        active
        size="small"
      />
    )
  }

  return (
    <RelationList
      isClickable={ isClickable }
      noWrapper={ noWrapper }
      pathIsHtml={ isFormatted }
      relations={ displayRelations }
    />
  )
}
