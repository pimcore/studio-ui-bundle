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
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'

export interface RestoreInheritanceButtonProps {
  onRestore: () => void
}

export const RestoreInheritanceButton = ({ onRestore }: RestoreInheritanceButtonProps): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <IconTextButton
      icon={ { value: 'corner-up-left' } }
      onClick={ onRestore }
      size="small"
      type="link"
    >
      { t('inheritance-restore') }
    </IconTextButton>
  )
}
