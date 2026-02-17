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
import { ManyToOneRelation } from '@Pimcore/components/many-to-one-relation/many-to-one-relation'
import { useSystemSettingsContext } from '@Pimcore/modules/system-settings/context/hooks/use-system-settings-context'
import { CollapseItem, Form, Input, Switch } from '@sdk/components'
import { isNil } from 'lodash'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ErrorPageCard } from './components/error-page-card/error-page-card'

export const WebsiteCollapse = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { form } = useSystemSettingsContext()
  const validLanguages = Form.useWatch(['general', 'valid_languages'], { form, preserve: true })

  const languageErrorPageCards = useMemo(() => {
    if (isNil(validLanguages)) {
      return []
    }

    return validLanguages.map((locale: string) => (
      <ErrorPageCard
        key={ locale }
        locale={ locale }
      />
    ))
  }, [validLanguages])

  return (
    <CollapseItem
      forceRender
      label={ t('system-settings.collapse.website') }
    >
      <Flex
        gap="small"
        vertical
      >
        <Flex
          gap="extra-small"
          vertical
        >
          <Form.Item
            label={ t('system-settings.form.field.main-domain') }
            name={ ['general', 'domain'] }
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={ t('system-settings.form.field.redirect-to-maindomain') }
            name={ ['general', 'redirect_to_maindomain'] }
          >
            <Switch />
          </Form.Item>

          <Form.Item
            label={ t('system-settings.form.field.default-error-page') }
            name={ ['documents', 'error_pages', 'default'] }
          >
            <ManyToOneRelation
              allowToClearRelation
              documentsAllowed
            />
          </Form.Item>
        </Flex>

        <Flex
          gap="extra-small"
          vertical
        >
          {languageErrorPageCards}
        </Flex>
      </Flex>
    </CollapseItem>
  )
}
