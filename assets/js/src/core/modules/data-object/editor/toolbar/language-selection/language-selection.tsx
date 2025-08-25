/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { LanguageSelectionWithProvider } from '@Pimcore/components/language-selection/language-selection-with-provider'
import React from 'react'
import { useLanguageSelection } from '@Pimcore/components/language-selection/provider/use-language-selection'

export const LanguageSelection = (): React.JSX.Element => {
  const { hasLocalizedFields } = useLanguageSelection()

  if (!hasLocalizedFields) {
    return <></>
  }

  return <LanguageSelectionWithProvider />
}
