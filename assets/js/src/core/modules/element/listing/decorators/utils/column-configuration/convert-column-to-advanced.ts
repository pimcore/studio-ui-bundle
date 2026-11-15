/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isObject } from 'lodash'
import { type AvailableColumn, resolveColumnTranslationKey } from './context-layer/provider/available-columns/available-columns-provider'
import { type DynamicTypePipelineAbstract } from '@Pimcore/modules/element/dynamic-types/definitions/pipelines/dynamic-type-pipeline-abstract'

/** A single advanced column pipeline item, as stored in `advancedColumnConfig.advancedColumns`. */
export interface ColumnConversion {
  key: string
  config: Record<string, any>
}

export interface ConvertColumnToAdvancedProps {
  /** The non-advanced column that should be converted. */
  column: AvailableColumn
  /** The "advanced" column as offered by the backend, providing type, group and source field config. */
  advancedColumnTemplate: AvailableColumn
  /** Source field types of the grid pipeline registry, asked in order which one can take the column. */
  sourceFieldTypes: DynamicTypePipelineAbstract[]
  /** Columns the converted column will live next to – used to keep its title unique. */
  siblingColumns: AvailableColumn[]
  translate: (key: string) => string
}

/**
 * Asks the pipeline source field types whether any of them can represent the given column, and
 * returns the pipeline item to seed the converted column with. The first type that claims the
 * column wins; `undefined` means the column cannot be converted.
 *
 * Which columns are convertible is therefore owned by the source field types themselves (see
 * {@link DynamicTypePipelineAbstract.getConversionConfig}) – the same classes that decide what the
 * pipeline offers for selection, so the two can never disagree.
 */
export const findColumnConversion = (
  column: AvailableColumn,
  advancedColumnTemplate: AvailableColumn,
  sourceFieldTypes: DynamicTypePipelineAbstract[]
): ColumnConversion | undefined => {
  // Advanced columns are never converted again.
  if (column.type === advancedColumnTemplate.type) {
    return undefined
  }

  const config = isObject(advancedColumnTemplate.config) ? advancedColumnTemplate.config as Record<string, any> : {}

  for (const sourceFieldType of sourceFieldTypes) {
    const conversionConfig = sourceFieldType.getConversionConfig(column, config)

    if (conversionConfig !== undefined) {
      return { key: sourceFieldType.id, config: conversionConfig }
    }
  }

  return undefined
}

/**
 * Builds the advanced column a normal column converts into: the backend provided advanced column,
 * seeded with a single source field pointing at the original column, and keeping everything that is
 * still meaningful (locale, width, title).
 *
 * Returns `undefined` when the column is not convertible, so callers can use this as their guard.
 *
 * Note that sorting and inline editing are not carried over – the advanced column is resolved
 * through a pipeline, which the backend can neither sort by nor write back to.
 */
export const convertColumnToAdvanced = ({
  column,
  advancedColumnTemplate,
  sourceFieldTypes,
  siblingColumns,
  translate
}: ConvertColumnToAdvancedProps): AvailableColumn | undefined => {
  const conversion = findColumnConversion(column, advancedColumnTemplate, sourceFieldTypes)

  if (conversion === undefined) {
    return undefined
  }

  const locale = column.locale ?? advancedColumnTemplate.locale ?? null

  return {
    ...advancedColumnTemplate,
    locale,
    width: column.width ?? null,
    __meta: {
      ...advancedColumnTemplate.__meta,
      // Left empty on purpose: the grid config provider assigns a fresh id, which remounts the row
      // so it shows up with its pipeline form expanded.
      uniqueId: undefined,
      advancedColumnConfig: {
        title: getUniqueTitle(translate(resolveColumnTranslationKey(column)), locale, siblingColumns),
        advancedColumns: [conversion],
        transformers: []
      }
    }
  }
}

/**
 * An advanced column is identified by its title at runtime (see the selected columns provider), and
 * columns are matched to their data by key and locale. A duplicate title would therefore make two
 * columns indistinguishable, so we suffix it until it is unique among its siblings.
 */
const getUniqueTitle = (title: string, locale: string | null | undefined, siblingColumns: AvailableColumn[]): string => {
  const takenTitles = new Set(
    siblingColumns
      .filter((sibling) => (sibling.locale ?? null) === (locale ?? null))
      .map((sibling) => sibling.__meta?.advancedColumnConfig?.title ?? String(sibling.key))
  )

  if (!takenTitles.has(title)) {
    return title
  }

  let suffix = 2
  while (takenTitles.has(`${title} (${suffix})`)) {
    suffix++
  }

  return `${title} (${suffix})`
}
