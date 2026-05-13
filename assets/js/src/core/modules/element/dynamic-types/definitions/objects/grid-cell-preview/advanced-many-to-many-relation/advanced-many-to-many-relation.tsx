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
import { GridCellPreviewWrapper } from '../grid-cell-cell-preview-wrapper/grid-cell-preview-wrapper'
import { isBoolean, isEmpty, isNil, isNull } from 'lodash'
import { SkeletonInput } from '@Pimcore/components/skeleton/components/skeleton-input/skeleton-input'
import { type AdvancedManyToManyRelationValue, type AdvancedManyToManyRelationValueItem } from '../../data-related/helpers/relations/types/advanced-many-to-many-relation'
import { type RelationColumnDefinition } from '../../data-related/components/advanced-many-to-many-object-relation/advanced-many-to-many-object-relation'
import { RelationList, type RelationItem } from '../relation-list/relation-list'
import { ElementTag } from '@Pimcore/components/element-tag/element-tag'
import { useTranslation } from 'react-i18next'
import { useStyles } from '../table/table.styles'
import classNames from 'classnames'
import { useFormatPath, type IFormatPathItem } from '@Pimcore/modules/data-object/hooks/use-format-path'
import { isNonEmptyString } from '@Pimcore/utils/type-utils'
import { useResolvedFieldName } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/relations/utils/resolve-field-name'

interface AdvancedManyToManyRelationProps {
  value: AdvancedManyToManyRelationValue | null
  columnDefinition: RelationColumnDefinition[] | null
  pathIsHtml?: boolean
}

interface FormattedAdvancedManyToManyRelationProps extends AdvancedManyToManyRelationProps {
  pathFormatterClass?: string | null
  columnId?: string
  fieldNameFallback?: string | null
  dataObjectId?: number | null
}

export const AdvancedManyToManyRelationList = ({ value, columnDefinition, pathIsHtml = false }: AdvancedManyToManyRelationProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()

  if (isNil(value) || isEmpty(value)) {
    return <></>
  }

  if (isNull(columnDefinition) || isEmpty(columnDefinition)) {
    const items: RelationItem[] = value.map((item) => ({
      fullPath: item.element.fullPath,
      isPublished: item.element.isPublished
    }))
    return (
      <RelationList
        pathIsHtml={ pathIsHtml }
        relations={ items }
      />
    )
  }

  const formatMetaValue = (metaValue: any): string => {
    if (isNil(metaValue)) {
      return ''
    }

    if (isBoolean(metaValue)) {
      return metaValue ? '1' : ''
    }

    return String(metaValue)
  }

  return (
    <GridCellPreviewWrapper overflow="auto">
      <table
        className={ classNames(styles.table) + ' foooobar' }
        style={ { tableLayout: 'auto' } }
      >
        <thead>
          <tr>
            <th>{t('element')}</th>
            {columnDefinition.map((col) => (
              <th key={ col.key }>
                {!isNil(col.label) && !isEmpty(col.label) ? t(col.label) : col.key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {value.map((item, index) => (
            <tr key={ `${item.element.fullPath}-${index}` }>
              <td style={ { lineHeight: 0 } }>
                <ElementTag
                  path={ item.element.fullPath }
                  pathIsHtml={ pathIsHtml }
                  published={ item.element.isPublished ?? undefined }
                />
              </td>
              {columnDefinition.map((col) => {
                let columnStyle: React.CSSProperties | undefined

                if (!isNil(col.width)) {
                  columnStyle = { width: `${col.width}px` }
                }

                return (
                  <td
                    key={ `${col.key}-${index}` }
                    style={ columnStyle }
                  >{formatMetaValue(item.data?.[col.key] ?? '')}</td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </GridCellPreviewWrapper>
  )
}

export const FormattedAdvancedManyToManyRelationList = ({
  value,
  columnDefinition,
  pathFormatterClass,
  columnId,
  fieldNameFallback,
  dataObjectId
}: FormattedAdvancedManyToManyRelationProps): React.JSX.Element => {
  const { formatPath } = useFormatPath()
  const fieldName = useResolvedFieldName(columnId, fieldNameFallback)
  const [displayValue, setDisplayValue] = useState<AdvancedManyToManyRelationValue | null>(value)
  const [isFormatted, setIsFormatted] = useState(false)
  const [isLoading, setIsLoading] = useState(() =>
    isNonEmptyString(pathFormatterClass) && !isNil(value) && value.length > 0
  )

  useEffect(() => {
    let cancelled = false
    setDisplayValue(value)
    setIsFormatted(false)

    if (!isNonEmptyString(pathFormatterClass) || !isNonEmptyString(fieldName) || isNil(dataObjectId) || isNil(value) || value.length === 0) {
      setIsLoading(false)
      return
    }

    const items: IFormatPathItem[] = value
      .filter(item => isNonEmptyString(item.element.type))
      .map(item => ({ id: item.element.id, type: item.element.type, fullPath: item.element.fullPath }))

    if (items.length === 0) {
      setIsLoading(false)
      return
    }

    setIsLoading(true)

    void formatPath(items, fieldName, dataObjectId, false).then(data => {
      if (cancelled) return
      if (!isNil(data)) {
        setDisplayValue(
          value.map((item): AdvancedManyToManyRelationValueItem => {
            const formatted = data.items.find(i => String(i.objectReference) === `${item.element.type}_${item.element.id}`)
            return !isNil(formatted)
              ? { ...item, element: { ...item.element, fullPath: String(formatted.formatedPath) } }
              : item
          })
        )
        setIsFormatted(true)
      }
      setIsLoading(false)
    })

    return () => { cancelled = true }
  }, [value, pathFormatterClass, fieldName, dataObjectId])

  if (isLoading) {
    return (
      <SkeletonInput
        active
        size="small"
      />
    )
  }

  return (
    <AdvancedManyToManyRelationList
      columnDefinition={ columnDefinition }
      pathIsHtml={ isFormatted }
      value={ displayValue }
    />
  )
}
