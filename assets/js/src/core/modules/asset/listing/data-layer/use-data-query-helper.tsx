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

import { useSelectedColumns } from '@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/use-selected-columns'
import { useData } from '@Pimcore/modules/element/listing/abstract/data-layer/provider/data/use-data'
import { type SettingsProviderProps } from '@Pimcore/modules/element/listing/abstract/settings/settings-provider'
import { useSettings } from '@Pimcore/modules/element/listing/abstract/settings/use-settings'
import { useAvailableColumns } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/use-available-columns'
import { type AssetGetGridApiArg } from '../../asset-api-slice-enhanced'

export const useDataQueryHelper: SettingsProviderProps['useDataQueryHelper'] = () => {
  const { useElementId } = useSettings()
  const { getId } = useElementId()
  const { selectedColumns } = useSelectedColumns()
  const { availableColumns } = useAvailableColumns()
  const { dataLoadingState, setDataLoadingState } = useData()

  const columnsArg: AssetGetGridApiArg['body']['columns'] = selectedColumns.map(column => ({
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

  const getArgs = (): AssetGetGridApiArg => {
    return {
      body: {
        folderId: getId(),
        columns: columnsArg
      }
    }
  }

  const hasRequiredArgs = (): boolean => {
    const args = getArgs()

    return args.body.folderId !== undefined
  }

  return {
    getArgs,
    hasRequiredArgs,
    dataLoadingState,
    setDataLoadingState
  }
}
