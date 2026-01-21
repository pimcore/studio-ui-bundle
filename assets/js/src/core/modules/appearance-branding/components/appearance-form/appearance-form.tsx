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
import { useMessage } from '@Pimcore/components/message/useMessage'
import { Space } from '@Pimcore/components/space/space'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { Tooltip } from '@Pimcore/components/tooltip/tooltip'
import { Title } from '@Pimcore/components/title/title'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { type UpdateAdminSettings, type RelatedElementData } from '@Pimcore/modules/app/settings/settings-slice.gen'
import { useAppearanceBranding } from '../../hooks/use-appearance-branding'
import { ColorPanel } from './components/color-panel/color-panel'
import { ImagePanel } from './components/image-panel/image-panel'

interface AppearanceFormValues {
  branding: {
    brandColor: string
    backgroundShade: string
    loginScreenCustomBackgroundImage: RelatedElementData | null
    loginScreenCustomImage: RelatedElementData | null
  }
  assets: {
    hide_edit_image: boolean
    disable_tree_preview: boolean
  }
}

export const AppearanceForm = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { success } = useMessage()
  const { updateSettings, isLoading, adminSettings, isSettingsLoading } = useAppearanceBranding()
  const [form] = Form.useForm<AppearanceFormValues>()

  const isWriteable = adminSettings?.writeable ?? false

  const initialValues: AppearanceFormValues = {
    branding: {
      brandColor: adminSettings?.branding?.brandColor ?? '',
      backgroundShade: adminSettings?.branding?.backgroundShade ?? '',
      loginScreenCustomBackgroundImage: adminSettings?.branding?.loginScreenCustomBackgroundImage ?? null,
      loginScreenCustomImage: adminSettings?.branding?.loginScreenCustomImage ?? null
    },
    assets: {
      hide_edit_image: adminSettings?.assets?.hide_edit_image ?? false,
      disable_tree_preview: adminSettings?.assets?.disable_tree_preview ?? false
    }
  }

  return (
    <FormKit
      formProps={ {
        form,
        initialValues,
        onFinish: async (values: AppearanceFormValues) => {
          const apiValues: UpdateAdminSettings = {
            branding: {
              brandColor: values.branding.brandColor || '',
              backgroundShade: values.branding.backgroundShade || '',
              loginScreenCustomBackgroundImage: values.branding?.loginScreenCustomBackgroundImage || null,
              loginScreenCustomImage: values.branding?.loginScreenCustomImage || null
            },
            assets: {
              hide_edit_image: initialValues.assets.hide_edit_image,
              disable_tree_preview: initialValues.assets.disable_tree_preview
            }
          }

          const result = await updateSettings(apiValues)

          if (result.success) {
            void success(t('appearance-branding.update.success'))
          }
        }
      } }
    >
      <Flex
        className="appearance-branding-form absolute-stretch"
        justify="space-between"
        vertical
      >
        <Content
        loading={isSettingsLoading}
          padded
          padding={ {
            x: 'small',
            y: 'small'
          } }
        >
          <Title level={ 2 }>
            {t('appearance-branding.title')}
          </Title>

          <Space
            direction="vertical"
            size="large"
          >
            <ColorPanel />

            <ImagePanel
              descriptionKey="appearance-branding.custom-logo.description"
              fieldName={ ['branding', 'loginScreenCustomImage'] }
              height={ 150 }
              titleKey="appearance-branding.custom-logo.title"
              width={ 300 }
            />

            <ImagePanel
              descriptionKey="appearance-branding.custom-login-background.description"
              fieldName={ ['branding', 'loginScreenCustomBackgroundImage'] }
              height={ 150 }
              titleKey="appearance-branding.custom-login-background.title"
              width={ 300 }
            />
          </Space>
        </Content>

        <Toolbar justify="flex-end">
          <Tooltip title={ isWriteable ? '' : t('config_not_writeable') }>
            <Button
              disabled={ !isWriteable }
              htmlType="submit"
              loading={ isLoading }
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
