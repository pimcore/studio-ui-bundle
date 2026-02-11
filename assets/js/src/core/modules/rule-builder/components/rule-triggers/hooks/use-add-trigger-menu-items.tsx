/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo } from 'react'
import { Tooltip, type MenuProps } from 'antd'
import { useTranslation } from 'react-i18next'
import { Icon } from '@Pimcore/components/icon/icon'
import { useRuleTriggers } from '../provider/rule-triggers-provider/use-rule-triggers'
import { isNil } from 'lodash'

/**
 * Shared hook for generating trigger type menu items with icons
 */
export const useAddTriggerMenuItems = (): MenuProps['items'] => {
  const { registry, handleAddTrigger } = useRuleTriggers()
  const { t } = useTranslation()

  return useMemo(() => {
    const allTriggerTypes = registry.getDynamicTypes()

    return allTriggerTypes.map((dynamicType) => {
      const isAvailable = dynamicType.isAvailable?.() ?? true
      const label = t(dynamicType.label)

      return {
        key: dynamicType.id,
        label: !isAvailable && dynamicType.notAvailableHint !== undefined
          ? (
            <Tooltip title={ t(dynamicType.notAvailableHint) }>
              <span>{label}</span>
            </Tooltip>
            )
          : label,
        icon: isNil(dynamicType.icon) ? undefined : <Icon { ...dynamicType.icon } />,
        disabled: !isAvailable,
        onClick: () => { handleAddTrigger(dynamicType.id) }
      }
    })
  }, [registry, handleAddTrigger, t])
}
