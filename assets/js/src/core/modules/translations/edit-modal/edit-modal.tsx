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
import { ModalFooter } from '@Pimcore/components/modal/footer/modal-footer'
import { Tabs } from '@Pimcore/components/tabs/tabs'
import { Form, TextArea, Button } from '@sdk/components'
import { Flex } from '@Pimcore/components/flex/flex'
import React, { useState, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useTranslation as useTranslationHook } from '../hooks/use-translation'
import type { TranslationRow } from '../helpers/translation-helpers'
import { Wysiwyg } from '@Pimcore/modules/wysiwyg/wysiwyg'
import { WysiwygContext } from '@Pimcore/modules/wysiwyg/interface/wysiwyg'
import { useTranslationDomain } from '../hooks/translation-domain-provider'
import { isHtmlContent } from '@Pimcore/utils/html-detection'

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
  const { updateTranslationByKey } = useTranslationHook()
  const { domain } = useTranslationDomain()
  const currentValue = translationRow?.[`_${locale}`] ?? ''
  const [isRestored, setIsRestored] = useState<boolean>(false)
  const [activeTabKey, setActiveTabKey] = useState<string>('plain-text')
  const [currentFormValue, setCurrentFormValue] = useState<string>('')

  const originalContentIsHtml = useMemo(() => {
    return isHtmlContent(currentValue)
  }, [currentValue])

  const currentFormValueIsHtml = isHtmlContent(currentFormValue)

  const showOnlyHtmlTab = originalContentIsHtml && !isRestored
  const showRestoreButton = currentFormValueIsHtml

  useEffect(() => {
    if (translationRow !== null && props.open) {
      form.setFieldsValue({
        translation: currentValue
      })
      setCurrentFormValue(currentValue)
      setIsRestored(false)
      setActiveTabKey(showOnlyHtmlTab ? 'html' : 'plain-text')
    }
  }, [translationRow, locale, props.open, form, currentValue])

  useEffect(() => {
    if (showOnlyHtmlTab) {
      setActiveTabKey('html')
    } else if (isRestored) {
      setActiveTabKey('plain-text')
    }
  }, [showOnlyHtmlTab, isRestored])

  const onFinish = async (values: EditFormValues): Promise<void> => {
    if (translationRow === null) return

    setIsLoading(true)

    if (props.onSave !== undefined) {
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

  const handleRestore = (): void => {
    console.log('Restore clicked - before:', { isRestored, showOnlyHtmlTab })
    setIsRestored(true)

    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = currentFormValue
    const plainTextValue = tempDiv.textContent ?? tempDiv.innerText ?? ''

    form.setFieldsValue({
      translation: plainTextValue.trim()
    })
    setCurrentFormValue(plainTextValue.trim())
    setActiveTabKey('plain-text')
    console.log('Restore clicked - after setIsRestored(true)')
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
          <Wysiwyg
            context={ WysiwygContext.TRANSLATION }
            height={ 300 }
          />
        </Form.Item>
      )
    }
  ]

  const visibleTabItems = showOnlyHtmlTab ? [tabItems[1]] : tabItems
  const defaultActiveKey = showOnlyHtmlTab ? 'html' : activeTabKey

  return (
    <Modal
      footer={
        <ModalFooter>
          <Flex
            justify="space-between"
            style={ { width: '100%' } }
          >
            <div>
              {showRestoreButton && (
                <Button
                  onClick={ handleRestore }
                  type="default"
                >
                  {t('translations.edit-modal.restore')}
                </Button>
              )}
            </div>
            <Button
              loading={ isLoading }
              onClick={ () => { form.submit() } }
              type="primary"
            >
              {t('translations.edit-modal.save')}
            </Button>
          </Flex>
        </ModalFooter>
      }
      onCancel={ () => {
        props.setOpen(false)
        form.resetFields()
        setIsRestored(false)
      } }
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
        onValuesChange={ (_, allValues) => {
          setCurrentFormValue(allValues.translation ?? '')
        } }
      >
        <Tabs
          activeKey={ defaultActiveKey }
          destroyInactiveTabPane
          items={ visibleTabItems }
          onChange={ (key) => { setActiveTabKey(key) } }
        />
      </Form>
    </Modal>
  )
}
