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
import { createColumnHelper } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'

const columnHelper = createColumnHelper()

export const withActionColumnConfiguration = (useBaseHook: AbstractDecoratorProps['useGridOptions']): AbstractDecoratorProps['useGridOptions'] => {
  const useActionColumnExtension: typeof useBaseHook = () => {
    const { t } = useTranslation()
    const { transformGridColumnDefinition: baseTransformGridColumnDefinition, ...baseMethods } = useBaseHook()

    const transformGridColumnDefinition: typeof baseTransformGridColumnDefinition = (columnDefinition) => {
      const baseColumnConfiguration = baseTransformGridColumnDefinition(columnDefinition)

      baseColumnConfiguration.push(
        columnHelper.accessor('actions', {
          header: t('actions.open'),
          enableSorting: false,
          meta: {
            type: 'data-object-actions'
          },
          size: 65
        })
      )

      return baseColumnConfiguration
    }

    return {
      ...baseMethods,
      transformGridColumnDefinition
    }
  }

  return useActionColumnExtension
}
