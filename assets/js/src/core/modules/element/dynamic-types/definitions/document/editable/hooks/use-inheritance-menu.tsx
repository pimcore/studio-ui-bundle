/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type MenuProps } from 'antd'
import { useTranslation } from 'react-i18next'

export interface UseInheritanceMenuProps {
  onOverwrite?: () => void
}

export const useInheritanceMenu = ({ onOverwrite }: UseInheritanceMenuProps): {
  inheritanceMenuItems: MenuProps['items']
  inheritanceTooltip: string
} => {
  const { t } = useTranslation()

  const inheritanceMenuItems: MenuProps['items'] = [
    {
      key: 'overwrite',
      label: t('document.editable.inheritance.overwrite'),
      onClick: onOverwrite
    }
  ]

  const inheritanceTooltip = t('document.editable.inheritance.tooltip')

  return {
    inheritanceMenuItems,
    inheritanceTooltip
  }
}
