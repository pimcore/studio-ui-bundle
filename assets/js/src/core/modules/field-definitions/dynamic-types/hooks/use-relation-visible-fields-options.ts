/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import type { TFunction } from 'i18next'
import { isArray, isString } from 'lodash'
import { useClassGetAvailableVisibleFieldsForRelationQuery } from '@Pimcore/modules/class-definition/class-definition-slice-enhanced'
import type { RelationVisibleField, RelationVisibleFieldsConfiguration } from '@Pimcore/modules/class-definition/class-definition-slice.gen'

export interface RelationVisibleFieldOption {
  label: string
  value: string
}

export interface RelationVisibleFieldOptionGroup {
  label: string
  options: RelationVisibleFieldOption[]
}

export interface UseRelationVisibleFieldsOptionsReturn {
  /** The offered fields grouped by where they come from, in the order the relation offers them. */
  groupedOptions: RelationVisibleFieldOptionGroup[]
  /** The names of all offered fields. */
  availableFieldNames: Set<string>
  isLoading: boolean
  isError: boolean
  /**
   * Whether the fields of the current settings are loaded. Only then may a selection be compared against
   * them: before that the form may not hold its values yet, or a request for older settings is pending.
   */
  isReady: boolean
}

const CLASS_SOURCE_PREFIX = 'object:'

/**
 * The allowed types as the relation field settings form holds them: the multi-selects keep their values as
 * `[{ classes: 'Product' }]` etc., the class editor sends them as plain names.
 */
export const toRelationVisibleFieldsConfiguration = (
  fieldtype: RelationVisibleFieldsConfiguration['fieldtype'],
  values: Record<string, unknown>
): RelationVisibleFieldsConfiguration => {
  const names = (key: string): string[] => {
    const items = values[key]
    if (!isArray(items)) {
      return []
    }

    return items
      .map((item: unknown) => isString(item) ? item : (item as Record<string, unknown> | null)?.[key])
      .filter((name): name is string => isString(name) && name !== '')
  }

  const objectsAllowed = values.objectsAllowed === true
  const assetsAllowed = values.assetsAllowed === true
  const documentsAllowed = values.documentsAllowed === true

  return {
    fieldtype,
    objectsAllowed,
    classes: objectsAllowed ? names('classes') : [],
    assetsAllowed,
    assetTypes: assetsAllowed ? names('assetTypes') : [],
    documentsAllowed,
    documentTypes: documentsAllowed ? names('documentTypes') : []
  }
}

export const getRelationVisibleFieldSourceLabel = (source: string, t: TFunction): string => {
  if (source.startsWith(CLASS_SOURCE_PREFIX)) {
    return source.substring(CLASS_SOURCE_PREFIX.length)
  }

  return t(`relations.visible-fields.source.${source}`)
}

export const getRelationVisibleFieldOptionLabel = (field: RelationVisibleField): string => {
  return field.title !== '' && field.title !== field.name ? `${field.title} (${field.name})` : field.name
}

/**
 * Groups the fields by their sources, so the picker tells which element types a field shows a value for
 * (e.g. "Product", "Assets", "All objects · Assets · Documents") - a column stays empty for the rows of
 * every other type.
 */
export const groupRelationVisibleFields = (fields: RelationVisibleField[], t: TFunction): RelationVisibleFieldOptionGroup[] => {
  const groups = new Map<string, RelationVisibleFieldOptionGroup>()

  for (const field of fields) {
    const groupLabel = field.sources.map((source) => getRelationVisibleFieldSourceLabel(source, t)).join(' · ')
    const group = groups.get(groupLabel) ?? { label: groupLabel, options: [] }

    group.options.push({ label: getRelationVisibleFieldOptionLabel(field), value: field.name })
    groups.set(groupLabel, group)
  }

  return Array.from(groups.values())
}

const hasAllowedTypes = (configuration: RelationVisibleFieldsConfiguration): boolean => {
  return configuration.objectsAllowed === true || configuration.assetsAllowed === true || configuration.documentsAllowed === true
}

export const useRelationVisibleFieldsOptions = (configuration: RelationVisibleFieldsConfiguration): UseRelationVisibleFieldsOptionsReturn => {
  const { t } = useTranslation()
  const skip = !hasAllowedTypes(configuration)

  const { currentData, isFetching, isError } = useClassGetAvailableVisibleFieldsForRelationQuery(
    { relationVisibleFieldsConfiguration: configuration },
    { skip, refetchOnMountOrArgChange: true }
  )

  const fields = useMemo(() => skip ? [] : (currentData?.items ?? []), [currentData, skip])

  const groupedOptions = useMemo(() => groupRelationVisibleFields(fields, t), [fields, t])
  const availableFieldNames = useMemo(() => new Set(fields.map((field) => field.name)), [fields])

  return {
    groupedOptions,
    availableFieldNames,
    isLoading: !skip && isFetching,
    isError: !skip && isError,
    isReady: !skip && !isFetching && !isError && currentData !== undefined
  }
}
