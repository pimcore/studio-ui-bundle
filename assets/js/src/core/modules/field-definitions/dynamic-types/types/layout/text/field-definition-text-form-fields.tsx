/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type FieldDefinitionAbstractFormFieldsProps } from '@Pimcore/modules/field-definitions/dynamic-types/dynamic-type-field-definition-abstract'
import { Form, Input, SanitizeHtml, Switch } from '@sdk/components'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { t } from 'i18next'
import Wysiwyg from '@Pimcore/modules/wysiwyg/wysiwyg'
import { Card } from '@Pimcore/components/card/card'
import { WysiwygContext } from '@Pimcore/modules/wysiwyg/interface/wysiwyg'
import { Tabpanel, type TabpanelItem } from '@Pimcore/components/tabpanel/tabpanel'
import { IframeContent } from '@Pimcore/components/iframe-content/iframe-content'
import { getPrefix } from '@Pimcore/app/api/pimcore/route'
import { useGeneralSettings } from '@Pimcore/modules/field-definitions/components/editor/items/detail/general-settings-provider'
import { ManyToOneRelation, type ManyToOneRelationValueType } from '@Pimcore/components/many-to-one-relation/many-to-one-relation'

export const FieldDefinitionTextFormFields = (props: FieldDefinitionAbstractFormFieldsProps): React.JSX.Element => {
  const form = Form.useFormInstance()
  const { generalSettings } = useGeneralSettings()
  const [relationValue, setRelationValue] = useState<ManyToOneRelationValueType>(null)
  const [previewSrc, setPreviewSrc] = useState<string>('')
  const activeTabRef = useRef<string>('0')

  const className = generalSettings?.name ?? ''

  const objectPath = relationValue?.fullPath ?? ''

  const buildPreviewUrl = useCallback((): string => {
    const values = form.getFieldsValue(true) as Record<string, unknown>
    const params = new URLSearchParams()

    params.set('className', className as string)

    if (objectPath !== '') {
      params.set('path', objectPath)
    }

    if (typeof values.renderingData === 'string' && values.renderingData !== '') {
      params.set('renderingData', values.renderingData)
    }

    if (typeof values.renderingClass === 'string' && values.renderingClass !== '') {
      params.set('renderingClass', values.renderingClass)
    }

    if (typeof values.html === 'string' && values.html !== '') {
      params.set('html', values.html)
    }

    return `${getPrefix()}/class/definition/configuration-view/text-layout/preview?${params.toString()}`
  }, [className, objectPath, form])

  const loadPreview = useCallback((): void => {
    if (activeTabRef.current !== '1') {
      return
    }

    setPreviewSrc(buildPreviewUrl())
  }, [buildPreviewUrl])

  useEffect(() => {
    loadPreview()
  }, [objectPath])

  const handleRelationChange = (value: ManyToOneRelationValueType): void => {
    setRelationValue(value)
  }

  const handleTabChange = (key: string): void => {
    activeTabRef.current = key

    if (key === '1') {
      loadPreview()
    }
  }

  const configurationTab: TabpanelItem = {
    key: '0',
    label: t('configuration'),
    children: (
      <>
        <Form.Item
          label={ t('rendering-class') }
          name="renderingClass"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={ t('rendering-data') }
          name="renderingData"
        >
          <Input />
        </Form.Item>

        <Form.Item
          help={ <Card style={ { overflow: 'auto' } }><SanitizeHtml html={ t('layout.text.help') } /></Card> }
          label={ t('text') }
          name="html"
        >
          <Wysiwyg context={ WysiwygContext.CLASS_EDITOR } />
        </Form.Item>
      </>
    )
  }

  const previewTab: TabpanelItem = {
    key: '1',
    label: t('preview'),
    children: (
      <>
        <Form.Item label={ t('drag-object-for-preview') }>
          <ManyToOneRelation
            allowToClearRelation
            allowedDataObjectTypes={ ['object', 'folder'] }
            dataObjectsAllowed
            hideOpenButton
            onChange={ handleRelationChange }
            value={ relationValue }
          />
        </Form.Item>

        {previewSrc !== '' && (
          <IframeContent
            allowOpen={ false }
            iframe={ {
              src: previewSrc,
              title: t('preview')
            } }
          />
        )}
      </>
    )
  }

  return (
    <>
      <Form.Item name="border">
        <Switch labelRight={ t('border') } />
      </Form.Item>

      <Form.Item
        label={ t('css-style') }
        name="bodyStyle"
        tooltip={ t('css-style-tooltip') }
      >
        <Input />
      </Form.Item>

      <Tabpanel
        items={ [configurationTab, previewTab] }
        onChange={ handleTabChange }
      />
    </>
  )
}
