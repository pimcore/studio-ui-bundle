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
import { ContentToolbarSidebarLayout } from '@Pimcore/components/content-toolbar-sidebar-layout/content-toolbar-sidebar-layout'
import { Content } from '@Pimcore/components/content/content'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { Space } from '@Pimcore/components/space/space'
import { Button } from '@Pimcore/components/button/button'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { Header } from '@Pimcore/components/header/header'
import { Col, Flex, Row } from 'antd'
import { Text } from '@Pimcore/components/text/text'

export interface SaveViewProps {
  formProps: SaveFormProps
  onCancelClick: () => void
  isLoading?: boolean
}

export const SaveView = ({ formProps, onCancelClick, isLoading }: SaveViewProps): React.JSX.Element => {
  const { form } = formProps

  return (
    <ContentToolbarSidebarLayout
      renderToolbar={
        <Toolbar
          justify='flex-end'
          theme='secondary'
        >
          <Space size='mini'>
            <IconTextButton
              icon='close'
              onClick={ onCancelClick }
              type='default'
            >Cancel</IconTextButton>

            <Button
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

          <Row>
            <Col span={ 6 }>
              <Text>Owner:</Text> <Text type='secondary'>Admin</Text>
            </Col>
            <Col span={ 12 }>
              <Text>Modification date:</Text> <Text type='secondary'>22.10.2024 10:11</Text>
            </Col>
          </Row>

          <SaveForm { ...formProps } />
        </Flex>
      </Content>
    </ContentToolbarSidebarLayout>
  )
}
