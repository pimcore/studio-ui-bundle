/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useTranslation } from 'react-i18next'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import { openElementHelper } from '@Pimcore/modules/open-element/hooks/open-element-helper'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import React from 'react'

interface OpenDocumentProp {
  elementType: ElementType
}

export const modalTexts = {
  'data-object': {
    title: 'open-data-object-modal.title',
    label: 'open-data-object-modal.label',
    requiredMessage: 'open-data-object-modal.required-message',
    okText: 'open-data-object-modal.ok-button',
    cancelText: 'open-data-object-modal.cancel-button'
  },
  asset: {
    title: 'open-asset-modal.title',
    label: 'open-asset-modal.label',
    requiredMessage: 'open-asset-modal.required-message',
    okText: 'open-asset-modal.ok-button',
    cancelText: 'open-asset-modal.cancel-button'
  },
  document: {
    title: 'open-document-modal.title',
    label: 'open-document-modal.label',
    requiredMessage: 'open-document-modal.required-message',
    okText: 'open-document-modal.ok-button',
    cancelText: 'open-document-modal.cancel-button'
  }
}

export const OpenElement = ({ elementType }: OpenDocumentProp): React.JSX.Element => {
  const { openElementByPathOrId } = openElementHelper()
  const { t } = useTranslation()
  const { input } = useFormModal()

  const buttonTexts = {
    'data-object': t('open-data-object.button'),
    asset: t('open-asset.button'),
    document: t('open-document.button')
  }

  const texts = modalTexts[elementType]
  const handleClick = (): void => {
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
      }
    })
  }

  return (
    <button
      className={ 'main-nav__list-btn' }
      onClick={ handleClick }
    >
      {buttonTexts[elementType]}
    </button>
  )
}
