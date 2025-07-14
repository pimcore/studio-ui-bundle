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
import { TextArea } from '@Pimcore/components/textarea/textarea'
import { Form } from '@sdk/components'
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useTranslation as useTranslationHook } from '../hooks/use-translation'
import type { TranslationRow } from '../helpers/translation-helpers'

interface EditModalProps {
  translationRow: TranslationRow | null
  locale: string
  open: boolean
  setOpen: (open: boolean) => void
}

interface EditFormValues {
  translation: string
}

export const EditModal = ({ translationRow, locale, ...props }: EditModalProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [form] = Form.useForm<EditFormValues>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<string>('plain-text')
  const { updateTranslationByKey } = useTranslationHook()

  const currentValue = translationRow?.[`_${locale}`] ?? ''

  useEffect(() => {
    if (translationRow && props.open) {
      form.setFieldsValue({
        translation: currentValue
      })
    }
  }, [translationRow, locale, props.open, form, currentValue])

  const onFinish = async (values: EditFormValues): Promise<void> => {
    if (!translationRow) return

    setIsLoading(true)

    const updatedRow: TranslationRow = {
      ...translationRow,
      [`_${locale}`]: values.translation
    }

    await updateTranslationByKey(`_${locale}`, updatedRow)

    props.setOpen(false)
    form.resetFields()
    setIsLoading(false)
  }

  const tabItems = [
    {
      key: 'plain-text',
      label: t('translations.edit-modal.tab.plain-text'),
      children: (
        <Form.Item name="translation">
          <TextArea
            placeholder={ t('translations.edit-modal.tab.plain-text') }
            rows={ 8 }
          />
        </Form.Item>
      )
    },
    {
      key: 'html',
      label: t('translations.edit-modal.tab.html'),
      children: (
        <Form.Item name="translation">
          <TextArea
            placeholder={ t('translations.edit-modal.tab.html') }
            rows={ 8 }
          />
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
      onOk={ () => { void form.submit() } }
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
          activeKey={ activeTab }
          items={ tabItems }
          onChange={ setActiveTab }
        />
      </Form>
    </Modal>
  )
}
