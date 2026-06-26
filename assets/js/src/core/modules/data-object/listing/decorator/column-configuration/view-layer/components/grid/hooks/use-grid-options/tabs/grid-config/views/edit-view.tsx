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
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Content } from '@Pimcore/components/content/content'
import { Header } from '@Pimcore/components/header/header'
import { Space } from '@Pimcore/components/space/space'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { Dropdown, type DropdownMenuProps } from '@Pimcore/components/dropdown/dropdown'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Tooltip } from 'antd'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { GridConfigList } from '../grid-config-list'
import { Compact } from '@Pimcore/components/compact/compact'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Icon } from '@Pimcore/components/icon/icon'
import { type GridConfigData } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/grid-config/grid-config-provider'
import { Flex } from '@Pimcore/components/flex/flex'
import { AddColumnControls } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/view-layer/components/add-column-controls/add-column-controls'
import { type AvailableColumn } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider'
import { type ColumnPickerGroup } from '@Pimcore/components/column-picker/column-picker.types'
import { GridConfigModal } from '../grid-config-modal'
import { useSettings } from '@Pimcore/modules/asset/listing/decorator/column-configuration/view-layer/components/sidebar/tabs/grid-config/povider/settings/use-settings'

export interface EditViewProps {
  onCancelClick: () => void
  onSaveConfigurationClick: () => void
  onUpdateConfigurationClick: () => void
  onEditConfigurationClick: () => void
  onApplyClick: () => void
  onColumnSelect: (column: AvailableColumn) => void
  onAddAdvancedColumn?: () => void
  savedGridConfigurations: DropdownMenuProps['items']
  availableColumnsTree: Array<ColumnPickerGroup<AvailableColumn>>
  isLoading: boolean
  isUpdating: boolean
  columns: any[]
  gridConfig: GridConfigData['gridConfig']
  currentUserId?: number
}

export const EditView = (props: EditViewProps): React.JSX.Element => {
  const [open, setOpen] = useState(false)
  const {
    onApplyClick,
    onEditConfigurationClick,
    onUpdateConfigurationClick,
    onSaveConfigurationClick,
    onColumnSelect,
    onAddAdvancedColumn,
    availableColumnsTree,
    gridConfig,
    savedGridConfigurations,
    isUpdating,
    isLoading,
    currentUserId
  } = props

  const { t } = useTranslation()
  const { saveEnabled } = useSettings()

  const isSavedConfiguration = gridConfig?.name !== 'Predefined' && gridConfig !== undefined
  const isGridTemplateOwner = currentUserId === gridConfig?.ownerId

  return (
    <>
      <GridConfigModal
        { ...props }
        onOpenChange={ setOpen }
        open={ open }
      />

      <ContentLayout
        renderToolbar={
          <Toolbar theme='secondary'>
            <AddColumnControls
              groups={ availableColumnsTree }
              onAddAdvancedColumn={ onAddAdvancedColumn }
              onColumnSelect={ onColumnSelect }
              placement="leftBottom"
            />

            <Space size="extra-small">
              { renderSaveButton() }

              <Button
                data-testid="listing-grid-config-apply-button"
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
          <Header
            fullWidth
            title={ t('listing.grid-config.title') }
          >
            <Flex
              className='w-full'
              justify='space-between'
            >
              {saveEnabled === true && (
                <Dropdown
                  disabled={ savedGridConfigurations?.length === 0 && !isLoading }
                  menu={ { items: savedGridConfigurations } }
                >
                  <Tooltip title={ savedGridConfigurations?.length === 0 && !isLoading ? t('grid.configuration.no-saved-templates') : '' }>
                    <IconTextButton
                      data-testid="listing-grid-config-template-dropdown"
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
              )}

              <Flex gap={ 'mini' }>
                <IconButton
                  icon={ { value: 'show-details' } }
                  onClick={ () => { setOpen(true) } }
                />
              </Flex>
            </Flex>
          </Header>

          <Space
            direction='vertical'
            style={ { width: '100%' } }
          >
            <GridConfigList />
          </Space>
        </Content>
      </ContentLayout>
    </>
  )

  function renderSaveButton (): React.JSX.Element {
    return (
      <>
        {saveEnabled === true && (
          <>
            { !isSavedConfiguration && (
              <Button
                data-testid="listing-grid-config-save-template-button"
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
                        data-testid="listing-grid-config-more-button"
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
        ) }
      </>
    )
  }
}
