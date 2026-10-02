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
import { LanguageSelection } from '@Pimcore/components/language-selection/language-selection'
import { useUser } from '@Pimcore/modules/auth/hooks/use-user'

export interface ColumnLocaleControlProps {
  value: string | null | undefined
  onChange: (locale: string | null) => void
  /** Extra selectable keys besides the content languages, e.g. `default` for classification store columns. */
  customKeys?: string[]
}

export const ColumnLocaleControl = (
  { value, onChange, customKeys = [] }: ColumnLocaleControlProps
): React.JSX.Element => {
  const user = useUser()
  const languages: string[] = [
    '-',
    ...customKeys,
    ...(Array.isArray(user.contentLanguages) ? (user.contentLanguages as string[]) : [])
  ]
  const selected = value ?? '-'

  return (
    <LanguageSelection
      languages={ languages }
      onSelectLanguage={ (lang) => { onChange(lang === '-' ? null : lang) } }
      selectedLanguage={ selected }
    />
  )
}
