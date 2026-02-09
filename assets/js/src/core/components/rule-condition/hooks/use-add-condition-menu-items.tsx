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
import { type MenuProps } from 'antd'
import { useTranslation } from 'react-i18next'
import { Icon } from '@Pimcore/components/icon/icon'
import { useRuleConditionContext } from '../provider/rule-condition-provider/use-rule-condition-context'
import { isNil } from 'lodash'

/**
 * Shared hook for generating condition type menu items with icons
 */
export const useAddConditionMenuItems = (afterIndex: number): MenuProps['items'] => {
  const { conditionTypes, onConditionAdd } = useRuleConditionContext()
  const { t } = useTranslation()

  return useMemo(() =>
    conditionTypes.map((type) => ({
      key: `condition-${type.id}`,
      label: t(type.label),
      icon: isNil(type.icon) ? undefined : <Icon { ...type.icon } />,
      onClick: () => { onConditionAdd(afterIndex, type.id) }
    }))
  , [conditionTypes, afterIndex, onConditionAdd])
}
