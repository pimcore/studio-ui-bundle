/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Form } from '@Pimcore/components/form/form'
import { FormKit } from '@Pimcore/components/form/form-kit'
import { IconSelector } from '@Pimcore/components/icon-selector/icon-selector'
import { Input } from '@Pimcore/components/input/input'
import { type ElementIcon } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { Flex, IconTextButton } from '@sdk/components'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IconViewer } from '../../../icon-viewer/icon-viewer'
import { useWidgetFormContext } from '../../context/hooks/use-widget-form-context'

export const GeneralTab = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { form } = useWidgetFormContext()
  const [open, setOpen] = useState<boolean>(false)
  const [selectedIcon, setSelectedIcon] = useState<ElementIcon | undefined>(
    form.getFieldValue('icon') as ElementIcon ?? undefined
  )

  const handleOpen = (): void => {
    setOpen(true)
  }

  const handleClose = (): void => {
    setOpen(false)
  }

  const handleSelect = (icon: ElementIcon): void => {
    setSelectedIcon(icon)
    setOpen(false)
    form.setFieldValue('icon', icon)
  }

  return (
    <FormKit.Panel
      collapsed={ false }
      collapsible
      title={ t('widget-editor.widget-form.general.title') }
    >
      <Form.Item
        label={ t('widget-editor.widget-form.general.name') }
        name="name"
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={ t('widget-editor.widget-form.general.icon') }
        name="icon"
      >
        <Flex gap={ 4 }>
          <IconViewer value={ selectedIcon?.value } />

          <IconTextButton
            icon={ { value: 'edit' } }
            onClick={ handleOpen }
          >
            {t('widget-editor.widget-form.general.icon.select')}
          </IconTextButton>

          <IconSelector
            onCancel={ handleClose }
            onSelect={ handleSelect }
            open={ open }
            selectedIcon={ selectedIcon }
          />
        </Flex>
      </Form.Item>
    </FormKit.Panel>
  )
}
