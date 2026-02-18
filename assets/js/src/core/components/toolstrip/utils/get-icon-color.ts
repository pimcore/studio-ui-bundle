/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ElementIcon } from '../../icon/icon'

interface GetIconColorParams {
  additionalIcon: string | ElementIcon
  additionalIconAutoColor: boolean
  disabled: boolean
  toolStripTheme: 'default' | 'inverse'
  isActivated: boolean
  token: {
    colorText: string
    colorTextInverse: string
    colorInactiveInverse: string
    colorTextDisabled: string
    Button?: {
      defaultColor?: string
    }
  }
}

/**
 * Determines the appropriate color for the ToolStrip additional icon.
 *
 * Priority:
 * 1. ElementIcon.colorToken -> undefined (Icon component handles it)
 * 2. additionalIconAutoColor -> theme-based color
 * 3. Default -> button default color
 */
export function getToolStripIconColor ({
  additionalIcon,
  additionalIconAutoColor,
  disabled,
  toolStripTheme,
  isActivated,
  token
}: GetIconColorParams): string | undefined {
  const isElementIcon = typeof additionalIcon === 'object'
  const hasColorToken = isElementIcon && additionalIcon.colorToken !== undefined

  // colorToken takes precedence
  if (hasColorToken) {
    return undefined
  }

  // Auto-color based on theme/state
  if (additionalIconAutoColor) {
    if (disabled) {
      return token.colorText
    }

    if (toolStripTheme === 'inverse') {
      return isActivated ? token.colorTextInverse : token.colorInactiveInverse
    }

    return isActivated ? token.colorText : token.colorTextDisabled
  }

  // Default button color
  return token.Button?.defaultColor
}
