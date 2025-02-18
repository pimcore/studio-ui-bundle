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

import React, { type ReactElement, useContext, useEffect } from 'react'
import { Button } from '@Pimcore/components/button/button'
import { Dropdown } from '@Pimcore/components/dropdown/dropdown'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { ButtonGroup } from '@Pimcore/components/button-group/button-group'
import { useTranslation } from 'react-i18next'
import { SaveTaskType, useSave } from '@Pimcore/modules/data-object/actions/save/use-save'
import { checkElementPermission } from '@Pimcore/modules/element/permissions/permission-helper'
import { DataObjectContext } from '@Pimcore/modules/data-object/data-object-provider'
import { useDataObjectDraft } from '@Pimcore/modules/data-object/hooks/use-data-object-draft'
import {
  useSaveContext
} from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/save-provider/use-save-context'
import {
  useSaveSchedules
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/schedule/hooks/use-save-schedules'
import {
  useEditFormContext
} from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/edit-form-provider/edit-form-provider'
import { useMessage } from '@Pimcore/components/message/useMessage'
import { Tooltip } from '@Pimcore/components/tooltip/tooltip'
import { Spin } from '@Pimcore/components/spin/spin'
import { Icon } from '@Pimcore/components/icon/icon'
import { useDeleteDraft } from '@Pimcore/modules/data-object/actions/delete-draft/use-delete-draft'
import { isNil } from 'lodash'

export const EditorToolbarSaveButtons = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { id } = useContext(DataObjectContext)
  const { dataObject, removeTrackedChanges, publishDraft } = useDataObjectDraft(id)
  const { save: saveDataObject, isLoading, isSuccess, isError } = useSave()
  const { isAutoSaveLoading, runningTask } = useSaveContext()
  const {
    saveSchedules,
    isLoading: isSchedulesLoading,
    isSuccess: isSchedulesSuccess,
    isError: isSchedulesError
  } = useSaveSchedules('data-object', id, false)
  const { getModifiedDataObjectAttributes, resetModifiedDataObjectAttributes } = useEditFormContext()
  const { deleteDraft, isLoading: isDeleteLoading, buttonText: deleteDraftButtonText } = useDeleteDraft()
  const messageApi = useMessage()

  const isAutoSaved = dataObject?.draftData?.isAutoSave === true

  useEffect(() => {
    const handleSuccessEvent = async (): Promise<void> => {
      if (isSuccess && isSchedulesSuccess) {
        removeTrackedChanges()
        await messageApi.success(t('save-success'))
      }
    }

    handleSuccessEvent().catch((error) => {
      console.error(error)
    })
  }, [isSuccess, isSchedulesSuccess])

  useEffect(() => {
    const handleFailedEvent = async (): Promise<void> => {
      if (isError || isSchedulesError) {
        await messageApi.error(t('save-failed'))
      }
    }

    handleFailedEvent().catch((error) => {
      console.error(error)
    })
  }, [isError, isSchedulesError])

  async function handleSaveClick (task: SaveTaskType, onFinish?: () => void): Promise<void> {
    if (dataObject?.changes === undefined) return
    Promise.all([
      saveDataObject(getModifiedDataObjectAttributes(), task, () => {
        resetModifiedDataObjectAttributes()
        onFinish?.()
      }),
      saveSchedules()
    ]).catch((error) => {
      console.error(error)
    })
  }

  const getDraftButtons = (): ReactElement[] => {
    const draftButtons: ReactElement[] = []

    const isDraftLoading = (runningTask === SaveTaskType.Version && (isLoading || isSchedulesLoading)) || isDeleteLoading

    if (checkElementPermission(dataObject?.permissions, 'save')) {
      if (dataObject?.published === true) {
        draftButtons.push(
          <Button
            disabled={ isLoading || isSchedulesLoading || isDraftLoading }
            key="save-draft"
            loading={ runningTask === SaveTaskType.Version && (isLoading || isSchedulesLoading) }
            onClick={ async () => {
              await handleSaveClick(SaveTaskType.Version)
            } }
            type="default"
          >
            {t('toolbar.save-draft')}
          </Button>
        )

        if (!isNil(dataObject?.draftData)) {
          draftButtons.push(
            <Dropdown
              key="dropdown"
              menu={ {
                items: [
                  {
                    disabled: isLoading,
                    label: deleteDraftButtonText,
                    key: 'delete-draft',
                    onClick: deleteDraft
                  }
                ]
              } }
            >
              <IconButton
                disabled={ isLoading || isSchedulesLoading || isDraftLoading }
                icon={ { value: 'chevron-down' } }
                loading={ isDeleteLoading }
                type="default"
              />
            </Dropdown>
          )
        }
      } else if (!isNil(dataObject?.draftData)) {
        draftButtons.push(
          <Button
            disabled={ isLoading || isSchedulesLoading || isDraftLoading }
            key="save-draft"
            loading={ isDeleteLoading }
            onClick={ deleteDraft }
            type="default"
          >
            {deleteDraftButtonText}
          </Button>
        )
      }
    }

    return draftButtons
  }

  const getSaveButtons = (): ReactElement[] => {
    const saveButtons: ReactElement[] = []

    const saveLoading = (runningTask === SaveTaskType.Publish || runningTask === SaveTaskType.Save) && (isLoading || isSchedulesLoading)
    const saveDisabled = isLoading || isSchedulesLoading

    if (dataObject?.published === true && checkElementPermission(dataObject?.permissions, 'publish')) {
      saveButtons.push(
        <Button
          disabled={ saveDisabled }
          loading={ saveLoading }
          onClick={ async () => {
            await handleSaveClick(SaveTaskType.Publish)
          } }
          type="primary"
        >
          {t('toolbar.save-and-publish')}
        </Button>
      )
    }

    if (dataObject?.published === false && checkElementPermission(dataObject?.permissions, 'save')) {
      saveButtons.push(
        <Button
          disabled={ saveDisabled }
          loading={ saveLoading }
          onClick={ async () => {
            await handleSaveClick(SaveTaskType.Save)
          } }
          type="primary"
        >
          {t('toolbar.save')}
        </Button>
      )
    }

    if (dataObject?.published === false && checkElementPermission(dataObject?.permissions, 'publish')) {
      saveButtons.push(
        <Dropdown
          key="dropdown"
          menu={ {
            items: [
              {
                disabled: saveDisabled,
                label: t('toolbar.save-and-publish'),
                key: 'publish',
                onClick: async () => {
                  await handleSaveClick(SaveTaskType.Publish, () => {
                    publishDraft()
                  })
                }
              }
            ]
          } }
        >
          <IconButton
            disabled={ saveDisabled }
            icon={ { value: 'chevron-down' } }
            type="primary"
          />
        </Dropdown>
      )
    }

    return saveButtons
  }

  const draftButtons = getDraftButtons()

  const saveButtons = getSaveButtons()

  return (
    <>
      {isAutoSaveLoading && (
        <Tooltip title={ t('auto-save.loading-tooltip') }>
          <Spin type='classic' />
        </Tooltip>
      )}
      {!isAutoSaveLoading && isAutoSaved && (
        <Tooltip title={ t('auto-save.tooltip') }>
          <Icon value="auto-save" />
        </Tooltip>
      )}
      {draftButtons.length > 0 && (
        <ButtonGroup
          items={ draftButtons }
          noSpacing
        />
      )}
      {saveButtons.length > 0 && (
      <ButtonGroup
        items={ saveButtons }
        noSpacing
      />
      )}

    </>
  )
}
