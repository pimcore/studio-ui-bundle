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
import { Content } from '@Pimcore/components/content/content'
import { ManyToOneRelation } from '@Pimcore/components/many-to-one-relation/many-to-one-relation'
import type { ManyToOneRelationValue } from '@Pimcore/components/many-to-one-relation/many-to-one-relation'
import { Form } from '@sdk/components'
import { Input } from '@Pimcore/components/input/input'
import { Select } from '@Pimcore/components/select/select'
import { type LanguageOption } from '@Pimcore/modules/document/actions/paste/use-paste'
import { useSettings } from '@Pimcore/modules/app/settings/hooks/use-settings'
import { has, isNil, isString, isUndefined } from 'lodash'
import { useLanguageLookup } from '@Pimcore/modules/translations/hooks/use-language-lookup'
import { useDocumentGetTranslationParentByLanguageQuery, useLazyDocumentGetTranslationsQuery } from '@Pimcore/modules/document/document-api-slice-enhanced'
import { type Element } from '@Pimcore/modules/element/element-helper'
import { TranslationErrorAlert } from './translation-error-alert'

export interface NewTranslationModalProps {
  isOpen: boolean
  useInheritance: boolean
  onClose: () => void
  onSubmit: (values: NewTranslationFormValues) => Promise<void>
  currentDocument: Element | null
}

export interface NewTranslationFormValues {
  language: string
  parent: ManyToOneRelationValue | null
  title: string
  navigation: string
  key: string
}

export const NewTranslationModal = ({
  isOpen,
  useInheritance,
  onClose,
  onSubmit,
  currentDocument
}: NewTranslationModalProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { getDisplayName } = useLanguageLookup()
  const settings = useSettings()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState<string>('')
  const [form] = Form.useForm<NewTranslationFormValues>()

  const documentId = isNil(currentDocument?.id) ? 0 : Number(currentDocument.id)

  const [fetchTranslations, { isFetching: isTranslationsLoading, error: translationsError }] = useLazyDocumentGetTranslationsQuery()

  useEffect(() => {
    if (isOpen && documentId !== 0) {
      void fetchTranslations({ id: documentId })
    }
  }, [isOpen, documentId])

  const languageProperty = (!isNil(currentDocument) && has(currentDocument, 'properties') && Array.isArray(currentDocument?.properties))
    ? currentDocument.properties?.find(prop => prop.key === 'language')
    : undefined
  const currentDocumentLanguage = isString(languageProperty?.data) ? languageProperty.data : ''

  const availableLanguages: LanguageOption[] = (settings.validLanguages ?? [])
    .filter((locale: string) => locale !== currentDocumentLanguage)
    .map((locale: string) => ({
      value: locale,
      label: `${getDisplayName(locale)} [${locale}]`
    }))

  const { data: translationParentData, error: translationParentError, isLoading: isLoadingParent, isFetching: isFetchingParent } = useDocumentGetTranslationParentByLanguageQuery(
    {
      id: documentId,
      language: selectedLanguage
    },
    { skip: selectedLanguage === '' || documentId === 0 }
  )

  const isParentLoading = isLoadingParent || isFetchingParent

  // Auto-preselect parent when translation parent data is available and contains fullPath
  useEffect(() => {
    if (!isNil(translationParentError)) {
      // Reset parent field when there's an error (no translation parent found)
      form.setFieldValue('parent', null)
    } else if (!isNil(translationParentData?.fullPath) && !isNil(translationParentData?.id)) {
      form.setFieldValue('parent', {
        id: translationParentData.id,
        type: 'document',
        fullPath: translationParentData.fullPath
      })
    }
  }, [translationParentData, translationParentError, form])

  const handleSubmit = async (): Promise<void> => {
    setIsSubmitting(true)
    try {
      const values = await form.validateFields()
      await onSubmit(values)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value
    form.setFieldsValue({
      title: value,
      navigation: value,
      key: value
    })
  }

  const handleLanguageChange = (language: string): void => {
    setSelectedLanguage(language)
    // Reset parent field when language changes - it will be auto-filled by useEffect if translation parent exists
    form.setFieldValue('parent', null)
  }

  const modalTitle = useInheritance
    ? t('document.translation.new-document-with-inheritance.modal-title')
    : t('document.translation.new-document-blank.modal-title')

  const renderBody = (): React.ReactNode => {
    if (isTranslationsLoading) {
      return <Content loading />
    }

    if (!isUndefined(translationsError)) {
      return <TranslationErrorAlert error={ translationsError } />
    }

    return (
      <Form
        form={ form }
        initialValues={ {
          language: '',
          parent: null,
          title: '',
          navigation: '',
          key: ''
        } }
        layout="vertical"
      >
        <Form.Item
          label={ t('document.translation.new-document-modal.label.language') }
          name="language"
          rules={ [{ required: true, message: t('form.validation.required') }] }
        >
          <Select
            onChange={ handleLanguageChange }
            options={ availableLanguages }
          />
        </Form.Item>

        <Form.Item
          label={ t('document.translation.new-document-modal.label.parent') }
          name="parent"
          rules={ [{ required: true, message: t('form.validation.required') }] }
        >
          <ManyToOneRelation
            allowToClearRelation
            disabled={ isParentLoading }
            documentsAllowed
          />
        </Form.Item>

        <Form.Item
          label={ t('add-document-form.label.title') }
          name="title"
          rules={ [{ required: true, message: t('form.validation.required') }] }
        >
          <Input onChange={ handleTitleChange } />
        </Form.Item>

        <Form.Item
          label={ t('add-document-form.label.navigation') }
          name="navigation"
          rules={ [{ required: true, message: t('form.validation.required') }] }
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={ t('add-document-form.label.key') }
          name="key"
          rules={ [{ required: true, message: t('form.validation.required') }] }
        >
          <Input />
        </Form.Item>
      </Form>
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
            disabled={ isTranslationsLoading || !isUndefined(translationsError) }
            loading={ isSubmitting }
            onClick={ handleSubmit }
            type="primary"
          >
            {t('document.translation.new-document-modal.create')}
          </Button>
        </ModalFooter>
      }
      onCancel={ onClose }
      open={ isOpen }
      size="L"
      title={ modalTitle }
    >
      {renderBody()}
    </WindowModal>
  )
}
