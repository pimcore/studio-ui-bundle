/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Modal } from '@Pimcore/components/modal/modal'
import React, { useState } from 'react'
import { type EditViewProps } from './views/edit-view'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { useTranslation } from 'react-i18next'
import { Button } from '@Pimcore/components/button/button'
import { Flex } from '@Pimcore/components/flex/flex'
import { Space } from '@Pimcore/components/space/space'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Content } from '@Pimcore/components/content/content'
import { GridConfigList } from './grid-config-list'
import { AddColumnControls } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/view-layer/components/add-column-controls/add-column-controls'
import { FieldsToAddPanel } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/view-layer/components/fields-to-add-panel/fields-to-add-panel'
import { PipelineLayoutProvider } from './forms/advanced-column-form/pipeline-layout-provider'
import { ModalTitle } from '@Pimcore/components/modal/modal-title/modal-title'
import { PreviewModeProvider, usePreviewModeOptional } from '@Pimcore/components/preview-mode/preview-mode-provider'
import { PreviewModeSwitch } from '@Pimcore/components/preview-mode/preview-mode-switch'
import { PreviewModeBar } from '@Pimcore/components/preview-mode/preview-mode-bar'
import { useData } from '@Pimcore/modules/element/listing/abstract/data-layer/provider/data/use-data'
import { useClassDefinitionSelection } from '@Pimcore/modules/data-object/listing/decorator/class-definition-selection/context-layer/provider/use-class-definition-selection'
import { useStyles } from './grid-config-modal.styles'

export interface GridConfigModalProps extends EditViewProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const PreviewModeToolbarContent = (): React.JSX.Element => {
  const { enabled } = usePreviewModeOptional()
  const { selectedClassDefinition } = useClassDefinitionSelection()

  return (
    <Flex
      align="center"
      gap="small"
    >
      <PreviewModeSwitch />
      {enabled && (
        <PreviewModeBar
          allowedClasses={ selectedClassDefinition?.name !== undefined ? [selectedClassDefinition.name] : undefined }
        />
      )}
    </Flex>
  )
}

export const GridConfigModal = (props: GridConfigModalProps): React.JSX.Element => {
  const {
    onCancelClick,
    onApplyClick: baseOnApplyClick,
    availableColumnsTree,
    onColumnSelect,
    onAddAdvancedColumn,
    open = false,
    onOpenChange
  } = props

  const { t } = useTranslation()
  const { data: gridData } = useData()
  const { selectedClassDefinition } = useClassDefinitionSelection()
  const { styles } = useStyles()
  const [fieldsToAddOpen, setFieldsToAddOpen] = useState<boolean>(true)

  const firstRow = gridData?.items?.[0] as { id?: number, fullpath?: string } | undefined

  const onApplyClick = (): void => {
    baseOnApplyClick()
    onOpenChange?.(false)
  }

  return (
    <>
      {open && (
        <PreviewModeProvider
          fallbackItem={ firstRow?.id !== undefined ? { id: firstRow.id, fullpath: firstRow.fullpath } : null }
          resetKey={ selectedClassDefinition?.id }
        >
          <PipelineLayoutProvider pipelineLayout="verbose">
            <Modal
              closable={ false }
              footer={ null }
              onCancel={ () => onOpenChange?.(false) }
              onClose={ () => onOpenChange?.(false) }
              open={ open }
              size="XL"
              title={ (
                <ModalTitle iconName="settings">
                  { t('listing.grid-config.title') }
                </ModalTitle>
            ) }
            >
              <ContentLayout>
                <Toolbar
                  padding={ { x: 'none' } }
                  position="content"
                  theme="secondary"
                >
                  <PreviewModeToolbarContent />
                </Toolbar>

                <Content style={ { height: 'calc(80vh - 200px)' } }>
                  <div className={ styles.body }>
                    { fieldsToAddOpen && (
                      <FieldsToAddPanel
                        data-testid="listing-grid-config-fields-to-add"
                        fillHeight
                        groups={ availableColumnsTree }
                        onClose={ () => { setFieldsToAddOpen(false) } }
                        onColumnSelect={ onColumnSelect }
                      />
                    ) }

                    <div className={ styles.list }>
                      <GridConfigList />
                    </div>
                  </div>
                </Content>

                <Toolbar
                  padding={ { x: 'none' } }
                  theme="secondary"
                >
                  <AddColumnControls
                    groups={ availableColumnsTree }
                    onAddAdvancedColumn={ onAddAdvancedColumn }
                    onColumnSelect={ onColumnSelect }
                    onToggleSimple={ () => { setFieldsToAddOpen((isOpen) => !isOpen) } }
                  />

                  <Space size="extra-small">
                    <IconButton
                      icon={ { value: 'refresh' } }
                      onClick={ onCancelClick }
                      tooltip={ { title: t('grid-config.reload') } }
                    />

                    <Button
                      onClick={ () => { onCancelClick(); onOpenChange?.(false) } }
                      type='default'
                    >
                      { t('grid-config.discard-all-changes') }
                    </Button>

                    <Button
                      onClick={ onApplyClick }
                      type='primary'
                    >
                      { t('grid-config.apply-changes') }
                    </Button>
                  </Space>
                </Toolbar>
              </ContentLayout>
            </Modal>
          </PipelineLayoutProvider>
        </PreviewModeProvider>
      )}
    </>
  )
}
