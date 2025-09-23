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

export const AllowedMenuEntriesPanel = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { menuEntries, isLoading } = usePerspectiveForm()

  if (isLoading) {
    return (
      <FormKit.Panel
        theme='fieldset'
        collapsed={false}
        collapsible
        title={t('perspective-editor.form.allowed-context-menu.title')}
      >
        <Spin />
      </FormKit.Panel>
    )
  }

  return (
    <Flex
      gap={4}
      vertical
    >
      <p>{t('perspective-editor.form.allowed-context-menu.title')}</p>

      <Flex
        vertical
        gap={8}
      >
        {Object.entries(menuEntries).map(([categoryName, permissions], index) => (
          <FormKit.Panel
            theme='fieldset'
            collapsed={false}
            collapsible
            title={t(`perspective-editor.form.allowed-context-menu.category.${categoryName}`)}
          >
            <Flex vertical gap={4}>
              {Object.entries(permissions).map(([permissionKey, permissionValue]) => (
                <Form.Item
                  key={`${categoryName}.${permissionKey}`}
                  name={['contextPermissions', categoryName, permissionKey]}
                >
                  <Switch
                    size='small'
                    labelRight={t(`perspective-editor.form.allowed-context-menu.${categoryName}.${permissionKey}`)}
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
