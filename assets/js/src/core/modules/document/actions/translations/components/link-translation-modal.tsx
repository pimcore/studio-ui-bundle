/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { WindowModal } from '@Pimcore/components/modal/window-modal/window-modal'
import { ModalFooter } from '@Pimcore/components/modal/footer/modal-footer'
import { Button } from '@Pimcore/components/button/button'
import { Spin } from '@Pimcore/components/spin/spin'
import { ManyToOneRelation } from '@Pimcore/components/many-to-one-relation/many-to-one-relation'
import type { ManyToOneRelationValue } from '@Pimcore/components/many-to-one-relation/many-to-one-relation'
import { FormKit } from '@Pimcore/components/form/form-kit'
import { FlagIcon } from '@Pimcore/components/flag-icon/flag-icon'
import { Flex } from '@Pimcore/components/flex/flex'
import { Text } from '@Pimcore/components/text/text'
import { usePropertyGetCollectionForElementByTypeAndIdQuery } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/properties/properties-api-slice-enhanced'
import { useLanguageLookup } from '@Pimcore/modules/translations/hooks/use-language-lookup'
import { isNull, isString, isUndefined } from 'lodash'
import { isNonEmptyString } from '@Pimcore/utils/type-utils'
import { Form } from '@sdk/components'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'

export interface LinkTranslationModalProps {
  isOpen: boolean
  selectedDocument: ManyToOneRelationValue | null
  onSelectedDocumentChange: (document: ManyToOneRelationValue | null) => void
  onClose: () => void
  onSubmit: () => Promise<void>
}

export const LinkTranslationModal = ({
  isOpen,
  selectedDocument,
  onSelectedDocumentChange,
  onClose,
  onSubmit
}: LinkTranslationModalProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { getDisplayName } = useLanguageLookup()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { data: selectedDocumentProperties, isLoading: isLoadingDocumentProperties, error: propertiesError } = usePropertyGetCollectionForElementByTypeAndIdQuery(
    {
      elementType: 'document',
      id: selectedDocument?.id ?? 0
    },
    {
      skip: isNull(selectedDocument)
    }
  )

  useEffect(() => {
    if (!isUndefined(propertiesError)) {
      trackError(new ApiError(propertiesError))
    }
  }, [propertiesError])

  const languageProperty = selectedDocumentProperties?.items?.find(prop => prop.key === 'language')
  const selectedDocumentLanguage = isString(languageProperty?.data) ? languageProperty.data : ''

  const handleSubmit = async (): Promise<void> => {
    setIsSubmitting(true)
    try {
      await onSubmit()
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderLanguageInfo = (): React.ReactNode => {
    if (isLoadingDocumentProperties) {
      return <Spin size="small" />
    }

    if (isNonEmptyString(selectedDocumentLanguage)) {
      return (
        <Flex
          align="center"
          gap="small"
        >
          <FlagIcon value={ selectedDocumentLanguage } />
          <span>
            {getDisplayName(selectedDocumentLanguage)} [{selectedDocumentLanguage}]
          </span>
        </Flex>
      )
    }

    return (
      <Text
        italic
        type="secondary"
      >{t('no-data-available')}</Text>
    )
  }

  return (
    <WindowModal
      footer={
        <ModalFooter>
          <Button
            onClick={ onClose }
            type="default"
          >
            {t('cancel')}
          </Button>
          <Button
            disabled={ isNull(selectedDocument) }
            loading={ isSubmitting }
            onClick={ handleSubmit }
            type="primary"
          >
            {t('apply')}
          </Button>
        </ModalFooter>
      }
      onCancel={ onClose }
      open={ isOpen }
      size="L"
      title={ t('document.translation.link-existing-document') }
    >
      <Form.Item
        label={ t('document.translation.title') }
        layout="vertical"
      >
        <ManyToOneRelation
          allowToClearRelation
          documentsAllowed
          onChange={ onSelectedDocumentChange }
          value={ selectedDocument }
        />
      </Form.Item>

      {!isNull(selectedDocument) && (
        <FormKit.Panel
          border
          theme="border-highlight"
          title={ t('language') }
        >
          {renderLanguageInfo()}
        </FormKit.Panel>
      )}
    </WindowModal>
  )
}
