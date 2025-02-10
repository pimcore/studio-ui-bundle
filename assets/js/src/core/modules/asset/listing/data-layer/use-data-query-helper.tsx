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
import { type SettingsProviderProps } from '@Pimcore/modules/element/listing/abstract/settings/settings-provider'
import { useSettings } from '@Pimcore/modules/element/listing/abstract/settings/use-settings'
import { type AssetGetGridApiArg } from 'src/sdk/main'

export const useDataQueryHelper: SettingsProviderProps['useDataQueryHelper'] = () => {
  const { useElementId } = useSettings()
  const { getId } = useElementId()
  const { selectedColumns } = useSelectedColumns()
  const columnsArg: AssetGetGridApiArg['body']['columns'] = selectedColumns.map(column => ({
    key: column.key,
    type: column.type,
    locale: column.locale,
    config: column.config
  }))

  const hasIdColumn = selectedColumns.some(column => column.key === 'id')
  const hasFullpathColumn = selectedColumns.some(column => column.key === 'fullpath')

  if (!hasIdColumn) {
    columnsArg.push({
      key: 'id',
      type: 'system.id',
      config: []
    })
  }

  if (!hasFullpathColumn) {
    columnsArg.push({
      key: 'fullpath',
      type: 'system.string',
      config: []
    })
  }

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
    hasRequiredArgs
  }
}
