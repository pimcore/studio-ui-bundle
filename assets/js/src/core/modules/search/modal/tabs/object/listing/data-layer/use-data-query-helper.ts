/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type AdvancedColumnConfig, type DataObjectGetGridApiArg } from '@Pimcore/modules/data-object/data-object-api-slice.gen'
import { useSelectedColumns } from '@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/use-selected-columns'
import { type SettingsProviderProps } from '@Pimcore/modules/element/listing/abstract/settings/settings-provider'
import { useData } from '@Pimcore/modules/element/listing/abstract/data-layer/provider/data/use-data'
import { useClassDefinitionSelection } from '@Pimcore/modules/data-object/listing/decorator/class-definition-selection/context-layer/provider/use-class-definition-selection'
import { useTypeSelect } from '@Pimcore/modules/element/components/type-select/provider/use-type-select'
import { useInjection } from '@Pimcore/app/depency-injection'
import { type DynamicTypeObjectRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/objects/dynamic-type-object-registry'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type DataObjectGetSearchApiArg } from '@Pimcore/modules/search/search-api-slice.gen'
import { useAvailableColumns } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/use-available-columns'
import { useLanguageSelection } from '@Pimcore/components/language-selection'

export const useDataQueryHelper: SettingsProviderProps['useDataQueryHelper'] = () => {
  const { selectedColumns } = useSelectedColumns()
  const { availableColumns } = useAvailableColumns()
  const { selectedClassDefinition } = useClassDefinitionSelection()
  const { dataLoadingState, setDataLoadingState } = useData()
  const { value } = useTypeSelect()
  const { currentLanguage } = useLanguageSelection()
  const objectRegistry = useInjection<DynamicTypeObjectRegistry>(serviceIds['DynamicTypes/ObjectRegistry'])
  let isValidClass = false
  const hasType = typeof value === 'string' && objectRegistry.hasDynamicType(value)

  if (hasType) {
    const type = objectRegistry.getDynamicType(value)
    isValidClass = type.allowClassSelectionInSearch && selectedClassDefinition?.id !== undefined
  }

  const columnsArg: DataObjectGetGridApiArg['body']['columns'] = selectedColumns.map(column => {
    let advancedColumnConfig: AdvancedColumnConfig | undefined

    if (column.type === 'dataobject.advanced') {
      advancedColumnConfig = column.originalApiDefinition?.__meta?.advancedColumnConfig as unknown as AdvancedColumnConfig
    }

    return {
      key: column.key,
      type: column.type,
      locale: column.localizable ? ((column.locale ?? currentLanguage) === 'default' ? null : (column.locale ?? currentLanguage)) : undefined,
      group: column.group as unknown as string[] | undefined,
      config: advancedColumnConfig ?? column.config
    }
  })

  const systemColumns = availableColumns.filter(column => Array.isArray(column.group) && column.group.includes('system'))

  systemColumns.forEach(column => {
    const hasColumn = columnsArg.some(selectedColumn => selectedColumn.key === column.key)

    if (!hasColumn) {
      columnsArg.push({
        key: column.key,
        type: column.type,
        locale: column.locale,
        config: []
      })
    }
  })

  const getArgs = (): DataObjectGetSearchApiArg => {
    return {
      classId: isValidClass ? selectedClassDefinition?.id : undefined,
      body: {
        columns: columnsArg,
        filters: {
          includeDescendants: true,
          page: 1,
          pageSize: 20
        }
      }
    }
  }

  const hasRequiredArgs = (): boolean => {
    return true
  }

  return {
    getArgs,
    hasRequiredArgs,
    dataLoadingState,
    setDataLoadingState
  }
}
