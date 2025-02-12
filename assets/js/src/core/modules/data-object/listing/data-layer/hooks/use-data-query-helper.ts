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

export const useDataQueryHelper: SettingsProviderProps['useDataQueryHelper'] = () => {
  const { useElementId } = useSettings()
  const { getId } = useElementId()
  const { selectedColumns } = useSelectedColumns()
  const columnsArg: DataObjectGetGridApiArg['body']['columns'] = selectedColumns.map(column => ({
    key: column.key,
    type: column.type,
    config: column.config
  }))

  const getArgs = (): DataObjectGetGridApiArg => {
    return {
      classId: 'CAR',
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
    hasRequiredArgs
  }
}
