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
import { SaveForm, type SaveFormProps } from '../forms/save-form'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Content } from '@Pimcore/components/content/content'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { Space } from '@Pimcore/components/space/space'
import { Button } from '@Pimcore/components/button/button'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { Header } from '@Pimcore/components/header/header'
import { Col, Flex, Popconfirm, Row } from 'antd'
import { Text } from '@Pimcore/components/text/text'
import { formatDateTime } from '@Pimcore/utils/date-time'
import { isEmptyValue } from '@Pimcore/utils/type-utils'

export interface SaveViewProps {
  formProps: SaveFormProps
  onCancelClick: () => void
  onDeleteClick?: () => void
  isLoading?: boolean
  isDeleting?: boolean
  saveAsNewConfiguration?: boolean
  modificationDate?: number | null
  userName?: string
}

export const SaveView = ({ formProps, onCancelClick, isLoading, onDeleteClick, isDeleting, saveAsNewConfiguration, modificationDate, userName }: SaveViewProps): React.JSX.Element => {
  const { form } = formProps

  return (
    <ContentLayout
      renderToolbar={
        <Toolbar
          theme='secondary'
        >
          { onDeleteClick !== undefined && saveAsNewConfiguration !== true
            ? (
              <Popconfirm
                cancelText={ 'cancel' }
                description="Are you sure that you want to delete this template?"
                okText="Delete"
                onConfirm={ onDeleteClick }
                title="Delete this template"
              >
                <IconTextButton
                  disabled={ isLoading }
                  icon={ { value: 'trash' } }
                  loading={ isDeleting }
                >
                  Delete Template
                </IconTextButton>
              </Popconfirm>

              )
            : (<div />)}

          <Space size='mini'>
            <IconTextButton
              icon={ { value: 'close' } }
              onClick={ onCancelClick }
              type='default'
            >Cancel</IconTextButton>

            <Button
              disabled={ isDeleting }
              loading={ isLoading }
              onClick={ () => form?.submit() }
              type='primary'
            >
              Save & Apply
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
          <Header title='Save configuration as template' />

          { saveAsNewConfiguration !== true && (
            <Row>
              <Col span={ 6 }>
                <Text>Owner:</Text> <Text type='secondary'>{userName}</Text>
              </Col>
              {!isEmptyValue(modificationDate) && (
                <Col span={ 12 }>
                  <Text>Modification date: </Text>
                  <Text type='secondary'>
                    {formatDateTime({ timestamp: modificationDate!, dateStyle: 'short', timeStyle: 'short' })}
                  </Text>
                </Col>
              )}
            </Row>
          )}

          <SaveForm { ...formProps } />
        </Flex>
      </Content>
    </ContentLayout>
  )
}
