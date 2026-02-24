/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Button, Content, ContentLayout, Flex, Title, Toolbar } from '@sdk/components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSystemSettingsContext } from './context/hooks/use-system-settings-context'
import { SystemSettingsForm } from './components/system-settings-form/system-settings-form'

export const SystemSettings = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { form, isLoading } = useSystemSettingsContext()

  return (
    <ContentLayout
      renderToolbar={
        <Toolbar justify="flex-end">
          <Button
            htmlType="submit"
            loading={ isLoading }
            onClick={ () => {
              void form.validateFields()
                .then(() => {
                  // setIsLoading(true)
                  form.submit()
                })
            } }
            type="primary"
          >
            {t('save')}
          </Button>
        </Toolbar>
      }
      renderTopBar={
        <Toolbar
          borderStyle="default"
          theme='secondary'
        >
          <Flex gap={ 'small' }>
            <Title>
              {t('widget.system-settings')}
            </Title>
          </Flex>
        </Toolbar>
      }
    >
      <Content
        padded
        padding={ { x: 'small', y: 'none' } }
      >
        <SystemSettingsForm />
      </Content>
    </ContentLayout>
  )
}
