/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type DataObjectGetGridApiArg } from '@Pimcore/modules/data-object/data-object-api-slice.gen'
import { useSelectedColumns } from '@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/use-selected-columns'
import { type SettingsProviderProps } from '@Pimcore/modules/element/listing/abstract/settings/settings-provider'
import { useSettings } from '@Pimcore/modules/element/listing/abstract/settings/use-settings'
import { useClassDefinitionSelection } from '../../decorator/class-definition-selection/context-layer/provider/use-class-definition-selection'
import { useData } from '@Pimcore/modules/element/listing/abstract/data-layer/provider/data/use-data'
import { useAvailableColumns } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/use-available-columns'

export const useDataQueryHelper: SettingsProviderProps['useDataQueryHelper'] = () => {
  const { useElementId } = useSettings()
  const { getId } = useElementId()
  const { selectedColumns } = useSelectedColumns()
  const { availableColumns } = useAvailableColumns()
  const { selectedClassDefinition } = useClassDefinitionSelection()
  const { dataLoadingState, setDataLoadingState } = useData()

  const columnsArg: DataObjectGetGridApiArg['body']['columns'] = selectedColumns.map(column => ({
    key: column.key,
    type: column.type,
    locale: column.locale,
    config: column.config
  }))

  const systemColumns = availableColumns.filter(column => column.group === 'system')

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

  const getArgs = (): DataObjectGetGridApiArg => {
    if (selectedClassDefinition === undefined) {
      throw new Error('No class definition selected')
    }

    return {
      classId: selectedClassDefinition.id,
      body: {
        folderId: getId(),
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
    const args = getArgs()

    return args.body.folderId !== undefined || selectedClassDefinition !== undefined
  }

  return {
    getArgs,
    hasRequiredArgs,
    dataLoadingState,
    setDataLoadingState
  }
}
