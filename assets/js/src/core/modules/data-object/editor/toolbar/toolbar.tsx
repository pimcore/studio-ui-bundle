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

import React, { useContext, useEffect } from 'react'
import { Toolbar as ToolbarView } from '@Pimcore/components/toolbar/toolbar'
import { useTranslation } from 'react-i18next'
import { Button } from '@Pimcore/components/button/button'
import { useDataObjectDraft } from '../../hooks/use-data-object-draft'
import { DataObjectContext } from '../../data-object-provider'
import { useMessage } from '@Pimcore/components/message/useMessage'
import {
  useSaveSchedules
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/schedule/hooks/use-save-schedules'

import { type ComponentRegistry } from '@Pimcore/modules/app/component-registry/component-registry'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { container } from '@Pimcore/app/depency-injection'
import { Flex } from '@Pimcore/components/flex/flex'
import { TAB_EDIT } from '../types/object/tab-manager/tabs/edit/edit-container'
import { LanguageSelection } from './language-selection/language-selection'
import { WorkflowLogModal } from '@Pimcore/modules/asset/editor/toolbar/workflow-log-modal/workflow-log-modal'
import { EditorToolbarWorkflowMenu } from '@Pimcore/modules/asset/editor/toolbar/workflow-menu/workflow-menu'
import { WorkFlowProvider } from '@Pimcore/modules/asset/editor/toolbar/workflow-log-modal/workflow-provider'
import {
  useEditFormContext
} from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/edit-form-provider/edit-form-provider'
import { SaveTaskType, useSave } from '@Pimcore/modules/data-object/actions/save/use-save'
import { Tooltip } from '@Pimcore/components/tooltip/tooltip'
import { Icon } from '@Pimcore/components/icon/icon'
import {
  useSaveContext
} from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/save-provider/use-save-context'
import { Spin } from '@Pimcore/components/spin/spin'
import { checkElementPermission } from '@Pimcore/modules/element/permissions/permission-helper'

export const Toolbar = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { id } = useContext(DataObjectContext)
  const { dataObject, activeTab, removeTrackedChanges } = useDataObjectDraft(id)
  const { save: saveDataObject, isLoading, isSuccess, isError } = useSave()
  const { isAutoSaveLoading, runningTask } = useSaveContext()
  const { saveSchedules, isLoading: isSchedulesLoading, isSuccess: isSchedulesSuccess, isError: isSchedulesError } = useSaveSchedules('data-object', id, false)
  const { resetModifiedDataObjectAttributes } = useEditFormContext()
  const messageApi = useMessage()
  const componentRegistry = container.get<ComponentRegistry>(serviceIds['App/ComponentRegistry/ComponentRegistry'])
  const ContextMenu = componentRegistry.get('editorToolbarContextMenuDataObject')
  const { getModifiedDataObjectAttributes } = useEditFormContext()

  const isAutoSaved = dataObject?.draftData?.isAutoSave === true

  useEffect(() => {
    const handleSuccessEvent = async (): Promise<void> => {
      if (isSuccess && isSchedulesSuccess) {
        await messageApi.success(t('save-success'))

        removeTrackedChanges()
        resetModifiedDataObjectAttributes()
      }
    }

    handleSuccessEvent().catch((error) => { console.error(error) })
  }, [isSuccess, isSchedulesSuccess])

  useEffect(() => {
    const handleFailedEvent = async (): Promise<void> => {
      if (isError || isSchedulesError) {
        await messageApi.error(t('save-failed'))
      }
    }

    handleFailedEvent().catch((error) => { console.error(error) })
  }, [isError, isSchedulesError])

  async function handleSaveClick (task: SaveTaskType): Promise<void> {
    if (dataObject?.changes === undefined) return
    Promise.all([saveDataObject(getModifiedDataObjectAttributes(), task), saveSchedules()]).catch((error) => {
      console.error(error)
    })
  }

  return (
    <ToolbarView>
      <WorkFlowProvider>
        <Flex>
          <ContextMenu />

          {activeTab === TAB_EDIT.key && (
            <LanguageSelection />
          )}
        </Flex>

        <Flex
          align="center"
          gap={ 'extra-small' }
          style={ { height: '32px' } }
          vertical={ false }
        >
          <EditorToolbarWorkflowMenu />
          { isAutoSaveLoading && (
            <Tooltip title={ t('auto-save.loading-tooltip') }>
              <Spin type='classic' />
            </Tooltip>
          )}
          { !isAutoSaveLoading && isAutoSaved && (
            <Tooltip title={ t('auto-save.tooltip') }>
              <Icon value="auto-save" />
            </Tooltip>
          )}
          { checkElementPermission(dataObject?.permissions, 'save') && (
            <Button
              disabled={ isLoading || isSchedulesLoading }
              loading={ runningTask === SaveTaskType.Version && (isLoading || isSchedulesLoading) }
              onClick={ async () => { await handleSaveClick(SaveTaskType.Version) } }
              type="default"
            >
              {t('toolbar.save-draft')}
            </Button>
          )}
          { checkElementPermission(dataObject?.permissions, 'publish') && (
            <Button
              disabled={ isLoading || isSchedulesLoading }
              loading={ runningTask === SaveTaskType.Publish && (isLoading || isSchedulesLoading) }
              onClick={ async () => { await handleSaveClick(SaveTaskType.Publish) } }
              type="primary"
            >
              {t('toolbar.save-and-publish')}
            </Button>
          )}
        </Flex>
        <WorkflowLogModal />
      </WorkFlowProvider>
    </ToolbarView>
  )
}
