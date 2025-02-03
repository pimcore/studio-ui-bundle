/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import React from 'react'
import { useTranslation } from 'react-i18next'
import { Col, Flex, Popconfirm, Row } from 'antd'
import { SaveForm, type SaveFormProps } from '../forms/save-form'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Content } from '@Pimcore/components/content/content'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { Space } from '@Pimcore/components/space/space'
import { Button } from '@Pimcore/components/button/button'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { Header } from '@Pimcore/components/header/header'
import { Text } from '@Pimcore/components/text/text'
import { formatDateTime } from '@Pimcore/utils/date-time'
import { isEmptyValue } from '@Pimcore/utils/type-utils'
import { type RoleGetCollectionApiResponse } from '@Pimcore/modules/user/roles/roles-api-slice.gen'
import { type UserGetCollectionApiResponse } from '@Pimcore/modules/auth/user/user-api-slice.gen'

export interface SaveViewProps {
  formProps: SaveFormProps
  onCancelClick: () => void
  onDeleteClick?: () => void
  isLoading?: boolean
  isDeleting?: boolean
  saveAsNewConfiguration?: boolean
  modificationDate?: number | null
  userName?: string
  roleList?: RoleGetCollectionApiResponse
  userList?: UserGetCollectionApiResponse
}

export const SaveView = ({ formProps, onCancelClick, isLoading, onDeleteClick, isDeleting, saveAsNewConfiguration, modificationDate, userName, ...props }: SaveViewProps): React.JSX.Element => {
  const { form } = formProps

  const { t } = useTranslation()

  return (
    <ContentLayout
      renderToolbar={
        <Toolbar
          theme='secondary'
        >
          { onDeleteClick !== undefined && saveAsNewConfiguration !== true
            ? (
              <Popconfirm
                cancelText={ t('button.cancel') }
                description={ t('grid.configuration.delete-template-confirmation') }
                okText={ t('delete') }
                onConfirm={ onDeleteClick }
                title={ t('grid.configuration.delete-this-template') }
              >
                <IconTextButton
                  disabled={ isLoading }
                  icon={ { value: 'trash' } }
                  loading={ isDeleting }
                >
                  {t('grid.configuration.delete-template')}
                </IconTextButton>
              </Popconfirm>

              )
            : (<div />)}

          <Space size='mini'>
            <IconTextButton
              icon={ { value: 'close' } }
              onClick={ onCancelClick }
              type='default'
            >{ t('button.cancel') }</IconTextButton>

            <Button
              disabled={ isDeleting }
              loading={ isLoading }
              onClick={ () => form?.submit() }
              type='primary'
            >
              { t('button.save-apply') }
            </Button>
          </Space>
        </Toolbar>
      }
    >
      <Content padded>
        <Flex
          gap='small'
          vertical
        >
          <Header title={ t('grid.configuration.save-template-configuration') } />

          { saveAsNewConfiguration !== true && (
            <Row>
              <Col span={ 6 }>
                <Text>{t('common.owner')}:</Text> <Text type='secondary'>{userName}</Text>
              </Col>
              {!isEmptyValue(modificationDate) && (
                <Col span={ 12 }>
                  <Text>{t('common.modification-date')}: </Text>
                  <Text type='secondary'>
                    {formatDateTime({ timestamp: modificationDate!, dateStyle: 'short', timeStyle: 'short' })}
                  </Text>
                </Col>
              )}
            </Row>
          )}

          <SaveForm
            { ...formProps }
            { ...props }
          />
        </Flex>
      </Content>
    </ContentLayout>
  )
}
