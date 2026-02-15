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
import { isHtmlContent, stripTags, decodeHtmlEntities } from '@Pimcore/utils/html'

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
  const [activeTabKey, setActiveTabKey] = useState<string>('plain-text')
  const [currentFormValue, setCurrentFormValue] = useState<string>('')
  const [isRestoring, setIsRestoring] = useState<boolean>(false)

  const originalContentIsHtml = useMemo(() => {
    return isHtmlContent(currentValue)
  }, [currentValue])

  const currentFormValueIsHtml = isHtmlContent(currentFormValue)

  const showOnlyHtmlTab = originalContentIsHtml && currentFormValueIsHtml && !isRestoring
  const showRestoreButton = currentFormValueIsHtml

  const handleTabChange = (key: string): void => {
    const currentValues = form.getFieldsValue()
    let processedValue = currentValues.translation ?? ''

    if (key === 'html' && activeTabKey === 'plain-text') {
      // Convert line breaks to HTML when switching to HTML tab
      processedValue = processedValue.replace(/\n/g, '<br>')
    } else if (key === 'plain-text' && activeTabKey === 'html') {
      // Convert HTML line breaks to plain text when switching to plain text tab
      processedValue = processedValue.replace(/<br\s*\/?>/gi, '\n')
    }

    setActiveTabKey(key)
    setCurrentFormValue(processedValue)
    form.setFieldsValue({
      translation: processedValue
    })
  }

  useEffect(() => {
    if (translationRow !== null && props.open) {
      const initialValue = translationRow[`_${locale}`] ?? ''
      const initialIsHtml = isHtmlContent(initialValue)

      form.setFieldsValue({
        translation: initialValue
      })
      setCurrentFormValue(initialValue)
      setActiveTabKey(initialIsHtml ? 'html' : 'plain-text')
      setIsRestoring(false)
    }
  }, [translationRow, locale, props.open])

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
    const withoutTags = stripTags(currentFormValue, [])
    const plainTextValue = decodeHtmlEntities(withoutTags)

    // Set restoring mode first to immediately show both tabs
    setIsRestoring(true)

    form.setFieldsValue({
      translation: plainTextValue.trim()
    })
    setCurrentFormValue(plainTextValue.trim())

    // Defer tab change to next tick to ensure state updates have been processed
    setTimeout(() => {
      setActiveTabKey('plain-text')
    }, 0)
  }

  const tabItems = [
    {
      label: t('translations.edit-modal.tab.plain-text'),
      key: 'plain-text',
      children: (
        <Form.Item name="translation">
          <TextArea
            autoSize={ { minRows: 3, maxRows: 15 } }
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

  return (
    <Modal
      data-testid="translations-edit-modal"
      footer={
        <ModalFooter>
          <Flex
            justify="space-between"
            style={ { width: '100%' } }
          >
            <div>
              {showRestoreButton && (
              <Button
                data-testid="translations-edit-modal-restore-button"
                onClick={ handleRestore }
                type="default"
              >
                {t('translations.edit-modal.restore')}
              </Button>
              )}
            </div>
            <Button
              data-testid="translations-edit-modal-save-button"
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
        data-testid="translations-edit-modal-form"
        form={ form }
        onFinish={ onFinish }
        onValuesChange={ (_, allValues) => {
          setCurrentFormValue(allValues.translation ?? '')
        } }
      >
        <Tabs
          activeKey={ activeTabKey }
          data-testid="translations-edit-modal-tabs"
          destroyInactiveTabPane={ false }
          items={ visibleTabItems }
          onChange={ handleTabChange }
        />
      </Form>
    </Modal>
  )
}
