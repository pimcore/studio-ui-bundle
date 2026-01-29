/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { FormKit } from '@Pimcore/components/form/form-kit'
import { Form } from '@Pimcore/components/form/form'
import { Select } from '@Pimcore/components/select/select'
import { Switch } from '@Pimcore/components/switch/switch'
import { InputNumber } from '@Pimcore/components/input-number/input-number'
import { SidebarHeadline } from '@Pimcore/components/sidebar-headline/sidebar-headline'
import { useDocumentDraft } from '@Pimcore/modules/document/hooks/use-document-draft'
import { useSave } from '@Pimcore/modules/document/actions/save/use-save'
import { isNil } from 'lodash'
import { FormattedDateTime } from '@Pimcore/components/formatted-date-time/formatted-date-time'
import { useDebouncedFormChange } from '@Pimcore/components/form/hooks/use-debounced-form-change'
import { createDocumentDebounceTag } from '@Pimcore/modules/document/utils/document-debounce-tag'

interface DocumentConfigurationFormValues {
  predefinedDocumentType: string
  controller: string
  template: string
  staticGeneratorEnabled: boolean
  staticGeneratorLifetime: number | null
}

interface DocumentConfigurationFormProps {
  documentId: number
  documentType: string | undefined
  initialValues: DocumentConfigurationFormValues
  apiData: {
    controllers: Array<{ name: string }>
    templates: Array<{ path: string }>
    predefinedDocTypes: Array<{ id: string, name?: string | null, controller?: string | null, template?: string | null }>
  }
  hasSavePermission?: boolean
}

export const DocumentConfigurationForm = ({
  documentId,
  documentType,
  initialValues,
  apiData,
  hasSavePermission = true
}: DocumentConfigurationFormProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { updateSettingsData, document } = useDocumentDraft(documentId)
  const { debouncedAutoSave } = useSave()
  const [form] = Form.useForm<DocumentConfigurationFormValues>()

  const canEdit = hasSavePermission

  const processedInitialValues = {
    ...initialValues,
    staticGeneratorLifetime: initialValues.staticGeneratorLifetime ?? null
  }

  const { controllers, templates, predefinedDocTypes } = apiData

  const controllerOptions = useMemo(() => [
    ...controllers.map(controller => ({
      value: controller.name,
      label: controller.name
    }))
  ], [controllers])

  const templateOptions = useMemo(() => [
    ...templates.map(template => ({
      value: template.path,
      label: template.path
    }))
  ], [templates])

  const predefinedDocTypeOptions = useMemo(() => [
    ...predefinedDocTypes.map(docType => ({
      value: docType.id,
      label: docType.name ?? docType.id
    }))
  ], [predefinedDocTypes])

  const handleFormChange = useCallback((changedValues: Partial<DocumentConfigurationFormValues>, allValues: DocumentConfigurationFormValues) => {
    if (!canEdit) return

    const settingsUpdates: Record<string, any> = {}

    if ('predefinedDocumentType' in changedValues && !isNil(changedValues.predefinedDocumentType)) {
      const selectedDocType = predefinedDocTypes.find(docType => docType.id === changedValues.predefinedDocumentType)
      if (!isNil(selectedDocType)) {
        form.setFieldsValue({
          ...allValues,
          controller: selectedDocType.controller ?? '',
          template: selectedDocType.template ?? ''
        })

        settingsUpdates.controller = selectedDocType.controller ?? ''
        settingsUpdates.template = selectedDocType.template ?? ''
      }
    }

    Object.entries(changedValues).forEach(([key, value]) => {
      if (key !== 'predefinedDocumentType') {
        settingsUpdates[key] = value ?? null
      }
    })

    if (Object.keys(settingsUpdates).length > 0) {
      updateSettingsData(settingsUpdates)
      debouncedAutoSave()
    }
  }, [updateSettingsData, debouncedAutoSave, predefinedDocTypes, form, canEdit])

  const { handleFormChange: handleFormChangeDebounced } = useDebouncedFormChange(handleFormChange, {
    delay: 500,
    immediateFields: ['predefinedDocumentType', 'staticGeneratorEnabled'],
    tag: createDocumentDebounceTag(documentId)
  })

  const lastGeneratedInfo = useMemo(() => {
    const lastGenerated = document?.settingsData?.staticLastGenerated
    return (
      <span>
        {t('document-configuration.last-generated', {
          timestamp: isNil(lastGenerated)
            ? t('never')
            : ''
        })}
        {!isNil(lastGenerated) && <FormattedDateTime timestamp={ lastGenerated } />}
      </span>
    )
  }, [document?.settingsData?.staticLastGenerated])

  const showStaticGenerator = documentType === 'page'

  return (
    <FormKit
      formProps={ {
        form,
        initialValues: processedInitialValues,
        onValuesChange: handleFormChangeDebounced
      } }
    >
      <Form.Item
        label={ t('document-configuration.predefined-document-type') }
        name="predefinedDocumentType"
      >
        <Select
          allowClear
          disabled={ !canEdit }
          options={ predefinedDocTypeOptions }
          popupMatchSelectWidth={ false }
          showSearch
        />
      </Form.Item>

      <Form.Item
        label={ t('document-configuration.controller') }
        name="controller"
      >
        <Select
          allowClear
          disabled={ !canEdit }
          options={ controllerOptions }
          popupMatchSelectWidth={ false }
          showSearch
        />
      </Form.Item>

      <Form.Item
        label={ t('document-configuration.template') }
        name="template"
      >
        <Select
          allowClear
          disabled={ !canEdit }
          options={ templateOptions }
          popupMatchSelectWidth={ false }
          showSearch
        />
      </Form.Item>

      {showStaticGenerator && (
        <>
          <SidebarHeadline
            marginBottom="none"
            withBorder
          >
            {t('document-configuration.static-page-generator')}
          </SidebarHeadline>

          <Form.Item
            name="staticGeneratorEnabled"
            valuePropName="checked"
          >
            <Switch
              disabled={ !canEdit }
              labelRight={ t('document-configuration.enable-server-side-static-rendering') }
            />
          </Form.Item>

          <Form.Item
            extra={ lastGeneratedInfo }
            label={ t('document-configuration.lifetime-for-static-page') }
            name="staticGeneratorLifetime"
          >
            <InputNumber
              disabled={ !canEdit }
              min={ 1 }
              step={ 1 }
            />
          </Form.Item>
        </>
      )}
    </FormKit>
  )
}
