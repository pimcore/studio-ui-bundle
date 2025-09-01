/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type AbstractDecoratorProps } from '@Pimcore/modules/element/listing/decorators/abstract-decorator'
import { useSearchTermFilter } from '../context-layer/provider/search-term-filter/use-search-term-filter'
import { searchTermFilterType } from '../context-layer/provider/search-term-filter/search-term-filter-provider'
import { useDirectChildrenFilter } from '../context-layer/provider/direct-children-filter/use-direct-children-filter'
import { pqlFilterType } from '../context-layer/provider/pql-filter/pql-filter-provider'
import { usePqlFilter } from '../context-layer/provider/pql-filter/use-pql-filter'
import { useFieldFilters } from '../context-layer/provider/field-filters/use-field-filters'
import { useAvailableColumns } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/use-available-columns'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type DynamicTypeObjectDataRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/dynamic-type-object-data-registry'
import { type DynamicTypeFieldFilterRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/dynamic-type-field-filter-registry'

export const withGeneralFiltersQueryArg = (useBaseHook: AbstractDecoratorProps['useDataQueryHelper']): AbstractDecoratorProps['useDataQueryHelper'] => {
  const useDataQueryHelperGeneralFiltersExtension: AbstractDecoratorProps['useDataQueryHelper'] = () => {
    const { getArgs: baseGetArgs, ...baseMethods } = useBaseHook()
    const { getDataQueryFilterArg: getSearchTermFilterArg } = useSearchTermFilter()
    const { getDataQueryFilterArg: getPqlFilterArg } = usePqlFilter()
    const { onlyDirectChildren } = useDirectChildrenFilter()
    const { fieldFilters } = useFieldFilters()
    const { availableColumns } = useAvailableColumns()
    const objectDataRegistry = container.get<DynamicTypeObjectDataRegistry>(serviceIds['DynamicTypes/ObjectDataRegistry'])
    const fieldFilterRegistry = container.get<DynamicTypeFieldFilterRegistry>(serviceIds['DynamicTypes/FieldFilterRegistry'])

    const getUpdatedColumnFilters = (columnFilters: any[]): any[] => {
      // Override 'type' with 'filterType' for specific cases (e.g., 'dataobject.adapter')
      return columnFilters.map(({ filterType, ...rest }) => ({
        ...rest,
        ...(filterType !== undefined && { type: filterType })
      }))
    }

    const getApplicableFieldFilters = (filters: any[]): any[] => {
      return filters.filter((filter) => {
        const column = availableColumns.find(col => col.key === filter.key)
        const frontendType = column?.frontendType ?? filter.type ?? 'string'
        
        // Create a mapping from frontend types to their corresponding field filter types
        // This mapping is based on how each object data type declares its dynamicTypeFieldFilterType
        const typeToFilterMapping: Record<string, string> = {
          // String-based types
          'input': 'string',
          'textarea': 'string', 
          'wysiwyg': 'string',
          'password': 'string',
          'email': 'string',
          'firstname': 'string',
          'lastname': 'string',
          'encryptedField': 'string',
          'calculatedValue': 'string',
          'link': 'string',
          'urlSlug': 'string',
          'externalImage': 'string',
          'image': 'string',
          'video': 'string',
          'hotspotImage': 'string',
          'imageGallery': 'string',
          'geoPoint': 'string',
          'geoBounds': 'string',
          'geoPolygon': 'string',
          'geoPolyLine': 'string',
          'manyToOneRelation': 'string',
          'manyToManyRelation': 'string',
          'manyToManyObjectRelation': 'string',
          'advancedManyToManyRelation': 'string',
          'advancedManyToManyObjectRelation': 'string',
          'reverseObjectRelation': 'string',
          'table': 'string',
          'structuredTable': 'string',
          'block': 'string',
          'localizedFields': 'string',
          'fieldCollection': 'string',
          'objectBrick': 'string',
          'classificationStore': 'string',
          
          // Select-based types
          'select': 'select',
          'multiSelect': 'select',
          'language': 'select',
          'languageMultiSelect': 'select',
          'country': 'select',
          'countryMultiSelect': 'select',
          'user': 'select',
          'booleanSelect': 'select',
          'consent': 'select',
          'gender': 'select',
          'rgbaColor': 'select',
          
          // Number-based types
          'numeric': 'number',
          'numericRange': 'number',
          'slider': 'number',
          'quantityValue': 'number',
          'quantityValueRange': 'number',
          'inputQuantityValue': 'number',
          'time': 'number',
          
          // Date-based types
          'date': 'date',
          'datetime': 'date',
          'dateRange': 'date',
          
          // Boolean-based types
          'checkbox': 'boolean'
        }
        
        const filterType = typeToFilterMapping[frontendType] ?? 'string'
        
        // Get the actual field filter instance and use its shouldApply method
        if (fieldFilterRegistry.hasDynamicType(filterType)) {
          const fieldFilter = fieldFilterRegistry.getDynamicType(filterType)
          return fieldFilter.shouldApply(filter.filterValue)
        }
        
        // Fallback to basic empty check for unknown types
        return filter.filterValue != null && filter.filterValue !== ''
      })
    }

    const getArgs: typeof baseGetArgs = () => {
      const baseArgs = baseGetArgs()
      const searchTermFilter = getSearchTermFilterArg()
      const pqlFilter = getPqlFilterArg()

      const columnsToFilterOut = availableColumns.map((column) => column.key)
      columnsToFilterOut.push(pqlFilterType, searchTermFilterType)

      const currentColumnFilters = baseArgs.body.filters.columnFilters ?? []
      const newColumnFilters = [
        ...currentColumnFilters.filter((currentFilter) => !columnsToFilterOut.includes(currentFilter.type as string))
      ]

      if (searchTermFilter !== undefined) {
        newColumnFilters.push(searchTermFilter)
      }

      if (pqlFilter !== undefined) {
        newColumnFilters.push(pqlFilter)
      }

      if (fieldFilters.length > 0) {
        const applicableFieldFilters = getApplicableFieldFilters(fieldFilters)
        newColumnFilters.push(...applicableFieldFilters)
      }

      return {
        ...baseArgs,
        body: {
          ...baseArgs.body,
          filters: {
            ...baseArgs.body.filters,
            includeDescendants: !onlyDirectChildren,
            columnFilters: getUpdatedColumnFilters(newColumnFilters)
          }
        }
      }
    }

    return {
      ...baseMethods,
      getArgs
    }
  }

  return useDataQueryHelperGeneralFiltersExtension
}
