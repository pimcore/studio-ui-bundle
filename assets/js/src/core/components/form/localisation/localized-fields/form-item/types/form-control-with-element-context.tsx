/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { Children, isValidElement, useMemo } from 'react'
import { type FormItemProps } from 'antd'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import { useLanguageSelection } from '@Pimcore/components/language-selection'
import { useElementDraft } from '@Pimcore/modules/element/hooks/use-element-draft'
import { useUser } from '@Pimcore/modules/auth/hooks/use-user'

export interface KeyedFormItemControlProps {
  children: React.ReactNode
  getValueFromEvent?: FormItemProps['getValueFromEvent']
  onChange?: (value: any) => void
  value?: any
  id?: string
  disabled?: boolean
}

export const FormControlWithElementContext = ({ children, ...props }: KeyedFormItemControlProps): React.JSX.Element => {
  const Child = useMemo(() => Children.only(children), [children])
  let isDisabled = false
  const user = useUser()
  const element = useElementContext()
  const elementDraft = useElementDraft(element.id, element.elementType)
  const languageSelection = useLanguageSelection()

  if ('permissions' in elementDraft) {
    const permissions: Record<string, any> = elementDraft.permissions as Record<string, any>
    let editableLanguages: string[] = permissions?.localizedEdit?.split(',') ?? []
    if ((editableLanguages.length === 1 && editableLanguages[0] === 'default') || (editableLanguages.length === 0)) {
      editableLanguages = Array.isArray(user.contentLanguages) ? user.contentLanguages as string[] : []
    }

    isDisabled = !editableLanguages.includes(languageSelection.currentLanguage)
  }

  if (!isValidElement(Child)) {
    throw new Error('KeyedFormItemControl only accepts a single child')
  }

  const Component = Child.type

  return useMemo(() => (
    <Component
      { ...Child.props }
      { ...props }
      disabled={ Child.props.disabled === true || (props.disabled !== true ? isDisabled : false) }
    />
  ), [Child, props])
}
