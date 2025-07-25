/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Modal } from '@Pimcore/components/modal/modal'
import { ModalTitle } from '@Pimcore/components/modal/modal-title/modal-title'
import { Tabs } from '@Pimcore/components/tabs/tabs'
import { Form, TextArea } from '@sdk/components'
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useTranslation as useTranslationHook } from '../hooks/use-translation'
import type { TranslationRow } from '../helpers/translation-helpers'
import { TranslationHtmlPreview } from '../components/translation-text-preview/translation-html-preview'

interface EditModalProps {
  translationRow: TranslationRow | null
  locale: string
  open: boolean
  setOpen: (open: boolean) => void
  onSave?: (newValue: string) => void
}

interface EditFormValues {
  translation: string
}

export const EditModal = ({ translationRow, locale, ...props }: EditModalProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [form] = Form.useForm<EditFormValues>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { updateTranslationByKey, domain } = useTranslationHook()
  const currentValue = translationRow?.[`_${locale}`] ?? ''

  useEffect(() => {
    if (translationRow !== null && props.open) {
      form.setFieldsValue({
        translation: currentValue
      })
    }
  }, [translationRow, locale, props.open, form, currentValue])

  const onFinish = async (values: EditFormValues): Promise<void> => {
    if (translationRow === null) return

    setIsLoading(true)

    if (props.onSave) {
      props.onSave(values.translation)
    } else {
      const updatedRow: TranslationRow = {
        ...translationRow,
        [`_${locale}`]: values.translation
      }
      await updateTranslationByKey(`_${locale}`, updatedRow, domain)
    }

    props.setOpen(false)
    form.resetFields()
    setIsLoading(false)
  }

  const tabItems = [
    {
      label: t('translations.edit-modal.tab.plain-text'),
      key: 'plain-text',
      children: (
        <Form.Item name="translation">
          <TextArea
            rows={ 3 }
          />
        </Form.Item>
      )
    },
    {
      label: t('translations.edit-modal.tab.html'),
      key: 'html',
      children: (
        <Form.Item name="translation">
          <TranslationHtmlPreview />
        </Form.Item>
      )
    }
  ]

  return (
    <Modal
      okButtonProps={ { loading: isLoading } }
      okText={ t('translations.edit-modal.save') }
      onCancel={ () => {
        props.setOpen(false)
        form.resetFields()
      } }
      onOk={ () => { form.submit() } }
      open={ props.open }
      size="L"
      title={ (
        <ModalTitle iconName='edit'>
          {t('translations.edit-modal.title')}
        </ModalTitle>
      ) }
    >
      <Form
        form={ form }
        onFinish={ onFinish }
      >
        <Tabs
          destroyInactiveTabPane
          items={ tabItems }
          noPadding
        />
      </Form>
    </Modal>
  )
}
