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
import { ManyToOneRelation } from '@Pimcore/components/many-to-one-relation/many-to-one-relation'
import type { ManyToOneRelationValue } from '@Pimcore/components/many-to-one-relation/many-to-one-relation'
import { Form } from '@sdk/components'
import { Input } from '@Pimcore/components/input/input'
import { Select } from '@Pimcore/components/select/select'
import { type LanguageOption } from '@Pimcore/modules/document/actions/paste/use-paste'
import { useSettings } from '@Pimcore/modules/app/settings/hooks/use-settings'
import { isString } from 'lodash'
import type { Element } from '@Pimcore/modules/element/element-helper'
import { useLanguageLookup } from '@Pimcore/modules/translations/hooks/use-language-lookup'
import { useDocumentGetTranslationParentByLanguageQuery } from '@Pimcore/modules/document/document-api-slice-enhanced'

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

  const languageProperty = currentDocument?.properties?.find(prop => prop.key === 'language')
  const currentDocumentLanguage = isString(languageProperty?.data) ? languageProperty.data : ''

  const availableLanguages: LanguageOption[] = (settings.validLanguages ?? [])
    .filter((locale: string) => locale !== currentDocumentLanguage)
    .map((locale: string) => ({
      value: locale,
      label: `${getDisplayName(locale)} [${locale}]`
    }))

  const { data: translationParentData } = useDocumentGetTranslationParentByLanguageQuery(
    {
      id: currentDocument?.id ?? 0,
      language: selectedLanguage
    },
    { skip: !selectedLanguage || !currentDocument?.id }
  )

  // Auto-preselect parent when translation parent data is available and contains fullPath
  useEffect(() => {
    if (translationParentData?.fullPath && translationParentData?.id) {
      form.setFieldValue('parent', {
        id: translationParentData.id,
        type: 'document',
        fullPath: translationParentData.fullPath
      })
    }
  }, [translationParentData, form])

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
    form.setFieldValue('language', language)
    setSelectedLanguage(language)
    // Reset parent field when language changes - it will be auto-filled by useEffect if translation parent exists
    form.setFieldValue('parent', null)
  }

  const modalTitle = useInheritance
    ? t('document.translation.new-document-with-inheritance.modal-title')
    : t('document.translation.new-document-blank.modal-title')

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
            loading={ isSubmitting }
            onClick={ handleSubmit }
            type="primary"
          >
            {t('create')}
          </Button>
        </ModalFooter>
      }
      onCancel={ onClose }
      open={ isOpen }
      size="L"
      title={ modalTitle }
    >
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
          label={ t('language') }
          name="language"
          rules={ [{ required: true, message: t('form.validation.required') }] }
        >
          <Select
            onChange={ handleLanguageChange }
            options={ availableLanguages }
          />
        </Form.Item>

        <Form.Item
          label={ t('parent') }
          name="parent"
          rules={ [{ required: true, message: t('form.validation.required') }] }
        >
          <ManyToOneRelation
            allowToClearRelation
            documentsAllowed
            onChange={ (value) => { form.setFieldValue('parent', value) } }
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
    </WindowModal>
  )
}
