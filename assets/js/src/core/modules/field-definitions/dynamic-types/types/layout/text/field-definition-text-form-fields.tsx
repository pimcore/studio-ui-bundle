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
import React from 'react'
import { t } from 'i18next'
import Wysiwyg from '@Pimcore/modules/wysiwyg/wysiwyg'
import { Card } from '@Pimcore/components/card/card'
import {WysiwygContext} from "@Pimcore/modules/wysiwyg/interface/wysiwyg";

// @todo - tabs, iframe, iframeContent (mit Reload)
// @todo - url hardcoded https://studionightly.pimcore.app/storybook/?path=/docs/components-layout-tabs--docs

export const FieldDefinitionTextFormFields = (props: FieldDefinitionAbstractFormFieldsProps): React.JSX.Element => {
  return (

    <><Form.Item name="border">
      <Switch labelRight={ t('border') } />
    </Form.Item><Form.Item
      label={ t('rendering-class') }
      name="renderingClass"
                >
      <Input />
    </Form.Item><Form.Item
      label={ t('rendering-data') }
      name="renderingData"
                >
      <Input />
    </Form.Item>
      <Form.Item
        help={ <Card style={{overflow: 'auto'}}><SanitizeHtml html={ t('layout.text.help') } /></Card> }
        label={ t('text') }
        name="html"
      >
        <Wysiwyg context={WysiwygContext.CLASS_EDITOR} /> /* @todo - name, Wysiwyg context for class editor */
      </Form.Item></>
  )
}
