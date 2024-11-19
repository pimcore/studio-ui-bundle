/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
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
