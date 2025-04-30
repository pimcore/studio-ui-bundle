/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { LanguageSelection as BaseLanguageSelection } from '@Pimcore/components/language-selection/language-selection'
import { useSettings } from '@Pimcore/modules/app/settings/hooks/use-settings'
import React from 'react'
import { useLanguageSelection } from './provider/use-language-selection'

export const LanguageSelection = (): React.JSX.Element => {
  const settings = useSettings()
  const { currentLanguage, setCurrentLanguage } = useLanguageSelection()

  return (
    <BaseLanguageSelection
      languages={ [...settings.requiredLanguages] }
      onSelectLanguage={ setCurrentLanguage }
      selectedLanguage={ currentLanguage }
    />
  )
}
