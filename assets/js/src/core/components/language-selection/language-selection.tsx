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

import { Button } from '@Pimcore/components/button/button'
import React, { useEffect, useState } from 'react'
import { Icon } from '@Pimcore/components/icon/icon'
import { useStyles } from './langguage-selection.styles'

interface LanguageSelectionProps {
  languages: string[]
  selectedLanguage: string
  onSelectLanguage: (language: string) => void
}

export const LanguageSelection = ({ languages, selectedLanguage, onSelectLanguage }: LanguageSelectionProps): React.JSX.Element => {
  const { styles } = useStyles()
  const [language, setLanguage] = useState<string>(selectedLanguage)

  useEffect(() => {
    setLanguage(selectedLanguage)
  }, [selectedLanguage])

  return (
    <div className={ ['language-select', styles.languageSelect].join(' ') }>
      <Button
        onClick={ goToPreviousLanguage }
        type='link'
      >
        <Icon
          name='chevron-left'
          options={ { width: 18, height: 18 } }
        />
      </Button>

      <div className='language-select__current-value'>
        <Icon name='flag-outlined' /> <span>{language}</span>
      </div>

      <Button
        onClick={ goToNextLanguage }
        type='link'
      >
        <Icon
          name='chevron-right'
          options={ { width: 18, height: 18 } }
        />
      </Button>
    </div>
  )

  function goToNextLanguage (): void {
    const currentIndex = languages.indexOf(language)
    const nextIndex = currentIndex === languages.length - 1 ? 0 : currentIndex + 1
    handleLanguageChange(languages[nextIndex])
  }

  function goToPreviousLanguage (): void {
    const currentIndex = languages.indexOf(language)
    const previousIndex = currentIndex === 0 ? languages.length - 1 : currentIndex - 1
    handleLanguageChange(languages[previousIndex])
  }

  function handleLanguageChange (language: string): void {
    setLanguage(language)
    onSelectLanguage(language)
  }
}
