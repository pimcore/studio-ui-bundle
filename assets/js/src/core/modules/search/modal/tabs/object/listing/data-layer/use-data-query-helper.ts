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

import { type DataObjectGetSearchApiArg, type DataObjectGetGridApiArg } from '@Pimcore/modules/data-object/data-object-api-slice.gen'
import { useSelectedColumns } from '@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/use-selected-columns'
import { type SettingsProviderProps } from '@Pimcore/modules/element/listing/abstract/settings/settings-provider'
import { useData } from '@Pimcore/modules/element/listing/abstract/data-layer/provider/data/use-data'
import { useClassDefinitionSelection } from '@Pimcore/modules/data-object/listing/decorator/class-definition-selection/context-layer/provider/use-class-definition-selection'
import { useTypeSelect } from '@Pimcore/modules/element/components/type-select/provider/use-type-select'
import { useInjection } from '@Pimcore/app/depency-injection'
import { type DynamicTypeObjectRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/objects/dynamic-type-object-registry'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'

export const useDataQueryHelper: SettingsProviderProps['useDataQueryHelper'] = () => {
  const { selectedColumns } = useSelectedColumns()
  const { selectedClassDefinition } = useClassDefinitionSelection()
  const { dataLoadingState, setDataLoadingState } = useData()
  const { value } = useTypeSelect()
  const objectRegistry = useInjection<DynamicTypeObjectRegistry>(serviceIds['DynamicTypes/ObjectRegistry'])
  let isValidClass = false
  const hasType = typeof value === 'string' && objectRegistry.hasDynamicType(value)

  if (hasType) {
    const type = objectRegistry.getDynamicType(value)
    isValidClass = type.allowClassSelectionInSearch && selectedClassDefinition?.id !== undefined
  }

  const columnsArg: DataObjectGetGridApiArg['body']['columns'] = selectedColumns.map(column => ({
    key: column.key,
    type: column.type,
    locale: column.locale,
    config: column.config
  }))

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
