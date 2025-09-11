/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Conditional } from '@Pimcore/components/form/conditional/conditional'
import { useWidgetTypeForm } from '../../hooks/use-widget-type-form'
import { useTranslation } from 'react-i18next'
import React from 'react'
import { FormKit } from '@Pimcore/components/form/form-kit'
import { Form } from '@Pimcore/components/form/form'
import { Switch } from '@Pimcore/components/switch/switch'
import { Spin } from '@Pimcore/components/spin/spin'
import { useStyles } from './allowed-context-menu.styles'
import { elementTypes } from '@Pimcore/types/enums/element/element-type'

export const AssetContextMenuOptionsPanel = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { assetContextMenuItems, isLoading } = useWidgetTypeForm()
  const { styles } = useStyles()

  if (isLoading) {
    return (
      <Conditional condition={ (values) => values.elementType === elementTypes.asset }>
        <FormKit.Panel
          collapsed={ false }
          collapsible
          title={ t('widget-editor.widget-form.allowed-context-menu.title') }
        >
          <Spin />
        </FormKit.Panel>
      </Conditional>
    )
  }

  return (
    <Conditional condition={ (values) => values.elementType === elementTypes.asset }>
      <FormKit.Panel
        collapsed={ false }
        collapsible
        title={ t('widget-editor.widget-form.allowed-context-menu.title') }
      >
        <div className={ styles.allowedContextMenuOptions }>
          <Form.Group
            name={ 'contextPermissions' }
          >
            {assetContextMenuItems.map(permission => (
              <Form.Item
                key={ permission }
                name={ permission }
              >
                <Switch
                  labelRight={ t('widget-editor.widget-form.allowed-context-menu.' + permission) }
                />
              </Form.Item>
            ))}
          </Form.Group>
        </div>
      </FormKit.Panel>
    </Conditional >
  )
}
