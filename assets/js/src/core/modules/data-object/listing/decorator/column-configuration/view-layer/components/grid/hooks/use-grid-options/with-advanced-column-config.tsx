/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useTranslation } from 'react-i18next'
import { type AbstractDecoratorProps } from '@Pimcore/modules/element/listing/decorators/abstract-decorator'
import { isEmptyValue } from '@Pimcore/utils/type-utils'
import { hasFieldDefinition } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/has-field-definition'

export const withAdvancedColumnConfig = (useBaseHook: AbstractDecoratorProps['useGridOptions']): AbstractDecoratorProps['useGridOptions'] => {
  const useAdvancedColumnConfigExtension: AbstractDecoratorProps['useGridOptions'] = () => {
    const { transformGridColumn: baseTransformGridColumn, ...baseMethods } = useBaseHook()
    const { t } = useTranslation()

    const transformGridColumn: typeof baseTransformGridColumn = (column) => {
      const baseColumn = baseTransformGridColumn(column)

      if (column.type !== 'dataobject.adapter' && column.type !== 'dataobject.objectbrick' && column.type !== 'dataobject.classificationstore') {
        return baseColumn
      }

      let translationKey = column.key!

      if (hasFieldDefinition(column.config)) {
        const fieldDefinition = column.config.fieldDefinition as Record<string, any>
        translationKey = !isEmptyValue(fieldDefinition?.title) ? fieldDefinition?.title : column.key
      }

      return {
        ...baseColumn,
        header: t(translationKey) + (column.locale !== undefined && column.locale !== null ? ` (${column.locale})` : ''),
        meta: {
          ...baseColumn.meta,
          config: {
            ...baseColumn?.meta?.config ?? {},
            dataObjectType: column.config?.fieldDefinition?.fieldtype ?? column.frontendType,
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
