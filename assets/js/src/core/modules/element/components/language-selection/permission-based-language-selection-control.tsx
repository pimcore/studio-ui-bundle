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
import { useOptionalElementContext } from '../../hooks/use-element-context'
import { WithoutElementContext } from './type/without-element-context'
import { WithElementContext } from './type/with-element-context'

export interface PermissionBasedLanguageSelectionControlProps {
  value: string | null
  onChange: (value: string | null) => void
  isNullable?: boolean
  customKeys?: string[]
  excludeLocales?: string[]
}

export const PermissionBasedLanguageSelectionControl = (props: PermissionBasedLanguageSelectionControlProps): React.JSX.Element => {
  const context = useOptionalElementContext()

  if (context === null) {
    return <WithoutElementContext { ...props } />
  }

  return <WithElementContext { ...props } />
}
