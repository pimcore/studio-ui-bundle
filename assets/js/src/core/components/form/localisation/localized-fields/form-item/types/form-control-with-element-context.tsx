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
import { isLanguageEditable } from '@Pimcore/components/language-selection/helpers'
import { useLocalizedFields } from '../../provider/localized-fields-provider/use-localized-fields'

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
  const element = useElementContext()
  const elementDraft = useElementDraft(element.id, element.elementType)
  const languageSelection = useLanguageSelection()
  const localizedContext = useLocalizedFields()
  const activeLanguage = localizedContext?.locales[0] ?? languageSelection.currentLanguage

  // The permissions live on the loaded element, not on the draft wrapper returned by
  // useElementDraft() - reading them from the wrapper root never matches, which left every
  // language editable no matter what localizedEdit allowed.
  const isDisabled = !isLanguageEditable(elementDraft.element?.permissions?.localizedEdit, activeLanguage)

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
  ), [Child, isDisabled, props])
}
