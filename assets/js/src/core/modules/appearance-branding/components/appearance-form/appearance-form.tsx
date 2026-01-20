/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Button } from '@Pimcore/components/button/button'
import { Content } from '@Pimcore/components/content/content'
import { Flex } from '@Pimcore/components/flex/flex'
import { Form } from '@Pimcore/components/form/form'
import { FormKit } from '@Pimcore/components/form/form-kit'
import { Space } from '@Pimcore/components/space/space'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { Tooltip } from '@Pimcore/components/tooltip/tooltip'
import { Title } from '@Pimcore/components/title/title'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { type UpdateAdminSettings } from '@Pimcore/modules/app/settings/settings-slice.gen'
import { useAppearanceBranding } from '../../hooks/use-appearance-branding'
import { ColorPanel } from './components/color-panel/color-panel'
import { ImagePanel } from './components/image-panel/image-panel'

interface AppearanceFormValues {
  branding: {
    brandColor: string
    backgroundShade: string
    loginScreenCustomBackgroundImage: { id: number, fullPath: string } | null
    loginScreenCustomImage: { id: number, fullPath: string } | null
  }
  assets: {
    hide_edit_image: boolean
    disable_tree_preview: boolean
  }
}

export const AppearanceForm = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { updateSettings, isLoading, adminSettings, isSettingsLoading, isError } = useAppearanceBranding()
  const [form] = Form.useForm<AppearanceFormValues>()
  
  const isWriteable = adminSettings?.writeable ?? false

  const initialValues: AppearanceFormValues = {
    branding: {
      brandColor: adminSettings?.branding?.brandColor ?? '',
      backgroundShade: adminSettings?.branding?.backgroundShade ?? '',
      loginScreenCustomBackgroundImage: adminSettings?.branding?.loginScreenCustomBackgroundImage 
        ? {
            id: 0, 
            fullPath: adminSettings.branding.loginScreenCustomBackgroundImage
          }
        : null,
      loginScreenCustomImage: adminSettings?.branding?.loginScreenCustomImage
        ? {
            id: 0,
            fullPath: adminSettings.branding.loginScreenCustomImage
          }
        : null
    },
    assets: {
      hide_edit_image: adminSettings?.assets?.hide_edit_image ?? false,
      disable_tree_preview: adminSettings?.assets?.disable_tree_preview ?? false
    }
  }

  if (isSettingsLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error loading settings</div>
  }

  return (
    <FormKit
      formProps={{
        form,
        initialValues,
        onFinish: async (values: AppearanceFormValues) => { 
            console.log("values", values);
                       
          const apiValues: UpdateAdminSettings = {
            ...values,
            branding: {
              brandColor: values.branding.brandColor || '',
              backgroundShade: values.branding.backgroundShade || '',
              loginScreenCustomBackgroundImage: values.branding?.loginScreenCustomBackgroundImage?.fullPath || '',
              loginScreenCustomImage: values.branding?.loginScreenCustomImage?.fullPath || ''
            }
          }
          await updateSettings(apiValues)
        }
      }}
    >
      <Flex
        className="appearance-branding-form absolute-stretch"
        justify="space-between"
        vertical
      >
        <Content
          padded
          padding={{
            x: 'small',
            y: 'small'
          }}
        >
          <Title level={2}>
            {t('appearance-branding.title')}
          </Title>

          <Space direction="vertical" size="large">
            <ColorPanel />
            
            <ImagePanel
              titleKey="appearance-branding.custom-logo.title"
              descriptionKey="appearance-branding.custom-logo.description"
              fieldName={['branding', 'loginScreenCustomImage']}
              width={300}
              height={150}
            />
            
            <ImagePanel
              titleKey="appearance-branding.custom-login-background.title"
              descriptionKey="appearance-branding.custom-login-background.description"
              fieldName={['branding', 'loginScreenCustomBackgroundImage']}
              width={300}
              height={150}
            />
          </Space>
        </Content>

        <Toolbar justify="flex-end">
          <Tooltip title={isWriteable ? '' : t('config_not_writeable')}>
            <Button
              disabled={!isWriteable}
              htmlType="submit"
              loading={isLoading}
              type="primary"
            >
              {t('save')}
            </Button>
          </Tooltip>
        </Toolbar>
      </Flex>
    </FormKit>
  )
}
