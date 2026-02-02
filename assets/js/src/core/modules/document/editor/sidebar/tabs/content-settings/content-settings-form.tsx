/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/* eslint-disable max-lines */
import React, { useCallback, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { FormKit } from '@Pimcore/components/form/form-kit'
import { Form } from '@Pimcore/components/form/form'
import { Input } from '@Pimcore/components/input/input'
import { TextArea } from '@Pimcore/components/textarea/textarea'
import { Select } from '@Pimcore/components/select/select'
import { SidebarHeadline } from '@Pimcore/components/sidebar-headline/sidebar-headline'
import { type ManyToOneRelationValueType } from '@Pimcore/components/many-to-one-relation/many-to-one-relation'
import { Flex } from '@Pimcore/components/flex/flex'
import { FlagIcon } from '@Pimcore/components/flag-icon/flag-icon'
import { useSettings } from '@Pimcore/modules/app/settings/hooks/use-settings'
import { useLanguageLookup } from '@Pimcore/modules/translations/hooks/use-language-lookup'
import { useDocumentDraft } from '@Pimcore/modules/document/hooks/use-document-draft'
import { useSave } from '@Pimcore/modules/document/actions/save/use-save'
import { isNil, isNull, isUndefined } from 'lodash'
import { useDebouncedFormChange } from '@Pimcore/components/form/hooks/use-debounced-form-change'
import { uuid } from '@Pimcore/utils/uuid'
import { createDocumentDebounceTag } from '@Pimcore/modules/document/utils/document-debounce-tag'
import { type DataProperty } from '@Pimcore/modules/element/draft/hooks/use-properties'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import { useDocumentPageSnippetChangeMainDocumentMutation } from '@Pimcore/modules/document/document-api-slice-enhanced'
import { useElementRefresh } from '@Pimcore/modules/element/actions/refresh-element/use-element-refresh'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { ManyToOneRelationInput } from '@Pimcore/components/many-to-one-relation'
import { Button } from '@sdk/components'

interface ContentSettingsFormProps {
  documentId: number
  initialValues: {
    title: string
    description: string
    language: string
    prettyUrl: string
    contentMainDocument: ManyToOneRelationValueType | null
  }
  hasPropertiesPermission?: boolean
  hasSavePermission?: boolean
  allowedContentMainDocumentTypes?: string[]
  enableTitleDescription?: boolean
  enablePrettyUrl?: boolean
}

export const ContentSettingsForm = ({
  documentId,
  initialValues,
  hasPropertiesPermission = true,
  hasSavePermission = true,
  allowedContentMainDocumentTypes,
  enableTitleDescription,
  enablePrettyUrl
}: ContentSettingsFormProps): React.JSX.Element => {
  const { t } = useTranslation()
  const settings = useSettings()
  const { getDisplayName } = useLanguageLookup()
  const { document, updateSettingsData, updateProperty, addProperty, properties } = useDocumentDraft(documentId)
  const { debouncedAutoSave } = useSave()
  const modal = useFormModal()
  const [changeMainDocument, { isLoading: isApplyingMainDocument, error: applyingMainDocumentError }] = useDocumentPageSnippetChangeMainDocumentMutation()
  const { refreshElement } = useElementRefresh('document')

  React.useEffect(() => {
    if (!isUndefined(applyingMainDocumentError)) {
      trackError(new ApiError(applyingMainDocumentError))
    }
  }, [applyingMainDocumentError])

  const canEdit = hasSavePermission

  const titleCountRef = useRef<HTMLSpanElement>(null)
  const descriptionCountRef = useRef<HTMLSpanElement>(null)

  const updateCharCount = (countRef: React.RefObject<HTMLSpanElement>, count: number): void => {
    if (!isNull(countRef.current) && !isUndefined(countRef.current)) {
      countRef.current.textContent = `(${count})`
    }
  }

  const languageProperty = !isNull(properties) && !isUndefined(properties) ? properties.find(prop => prop.key === 'language' && !prop.inherited) : undefined

  const handleFormChange = useCallback((changedValues: Record<string, any>, allValues: Record<string, any>) => {
    if (!canEdit) return

    const { language, contentMainDocument, ...settingsDataChanges } = changedValues

    if (!isUndefined(language)) {
      if (!isUndefined(languageProperty) && !isNull(languageProperty)) {
        updateProperty('language', {
          ...languageProperty,
          data: language,
          inherited: false
        })
      } else {
        const newLanguageProperty: DataProperty = {
          key: 'language',
          type: 'text',
          data: language,
          inherited: false,
          inheritable: true,
          predefinedName: 'Custom',
          rowId: uuid()
        }
        addProperty(newLanguageProperty)
      }
    }

    if (!isUndefined(contentMainDocument)) {
      settingsDataChanges.contentMainDocumentId = contentMainDocument?.id ?? null
      settingsDataChanges.contentMainDocumentPath = contentMainDocument?.fullPath ?? null
    }

    if (Object.keys(settingsDataChanges).length > 0) {
      updateSettingsData(settingsDataChanges)
    }

    debouncedAutoSave()
  }, [updateSettingsData, languageProperty, updateProperty, addProperty, debouncedAutoSave, canEdit])

  const { handleFormChange: handleFormChangeDebounced } = useDebouncedFormChange(handleFormChange, {
    delay: 500,
    immediateFields: ['language', 'contentMainDocument'],
    tag: createDocumentDebounceTag(documentId)
  })

  const handleApplyMainDocument = (): void => {
    const contentMainDocumentPath = document?.settingsData?.contentMainDocumentPath

    if (isNull(contentMainDocumentPath) || isUndefined(contentMainDocumentPath)) {
      return
    }

    modal.confirm({
      title: t('content-main-document.apply-warning-title'),
      content: t('content-main-document.apply-warning-message'),
      onOk: async () => {
        const { data } = await changeMainDocument({
          id: documentId,
          changeMainDocument: {
            mainDocumentPath: contentMainDocumentPath
          }
        })

        // Only reload the document if the operation was successful
        if (!isUndefined(data)) {
          refreshElement(documentId)
        }
      }
    })
  }

  const languageOptions = [
    { value: '', label: t('none') },
    ...(settings.validLanguages?.map((locale: string) => ({
      value: locale,
      label: getDisplayName(locale)
    })) ?? [])
  ]

  const renderLanguageOption = (option: { value?: string | number, label?: React.ReactNode }): React.JSX.Element => {
    if (option.value === '' || isUndefined(option.value) || isNull(option.value)) {
      return <span>{option.label}</span>
    }

    return (
      <Flex
        align="center"
        gap="extra-small"
      >
        <FlagIcon value={ !isUndefined(option.value) && !isNull(option.value) ? String(option.value) : '' } />
        <span>{option.label}</span>
      </Flex>
    )
  }

  return (
    <FormKit
      formProps={ {
        initialValues,
        onValuesChange: handleFormChangeDebounced
      } }
    >
      {(document?.type === 'page' || enableTitleDescription === true) && (
        <>
          <Form.Item
            label={ <span>{t('title')} <span ref={ titleCountRef }>({(initialValues.title?.length ?? 0)})</span></span> }
            name="title"
            rules={ [
              { max: 255, message: t('form.validation.max-length', { max: 255 }) }
            ] }
          >
            <Input
              disabled={ !canEdit }
              onChange={ (e) => {
                updateCharCount(titleCountRef, e.target.value.length)
              } }
            />
          </Form.Item>

          <Form.Item
            label={ <span>{t('description')} <span ref={ descriptionCountRef }>({(initialValues.description?.length ?? 0)})</span></span> }
            name="description"
            rules={ [
              { max: 350, message: t('form.validation.max-length', { max: 350 }) }
            ] }
          >
            <TextArea
              autoSize={ { minRows: 3, maxRows: 8 } }
              disabled={ !canEdit }
              onChange={ (e) => { updateCharCount(descriptionCountRef, e.target.value.length) } }
            />
          </Form.Item>
        </>
      )}

      {hasPropertiesPermission && (
        <Form.Item
          label={
            document?.type === 'page' || enableTitleDescription === true
              ? (
                <SidebarHeadline
                  asFormLabel
                  withBorder
                >
                  {t('language')}
                </SidebarHeadline>
                )
              : (
                  t('language')
                )
          }
          name="language"
        >
          <Select
            disabled={ !canEdit }
            labelRender={ (option) => renderLanguageOption(option) }
            optionRender={ (option) => renderLanguageOption(option) }
            options={ languageOptions }
            showSearch
          />
        </Form.Item>
      )}

      {(document?.type === 'page' || enablePrettyUrl === true) && (
        <Form.Item
          extra={ t('pretty-url-override-notice') }
          label={
            <SidebarHeadline
              asFormLabel
              withBorder
            >
              {t('pretty-url')}
            </SidebarHeadline>
            }
          name="prettyUrl"
        >
          <Input disabled={ !canEdit } />
        </Form.Item>
      )}

      {(!isUndefined(allowedContentMainDocumentTypes) || document?.type === 'page' || document?.type === 'snippet') && (
        <>
          <Form.Item
            label={
              <SidebarHeadline
                asFormLabel
                withBorder
              >
                {t('content-main-document')}
              </SidebarHeadline>
              }
            name="contentMainDocument"
          >
            <ManyToOneRelationInput

              allowElementTagClose
              allowedDocumentTypes={ allowedContentMainDocumentTypes ?? ['page', 'snippet'] }
              disabled={ !canEdit }
              documentsAllowed
              enableSearch
            />
          </Form.Item>

          {!isNil(document?.settingsData?.contentMainDocumentPath)
            ? (
              <Button
                loading={ isApplyingMainDocument }
                onClick={ handleApplyMainDocument }
                type="default"
              >
                {t('content-main-document.apply')}
              </Button>
              )
            : null}
        </>
      )}
    </FormKit>
  )
}
