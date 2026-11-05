/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { useStyles } from './restore-inheritance-button.styles'

export interface RestoreInheritanceButtonProps {
  onRestore: () => void
}

export const RestoreInheritanceButton = ({ onRestore }: RestoreInheritanceButtonProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()

  // The block header renders the button in a collapsible panel title, which would
  // otherwise toggle on the same click.
  const onClick = (event: MouseEvent): void => {
    event.stopPropagation()
    onRestore()
  }

  return (
    <IconTextButton
      className={ styles.button }
      icon={ { value: 'corner-up-left' } }
      onClick={ onClick }
      size="small"
      type="link"
    >
      { t('inheritance-restore') }
    </IconTextButton>
  )
}
