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
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Content } from '@Pimcore/components/content/content'
import { Header } from '@Pimcore/components/header/header'
import { Space } from '@Pimcore/components/space/space'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { Dropdown, type DropdownMenuProps } from '@Pimcore/components/dropdown/dropdown'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Tooltip } from 'antd'
import { isEmpty } from 'lodash'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { GridConfigList } from '../grid-config-list'
import { Compact } from '@Pimcore/components/compact/compact'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Icon } from '@Pimcore/components/icon/icon'
import { type GridConfigData } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/grid-config/grid-config-provider'

export interface EditViewProps {
  onCancelClick: () => void
  onSaveConfigurationClick: () => void
  onUpdateConfigurationClick: () => void
  onEditConfigurationClick: () => void
  onApplyClick: () => void
  savedGridConfigurations: DropdownMenuProps['items']
  addColumnMenu: DropdownMenuProps['items']
  isLoading: boolean
  isUpdating: boolean
  columns: any[]
  gridConfig: GridConfigData['gridConfig']
  currentUserId?: number
}

export const EditView = (props: EditViewProps): React.JSX.Element => {
  const {
    onCancelClick,
    onApplyClick,
    onEditConfigurationClick,
    onUpdateConfigurationClick,
    onSaveConfigurationClick,
    addColumnMenu,
    gridConfig,
    savedGridConfigurations,
    isUpdating,
    isLoading,
    columns,
    currentUserId
  } = props

  const { t } = useTranslation()

  const isSavedConfiguration = gridConfig?.name !== 'Predefined' && gridConfig !== undefined
  const isGridTemplateOwner = currentUserId === gridConfig?.ownerId

  return (
    <ContentLayout
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
            <Tooltip title={ savedGridConfigurations?.length === 0 && !isLoading ? t('grid.configuration.no-saved-templates') : '' }>
              <IconTextButton
                disabled={ savedGridConfigurations?.length === 0 && !isLoading }
                icon={ { value: 'style' } }
                loading={ isLoading }
                style={ { minHeight: '32px', minWidth: '100px' } }
              >
                { isSavedConfiguration
                  ? (
                    <>
                      { gridConfig.name}
                    </>
                    )
                  : (
                    <>
                      {t('grid.configuration.template')}
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

          {!isEmpty(addColumnMenu) && (
            <Dropdown menu={ { items: addColumnMenu } }>
              <IconTextButton
                icon={ { value: 'new' } }
                type='link'
              >
                { t('listing.add-column') }
              </IconTextButton>
            </Dropdown>
          )}
        </Space>
      </Content>
    </ContentLayout>
  )

  function renderSaveButton (): React.JSX.Element {
    return (
      <>
        { !isSavedConfiguration && (
          <Button
            onClick={ onSaveConfigurationClick }
            type='default'
          >
            {t('grid.configuration.save-template')}
          </Button>
        ) }

        { isSavedConfiguration && (
          <>
            { isGridTemplateOwner && (
              <Compact>
                <Button
                  loading={ isUpdating }
                  onClick={ onUpdateConfigurationClick }
                  type='default'
                >
                  {t('grid.configuration.update-template')}
                </Button>

                <Dropdown menu={
                  {
                    items: [
                      {
                        key: 0,
                        icon: <Icon value='edit' />,
                        label: t('grid.configuration.edit-template-details'),
                        onClick: () => {
                          onEditConfigurationClick()
                        }
                      },

                      {
                        key: 1,
                        icon: <Icon value='save' />,
                        label: t('grid.configuration.save-new-template'),
                        onClick: () => {
                          onSaveConfigurationClick()
                        }
                      }
                    ]
                  }
                }
                >
                  <IconButton
                    icon={ { value: 'more' } }
                    type='default'
                  />
                </Dropdown>
              </Compact>
            )}

            { !isGridTemplateOwner && (
              <Button
                onClick={ onSaveConfigurationClick }
                type='default'
              >
                {t('grid.configuration.save-template')}
              </Button>
            )}
          </>
        )}
      </>
    )
  }
}
