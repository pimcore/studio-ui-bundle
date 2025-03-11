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

import { type AbstractDecoratorProps } from '@Pimcore/modules/element/listing/decorators/abstract-decorator'

export const withAdvancedColumnConfig = (useBaseHook: AbstractDecoratorProps['useGridOptions']): AbstractDecoratorProps['useGridOptions'] => {
  const useAdvancedColumnConfigExtension: AbstractDecoratorProps['useGridOptions'] = () => {
    const { transformGridColumn: baseTransformGridColumn, ...baseMethods } = useBaseHook()

    const transformGridColumn: typeof baseTransformGridColumn = (column) => {
      const baseColumn = baseTransformGridColumn(column)

      if (column.type !== 'dataobject.adapter' && column.type !== 'dataobject.objectbrick') {
        return baseColumn
      }

      return {
        ...baseColumn,
        meta: {
          ...baseColumn.meta,
          config: {
            ...baseColumn?.meta?.config ?? {},
            dataObjectType: column.frontendType,
            dataObjectConfig: {
              ...column.config
            }
          }
        }
      }
    }

    return {
      ...baseMethods,
      transformGridColumn
    }
  }

  return useAdvancedColumnConfigExtension
}
