/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { LanguageSelection as BaseLanguageSelection } from './language-selection'
import React from 'react'
import { useLanguageSelection } from './provider/use-language-selection'
import { useUser } from '@Pimcore/modules/auth/hooks/use-user'

export const LanguageSelectionWithProvider = (): React.JSX.Element => {
  const user = useUser()
  const { currentLanguage, setCurrentLanguage } = useLanguageSelection()

  return (
    <BaseLanguageSelection
      languages={ [...(Array.isArray(user.contentLanguages) ? user.contentLanguages : [])] }
      onSelectLanguage={ setCurrentLanguage }
      selectedLanguage={ currentLanguage }
    />
  )
}
