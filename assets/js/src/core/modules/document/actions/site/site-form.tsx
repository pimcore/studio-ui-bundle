/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Form, type formInstanceType } from '@Pimcore/components/form/form'
import { FormKit } from '@Pimcore/components/form/form-kit'
import { Input } from '@Pimcore/components/input/input'
import { TextArea } from '@Pimcore/components/textarea/textarea'
import { Switch } from '@Pimcore/components/switch/switch'
import { ManyToOneRelation, type ManyToOneRelationValueType } from '@Pimcore/components/many-to-one-relation/many-to-one-relation'
import { useSettings } from '@Pimcore/modules/app/settings/hooks/use-settings'
import { useLanguageLookup } from '@Pimcore/modules/translations/hooks/use-language-lookup'

export interface SiteFormValues {
  mainDomain: string
  domains: string
  errorDocument: ManyToOneRelationValueType
  errorDocuments: Record<string, ManyToOneRelationValueType>
  redirectToMainDomain: boolean
}

export interface SiteFormProps {
  form: formInstanceType<any>
  initialValues: SiteFormValues
  onValuesChange?: () => void
}

export const SiteForm = ({ form, initialValues, onValuesChange }: SiteFormProps): React.JSX.Element => {
  const { t } = useTranslation()
  const settings = useSettings()
  const { getDisplayName } = useLanguageLookup()

  const validLanguages = settings?.validLanguages ?? []

  useEffect(() => {
    form.setFieldsValue(initialValues)
  }, [form, initialValues])

  return (
    <FormKit formProps={ { form, layout: 'vertical', onValuesChange } }>
      <Form.Item
        label={ t('document.site.form.main-domain') }
        name="mainDomain"
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={ t('document.site.form.additional-domains') }
        name="domains"
        tooltip={ t('document.site.form.additional-domains-tooltip') }
      >
        <TextArea
          autoSize={ { minRows: 3, maxRows: 8 } }
        />
      </Form.Item>

      <Form.Item
        name="redirectToMainDomain"
        valuePropName="checked"
      >
        <Switch labelRight={ t('document.site.form.redirect-to-main-domain') } />
      </Form.Item>

      <FormKit.Panel title={ t('document.site.form.error-documents') }>
        <Form.Item
          label={ t('document.site.form.default-error-document') }
          name="errorDocument"
        >
          <ManyToOneRelation
            allowToClearRelation
            allowedDocumentTypes={ ['page'] }
            documentsAllowed
          />
        </Form.Item>

        {validLanguages.length > 0 && (
        <>
            {validLanguages.map((language) => (
              <Form.Item
                key={ language }
                label={ t('document.site.form.error-document-language', { language: getDisplayName(String(language)) }) }
                name={ ['errorDocuments', language] }
              >
                <ManyToOneRelation
                  allowToClearRelation
                  allowedDocumentTypes={ ['page'] }
                  documentsAllowed
                />
              </Form.Item>
            ))}
        </>
        )}
      </FormKit.Panel>
    </FormKit>
  )
}
