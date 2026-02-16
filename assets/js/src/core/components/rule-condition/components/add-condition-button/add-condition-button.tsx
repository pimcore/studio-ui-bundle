/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { Dropdown } from 'antd'
import { useTranslation } from 'react-i18next'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { useAddConditionMenuItems } from '../../hooks/use-add-condition-menu-items'

interface AddConditionButtonProps {
  afterIndex: number
  disabled?: boolean
  children?: React.ReactNode
}

export const AddConditionButton = ({
  afterIndex,
  disabled = false,
  children
}: AddConditionButtonProps): React.JSX.Element => {
  const { t } = useTranslation()
  const menuItems = useAddConditionMenuItems(afterIndex)

  const defaultButton = (
    <IconTextButton
      disabled={ disabled }
      icon={ { value: 'plus-circle' } }
    >
      {t('rule-condition.add-condition')}
    </IconTextButton>
  )

  return (
    <Dropdown
      disabled={ disabled }
      menu={ { items: menuItems } }
      trigger={ ['click'] }
    >
      {children ?? defaultButton}
    </Dropdown>
  )
}
