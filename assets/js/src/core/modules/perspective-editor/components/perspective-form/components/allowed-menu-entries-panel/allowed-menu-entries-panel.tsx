/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Flex } from '@Pimcore/components/flex/flex'
import { Form } from '@Pimcore/components/form/form'
import { FormKit } from '@Pimcore/components/form/form-kit'
import { Spin } from '@Pimcore/components/spin/spin'
import { Switch } from '@Pimcore/components/switch/switch'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { usePerspectiveForm } from '../../hooks/use-perspective-form'
import { useStyles } from './allowed-menu-entries-panel.styles'

export const AllowedMenuEntriesPanel = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { menuEntries, isLoading } = usePerspectiveForm()
  const { styles } = useStyles()

  if (isLoading) {
    return (
      <FormKit.Panel
        collapsed={false}
        collapsible
        theme='fieldset'
        title={t('perspective-editor.form.allowed-context-menu.title')}
      >
        <Spin />
      </FormKit.Panel>
    )
  }

  return (
    <Flex
      gap={0}
      vertical
      className={styles.panel}
    >
      <p>{t('perspective-editor.form.allowed-context-menu.title')}</p>

      <Flex
        gap={8}
        vertical
      >
        {Object.entries(menuEntries).map(([categoryName, permissions]) => (
          <FormKit.Panel
            collapsed={false}
            collapsible
            key={categoryName}
            theme='fieldset'
            title={t(`perspective-editor.form.allowed-context-menu.category.${categoryName}`)}
          >
            <Flex
              gap={4}
              vertical
            >
              {Object.entries(permissions)
                .sort(([keyA], [keyB]) => {
                  if (keyA === 'hidden') return -1
                  if (keyB === 'hidden') return 1
                  return 0
                })
                .map(([permissionKey, permissionValue]) => (
                  <Form.Item
                    key={`${categoryName}.${permissionKey}`}
                    name={['contextPermissions', categoryName, permissionKey]}
                  >
                    <Switch
                      labelRight={t(`perspective-editor.form.allowed-context-menu.${categoryName}.${permissionKey}`)}
                      size='small'
                    />
                  </Form.Item>
                ))}
            </Flex>
          </FormKit.Panel>
        ))}
      </Flex>
    </Flex>
  )
}
