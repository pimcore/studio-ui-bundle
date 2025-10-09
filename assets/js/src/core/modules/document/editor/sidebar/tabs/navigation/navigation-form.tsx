/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useCallback, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { FormKit } from '@Pimcore/components/form/form-kit'
import { Form } from '@Pimcore/components/form/form'
import { Input } from '@Pimcore/components/input/input'
import { Select } from '@Pimcore/components/select/select'
import { Switch } from '@Pimcore/components/switch/switch'
import { SidebarHeadline } from '@Pimcore/components/sidebar-headline/sidebar-headline'
import { DocumentContext } from '@Pimcore/modules/document/document-provider'
import { useDocumentDraft } from '@Pimcore/modules/document/hooks/use-document-draft'
import { useSave } from '@Pimcore/modules/document/actions/save/use-save'
import { isNull, isUndefined } from 'lodash'
import { uuid } from '@Pimcore/utils/uuid'
import { type DataProperty } from '@Pimcore/modules/element/draft/hooks/use-properties'
import { checkElementPermission } from '@Pimcore/modules/element/permissions/permission-helper'

interface NavigationFormProps {
  initialValues: NavigationFormValues
}

interface NavigationFormValues {
  navigation_name: string
  navigation_title: string
  navigation_target: string
  navigation_exclude: boolean
  navigation_class: string
  navigation_anchor: string
  navigation_parameters: string
  navigation_relation: string
  navigation_accesskey: string
  navigation_tabindex: string
}

export const NavigationForm = ({
  initialValues
}: NavigationFormProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { id: documentId } = useContext(DocumentContext)
  const { properties, updateProperty, addProperty, document } = useDocumentDraft(documentId)
  const { debouncedAutoSave } = useSave()

  const canEdit = checkElementPermission(document?.permissions, 'save') ||
                  checkElementPermission(document?.permissions, 'publish')

  const getNavigationProperty = (key: string): DataProperty | undefined => {
    return !isNull(properties) && !isUndefined(properties)
      ? properties.find(prop => prop.key === key)
      : undefined
  }

  const updateNavigationProperty = useCallback((key: string, value: any) => {
    const existingProperty = getNavigationProperty(key)

    if (!isUndefined(existingProperty) && !isNull(existingProperty)) {
      updateProperty(key, {
        ...existingProperty,
        data: value,
        inherited: false,
        inheritable: false
      })
    } else {
      const propertyType = key === 'navigation_exclude' ? 'bool' : 'text'
      const newProperty: DataProperty = {
        key,
        type: propertyType,
        data: value,
        inherited: false,
        inheritable: false,
        predefinedName: 'Custom',
        rowId: uuid()
      }
      addProperty(newProperty)
    }

    debouncedAutoSave()
  }, [getNavigationProperty, updateProperty, addProperty, debouncedAutoSave])

  const handleFormChange = useCallback((changedValues: Record<string, any>) => {
    if (!canEdit) return

    Object.entries(changedValues).forEach(([key, value]) => {
      updateNavigationProperty(key, value)
    })
  }, [updateNavigationProperty, canEdit])

  return (
    <FormKit
      formProps={ {
        initialValues,
        onValuesChange: handleFormChange,
        layout: 'vertical'
      } }
    >
      <Form.Item
        label={ t('navigation.name') }
        name="navigation_name"
      >
        <Input disabled={ !canEdit } />
      </Form.Item>

      <Form.Item
        label={ t('link.title') }
        name="navigation_title"
      >
        <Input disabled={ !canEdit } />
      </Form.Item>

      <Form.Item
        label={ t('link.target') }
        name="navigation_target"
      >
        <Select
          disabled={ !canEdit }
          options={ [
            { label: t('link.not-set'), value: '' },
            { label: '_self', value: '_self' },
            { label: '_blank', value: '_blank' },
            { label: '_parent', value: '_parent' },
            { label: '_top', value: '_top' }
          ] }
        />
      </Form.Item>

      <Form.Item
        name="navigation_exclude"
        valuePropName="checked"
      >
        <Switch
          disabled={ !canEdit }
          labelRight={ t('navigation.exclude') }
        />
      </Form.Item>

      <Form.Item
        label={ t('link.rel') }
        name="navigation_relation"
      >
        <Input disabled={ !canEdit } />
      </Form.Item>

      <SidebarHeadline
        marginBottom='none'
        withBorder
      >
        {t('navigation.advanced-settings')}
      </SidebarHeadline>

      <Form.Item
        label={ t('link.class') }
        name="navigation_class"
      >
        <Input disabled={ !canEdit } />
      </Form.Item>

      <Form.Item
        label={ t('link.anchor') }
        name="navigation_anchor"
      >
        <Input disabled={ !canEdit } />
      </Form.Item>

      <Form.Item
        label={ t('link.parameters') }
        name="navigation_parameters"
      >
        <Input disabled={ !canEdit } />
      </Form.Item>

      <Form.Item
        label={ t('link.accesskey') }
        name="navigation_accesskey"
      >
        <Input
          disabled={ !canEdit }
          maxLength={ 1 }
        />
      </Form.Item>

      <Form.Item
        label={ t('link.tabindex') }
        name="navigation_tabindex"
      >
        <Input disabled={ !canEdit } />
      </Form.Item>
    </FormKit>
  )
}
