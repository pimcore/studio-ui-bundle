/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type TabNode } from 'flexlayout-react'
import { useTranslation } from 'react-i18next'
import { isNonEmptyString } from '@Pimcore/utils/type-utils'
import { type ElementIcon } from '@sdk/components'

interface UseWidgetTitleReturn {
  title: string
  icon: ElementIcon
}

interface UseWidgetTitleOptions {
  titleOverride?: string
  iconOverride?: ElementIcon
}

export const useWidgetTitle = (node: TabNode, options: UseWidgetTitleOptions = {}): UseWidgetTitleReturn => {
  const { t } = useTranslation()
  const config = node.getConfig()
  const { titleOverride, iconOverride } = options

  const resolveTitle = (): string => {
    if (isNonEmptyString(titleOverride)) {
      return titleOverride
    }

    if (isNonEmptyString(config.translationKey)) {
      return t(config.translationKey as string)
    }

    if (isNonEmptyString(config.label)) {
      return config.label
    }

    return node.getName()
  }

  const resolveIcon = (): ElementIcon => {
    return iconOverride ?? config.icon ?? { value: 'widget-default', type: 'name' }
  }

  return {
    title: resolveTitle(),
    icon: resolveIcon()
  }
}
