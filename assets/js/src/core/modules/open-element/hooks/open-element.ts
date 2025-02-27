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

import { useTranslation } from 'react-i18next'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import { openElementHelper } from '@Pimcore/modules/open-element/hooks/open-element-helper'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'

interface OpenDocumentProp {
  elementType: ElementType
}

export const useOpenElement = ({ elementType }: OpenDocumentProp): void => {
  const { openElementByPathOrId } = openElementHelper()
  const { t } = useTranslation()
  const { input } = useFormModal()

  const modalTexts = {
    'data-object': {
      title: t('open-data-object-modal.title'),
      label: t('open-data-object-modal.label'),
      requiredMessage: t('open-data-object-modal.required-message'),
      okText: t('open-data-object-modal.ok-button'),
      cancelText: t('open-data-object-modal.cancel-button')
    },
    asset: {
      title: t('open-asset-modal.title'),
      label: t('open-asset-modal.label'),
      requiredMessage: t('open-asset-modal.required-message'),
      okText: t('open-asset-modal.ok-button'),
      cancelText: t('open-asset-modal.cancel-button')
    },
    document: {
      title: t('open-document-modal.title'),
      label: t('open-document-modal.label'),
      requiredMessage: t('open-document-modal.required-message'),
      okText: t('open-document-modal.ok-button'),
      cancelText: t('open-document-modal.cancel-button')
    }
  }

  const texts = modalTexts[elementType]

  input({
    title: texts.title,
    label: texts.label,
    rule: {
      required: true,
      message: texts.requiredMessage
    },
    okText: texts.okText,
    cancelText: texts.cancelText,
    onOk: async (value: string) => {
      await openElementByPathOrId(value, elementType)
    }
  })
}
