/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { Form } from '@Pimcore/components/form/form'
import { FormKit } from '@Pimcore/components/form/form-kit'
import { useTranslation } from 'react-i18next'
import { Switch } from '@Pimcore/components/switch/switch'
import { usePerspectiveForm } from '../../hooks/use-perspective-form'
import { useStyles } from './allowed-menu-entries-panel.styles'
import { Spin } from '@Pimcore/components/spin/spin'

export const AllowedMenuEntriesPanel = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { menuEntries, isLoading } = usePerspectiveForm()
  const { styles } = useStyles()

  console.log('menuEntries', menuEntries)

  if (isLoading) {
    return (
      <FormKit.Panel
        collapsed={ false }
        collapsible
        title={ t('widget-editor.widget-form.allowed-context-menu.title') }
      >
        <Spin />
      </FormKit.Panel>
    )
  }

  return (
    <FormKit.Panel
      collapsed={ false }
      collapsible
      title={ t('perspective-editor.form.allowed-context-menu.title') }
    >
      {Object.entries(menuEntries).map(([categoryName, permissions]) => (
        <>
          <h4>{t(`perspective-editor.form.allowed-context-menu.category.${categoryName}`)}</h4>

          <div className={ styles.allowedMenuEntriesPanel }>
            {Object.entries(permissions).map(([permissionKey, permissionValue]) => (
              <Form.Item
                key={ `${categoryName}.${permissionKey}` }
                name={ ['contextPermissions', categoryName, permissionKey] }
              >
                <Switch
                  labelRight={ t(`perspective-editor.form.allowed-context-menu.${categoryName}.${permissionKey}`) }
                />
              </Form.Item>
            ))}
          </div>
        </>
      ))}
    </FormKit.Panel>
  )
}
