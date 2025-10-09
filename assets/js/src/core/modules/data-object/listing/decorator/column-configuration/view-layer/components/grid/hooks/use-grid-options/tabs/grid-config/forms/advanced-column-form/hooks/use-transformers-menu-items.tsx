/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isNil, isUndefined } from 'lodash'
import { useTranslation } from 'react-i18next'
import type { DropdownMenuProps } from '@Pimcore/components/dropdown/dropdown'
import type { DynamicTypePipelineAbstract } from '@Pimcore/modules/element/dynamic-types/definitions/pipelines/dynamic-type-pipeline-abstract'
import { useNumberedList } from '@Pimcore/components/form/controls/numbered-list/provider/numbered-list/use-numbered-list'

interface IUseTransformersMenuItemsReturn {
  transformersMenuItems: DropdownMenuProps['items']
}

const TRANSFORMERS_GROUP = {
  boolean: ['booleanFormatter'],
  date: ['dateFormatter'],
  string: ['anonymizer', 'blur', 'caseChange', 'combine', 'explode', 'stringReplace', 'substring', 'trim'],
  other: ['elementCounter', 'twigOperator']
}

export const useTransformersMenuItems = (availableDynamicTypes?: DynamicTypePipelineAbstract[]): IUseTransformersMenuItemsReturn => {
  if (isUndefined(availableDynamicTypes)) return { transformersMenuItems: [] }

  const { t } = useTranslation()

  const { operations } = useNumberedList()

  const transformersMenuItems: DropdownMenuProps['items'] = Object.entries(TRANSFORMERS_GROUP).map(([groupKey, transformerIds]) => ({
    key: `${groupKey}Transformers`,
    label: t(`grid.advanced-column.advancedColumns.group.${groupKey}`),
    children: availableDynamicTypes
      .filter(dynamicType => transformerIds.includes(dynamicType.id))
      .map(dynamicType => ({
        key: dynamicType.id,
        label: t(`grid.advanced-column.advancedColumns.${dynamicType.id}`),
        onClick: () => { operations.add({ key: dynamicType.id }) }
      }))
      .filter(item => !isNil(item))
  }))

  return { transformersMenuItems }
}
