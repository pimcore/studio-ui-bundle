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

import { type DataObjectGetGridApiArg } from '@Pimcore/modules/data-object/data-object-api-slice.gen'
import { useSelectedColumns } from '@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/use-selected-columns'
import { type SettingsProviderProps } from '@Pimcore/modules/element/listing/abstract/settings/settings-provider'
import { useSettings } from '@Pimcore/modules/element/listing/abstract/settings/use-settings'
import { useClassDefinitionSelection } from '../../decorator/class-definition-selection/context-layer/provider/use-class-definition-selection'
import { useData } from '@Pimcore/modules/element/listing/abstract/data-layer/provider/data/use-data'

export const useDataQueryHelper: SettingsProviderProps['useDataQueryHelper'] = () => {
  const { useElementId } = useSettings()
  const { getId } = useElementId()
  const { selectedColumns } = useSelectedColumns()
  const { selectedClassDefinition } = useClassDefinitionSelection()
  const { dataLoadingState, setDataLoadingState } = useData()

  const columnsArg: DataObjectGetGridApiArg['body']['columns'] = selectedColumns.map(column => ({
    key: column.key,
    type: column.type,
    locale: column.locale,
    config: column.config
  }))

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
