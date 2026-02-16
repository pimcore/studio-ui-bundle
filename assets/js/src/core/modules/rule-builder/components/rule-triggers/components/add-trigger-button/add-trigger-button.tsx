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
import { useTranslation } from 'react-i18next'
import { Dropdown } from '@Pimcore/components/dropdown/dropdown'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { useAddTriggerMenuItems } from '../../hooks/use-add-trigger-menu-items'

interface AddTriggerButtonProps {
  disabled?: boolean
  children?: React.ReactNode
}

export const AddTriggerButton = ({
  disabled = false,
  children
}: AddTriggerButtonProps): React.JSX.Element => {
  const { t } = useTranslation()
  const menuItems = useAddTriggerMenuItems()

  const defaultButton = (
    <IconTextButton
      disabled={ disabled }
      icon={ { value: 'plus-circle' } }
    >
      {t('rule-builder.add-trigger')}
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
