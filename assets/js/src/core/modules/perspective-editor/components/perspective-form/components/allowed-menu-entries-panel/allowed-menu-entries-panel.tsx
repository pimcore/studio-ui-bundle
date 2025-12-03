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
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { container } from '@Pimcore/app/depency-injection'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { isNil } from 'lodash'
import { usePerspectiveForm } from '../../hooks/use-perspective-form'
import { useStyles } from './allowed-menu-entries-panel.styles'
import { type PerspectivePermissionProviderRegistry } from '../../../../registry/perspective-permission-provider-registry'

export const AllowedMenuEntriesPanel = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { menuEntries, isLoading } = usePerspectiveForm()
  const { styles } = useStyles()

  const sortedMenuEntries = useMemo(() => {
    const registry = container.get<PerspectivePermissionProviderRegistry>(serviceIds.perspectivePermissionProviderRegistry)
    const permissionCategories = registry.getPermissions()

    return permissionCategories
      .map(category => {
        const permissions = category.permissions
          .filter(permission => {
            const categoryEntries = menuEntries[category.key]
            if (isNil(categoryEntries) || !(permission.key in categoryEntries)) {
              console.error(`Permission ${category.key}.${permission.key} is hidden because it is not in the menuEntries list.`)
              return false
            }
            return true
          })
        return { ...category, permissions }
      })
      .filter(category => category.permissions.length > 0)
  }, [menuEntries])

  if (isLoading) {
    return (
      <FormKit.Panel
        collapsed={ false }
        collapsible
        theme='fieldset'
        title={ t('perspective-editor.form.main-nav-permission.title') }
      >
        <Spin />
      </FormKit.Panel>
    )
  }

  return (
    <Flex
      className={ styles.panel }
      gap={ 0 }
      vertical
    >
      <p>{t('perspective-editor.form.main-nav-permission.title')}</p>

      <Flex
        gap={ 8 }
        vertical
      >
        {sortedMenuEntries.map((category) => (
          <FormKit.Panel
            collapsed={ false }
            collapsible
            key={ category.key }
            theme='fieldset'
            title={ t(`perspective-editor.form.main-nav-permission.category.${category.key}`) }
          >
            <Flex
              gap={ 4 }
              vertical
            >
              {category.permissions.map((permission) => (
                <Form.Item
                  key={ `${category.key}.${permission.key}` }
                  name={ ['contextPermissions', category.key, permission.key] }
                >
                  <Switch
                    labelRight={ t(`perspective-editor.form.main-nav-permission.${category.key}.${permission.key}`) }
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
