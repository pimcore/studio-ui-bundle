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
import { useStyles } from './bracket-button.styles'

interface BracketButtonProps {
  side: 'left' | 'right'
  active: boolean
  onToggle: () => void
  disabled?: boolean
  hasError?: boolean
}

export const BracketButton = ({
  side,
  active,
  onToggle,
  disabled = false,
  hasError = false
}: BracketButtonProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles, cx } = useStyles()

  const label = t(side === 'left' ? 'rule-condition.bracket.toggle-left' : 'rule-condition.bracket.toggle-right')
  const icon = side === 'left' ? '(' : ')'

  return (
    <button
      aria-label={ label }
      aria-pressed={ active }
      className={ cx(
        styles.bracketButton,
        {
          [styles.bracketButtonActive]: active && !hasError,
          [styles.bracketButtonError]: hasError
        }
      ) }
      disabled={ disabled }
      onClick={ onToggle }
      type="button"
    >
      {icon}
    </button>
  )
}
