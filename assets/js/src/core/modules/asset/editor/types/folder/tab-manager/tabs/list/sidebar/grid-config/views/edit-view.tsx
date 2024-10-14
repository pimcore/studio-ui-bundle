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

import { Button } from '@Pimcore/components/button/button'
import { ContentToolbarSidebarLayout } from '@Pimcore/components/content-toolbar-sidebar-layout/content-toolbar-sidebar-layout'
import { Content } from '@Pimcore/components/content/content'
import { Header } from '@Pimcore/components/header/header'
import { Space } from '@Pimcore/components/space/space'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { Dropdown, type DropdownMenuProps } from '@Pimcore/components/dropdown/dropdown'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Tooltip } from 'antd'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { GridConfigList } from '../grid-config-list'
import { type IListGridConfigContext } from '../../../list-provider'
import { Compact } from '@Pimcore/components/compact/compact'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'

export interface EditViewProps {
  onCancelClick: () => void
  onSaveConfigurationClick: () => void
  onUpdateConfigurationClick: () => void
  onApplyClick: () => void
  savedGridConfigurations: DropdownMenuProps['items']
  addColumnMenu: DropdownMenuProps['items']
  isLoading: boolean
  isUpdating: boolean
  columns: any[]
  gridConfig: IListGridConfigContext['gridConfig']
}

export const EditView = ({ onCancelClick, gridConfig, onApplyClick, onUpdateConfigurationClick, isUpdating, onSaveConfigurationClick, savedGridConfigurations, addColumnMenu, isLoading, columns }: EditViewProps): React.JSX.Element => {
  const { t } = useTranslation()
  const isSavedConfiguration = gridConfig?.name !== 'Predefined' && gridConfig !== undefined
  // @todo bound it to the grid config id when the ownerId is available via api.
  const isOwner = true

  return (
    <ContentToolbarSidebarLayout
      renderToolbar={
        <Toolbar theme='secondary'>
          <Button
            onClick={ onCancelClick }
            type='default'
          >
            { t('button.cancel') }
          </Button>

          <Space size="extra-small">
            { renderSaveButton() }

            <Button
              onClick={ onApplyClick }
              type='primary'
            >
              { t('button.apply') }
            </Button>
          </Space>
        </Toolbar>
      }
    >
      <Content padded>
        <Header title={ t('listing.grid-config.title') }>
          <Dropdown
            disabled={ savedGridConfigurations?.length === 0 && !isLoading }
            menu={ { items: savedGridConfigurations } }
          >
            <Tooltip title={ savedGridConfigurations?.length === 0 && !isLoading ? 'No saved templates available' : '' }>
              <IconTextButton
                disabled={ savedGridConfigurations?.length === 0 && !isLoading }
                icon='magic-wand-01'
                loading={ isLoading }
              >
                { isSavedConfiguration
                  ? (
                    <>
                      { gridConfig.name}
                    </>
                    )
                  : (
                    <>
                      Template
                    </>
                    ) }
              </IconTextButton>
            </Tooltip>
          </Dropdown>
        </Header>

        <Space
          direction='vertical'
          style={ { width: '100%' } }
        >
          <GridConfigList columns={ columns } />

          <Dropdown menu={ { items: addColumnMenu } }>
            <IconTextButton
              icon='PlusCircleOutlined'
              type='link'
            >
              { t('listing.add-column') }
            </IconTextButton>
          </Dropdown>
        </Space>
      </Content>
    </ContentToolbarSidebarLayout>
  )

  function renderSaveButton (): React.JSX.Element {
    return (
      <>
        { !isSavedConfiguration && (
          <Button
            onClick={ onSaveConfigurationClick }
            type='default'
          >
            Save as template
          </Button>
        ) }

        { isSavedConfiguration && (
          <>
            { isOwner && (
              <Compact>
                <Button
                  loading={ isUpdating }
                  onClick={ onUpdateConfigurationClick }
                  type='default'
                >
                  Update the template
                </Button>

                <Dropdown menu={
                  {
                    items: [
                      {
                        key: 0,
                        label: 'Save as new template',
                        onClick: () => {
                          onSaveConfigurationClick()
                        }
                      }
                    ]
                  }
                }
                >
                  <IconButton
                    icon='dots-horizontal'
                    type='default'
                  />
                </Dropdown>
              </Compact>
            )}

            { !isOwner && (
              <Button
                onClick={ onSaveConfigurationClick }
                type='default'
              >
                Save as template
              </Button>
            )}
          </>
        )}
      </>
    )
  }
}
