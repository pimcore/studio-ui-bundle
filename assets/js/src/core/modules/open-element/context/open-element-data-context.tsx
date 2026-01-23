/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext, useContext, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { isUndefined } from 'lodash'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import { openElementHelper } from '@Pimcore/modules/open-element/hooks/open-element-helper'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { modalTexts } from '@Pimcore/modules/open-element/constants'

interface IOpenElementContext {
  open: (type: ElementType, closeMainNav?: () => void) => void
}

const OpenElementContext = createContext<IOpenElementContext | undefined>(undefined)

export const OpenElementProvider = ({ children }: { children: React.ReactNode }): React.JSX.Element => {
  const { openElementByPathOrId } = openElementHelper()
  const { t } = useTranslation()
  const { input } = useFormModal()

  const open = (elementType: ElementType, closeMainNav?: () => void): void => {
    const texts = modalTexts[elementType]

    input({
      title: t(texts.title),
      label: t(texts.label),
      rule: {
        required: true,
        message: t(texts.requiredMessage)
      },
      okText: t(texts.okText),
      cancelText: t(texts.cancelText),
      onOk: async (value: string) => {
        await openElementByPathOrId(value, elementType)
        closeMainNav?.()
      }
    })
  }

  const value = useMemo(() => ({ open }), [])

  return (
    <OpenElementContext.Provider value={ value }>
      {children}
    </OpenElementContext.Provider>
  )
}

export const useOpenElement = (): IOpenElementContext => {
  const context = useContext(OpenElementContext)

  if (isUndefined(context)) {
    throw new Error('useOpenElement must be used within a OpenElementProvider')
  }

  return context
}
