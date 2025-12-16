/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { ButtonGroup } from '@Pimcore/components/button-group/button-group'
import { Button } from '@sdk/components'
import { Dropdown } from '@Pimcore/components/dropdown/dropdown'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Icon } from '@Pimcore/components/icon/icon'
import { useMessage } from '@Pimcore/components/message/useMessage'
import { Spin } from '@Pimcore/components/spin/spin'
import { Tooltip } from '@Pimcore/components/tooltip/tooltip'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { useDeleteDraft } from '@Pimcore/modules/element/actions/delete-draft/use-delete-draft'
import { SaveTaskType, useSave } from '@Pimcore/modules/document/actions/save/use-save'
import {
  useSaveSchedules
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/schedule/hooks/use-save-schedules'
import { checkElementPermission } from '@Pimcore/modules/element/permissions/permission-helper'
import { useRequiredFieldsValidation } from '@Pimcore/modules/document/hooks/use-required-fields-validation'
import { isNil } from 'lodash'
import React, { type ReactElement, useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { DocumentContext } from '@Pimcore/modules/document/document-provider'
import { useDocumentDraft } from '@Pimcore/modules/document/hooks/use-document-draft'
import { useDocumentSaveTask } from '@Pimcore/modules/document/hooks/use-document-save-task'
import { DocumentSaveTaskManager } from '@Pimcore/modules/document/services'
import { useHandleKeyBindings } from '@Pimcore/modules/app/hook/use-handle-keybindings'

export const EditorToolbarSaveButtons = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { id } = useContext(DocumentContext)
  const { document, removeTrackedChanges, publishDraft } = useDocumentDraft(id)
  const { save: saveDocument, isLoading, isSuccess, isError, error } = useSave()

  const { isAutoSaveLoading, runningTask } = useDocumentSaveTask()
  const {
    saveSchedules,
    isLoading: isSchedulesLoading,
    isSuccess: isSchedulesSuccess,
    isError: isSchedulesError,
    error: schedulesError
  } = useSaveSchedules('document', id, false)
  const { deleteDraft, isLoading: isDraftDeleteLoading, buttonText: deleteDraftButtonText } = useDeleteDraft('document')
  const messageApi = useMessage()
  const isAutoSaved = document?.draftData?.isAutoSave === true
  const {
    validateRequiredFields,
    showValidationErrorModal
  } = useRequiredFieldsValidation()

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
    if (isError && !isNil(error)) {
      trackError(new ApiError(error))
    } else if (isSchedulesError && !isNil(schedulesError)) {
      trackError(new ApiError(schedulesError))
    }
  }, [isError, isSchedulesError, error, schedulesError])

  // Handle auto-save errors via direct callback subscription
  useEffect(() => {
    const taskManager = DocumentSaveTaskManager.getInstance(id)

    const unsubscribe = taskManager.onErrorChange((error, task) => {
      if (task === SaveTaskType.AutoSave) {
        void messageApi.error(t('auto-save-failed'))
        console.error('Auto-save failed:', error)
      }
    })

    return unsubscribe
  }, [id, messageApi, t])

  async function handleSaveClick (task: SaveTaskType, onFinish?: () => void): Promise<void> {
    if (document?.changes === undefined) return

    if (task === SaveTaskType.Publish) {
      const validationResult = validateRequiredFields(id)
      if (!validationResult.isValid) {
        showValidationErrorModal(validationResult.requiredFields)
        return
      }
    }

    Promise.all([
      saveDocument(task, () => {
        onFinish?.()
      }),
      saveSchedules()
    ]).catch((error) => {
      console.error(error)
    })
  }

  const getSecondaryButtons = (): ReactElement[] => {
    if (document?.type === 'folder') {
      return []
    }
    const secondaryButtons: ReactElement[] = []
    const isDraftLoading = (runningTask === SaveTaskType.Version && (isLoading || isSchedulesLoading)) || isDraftDeleteLoading

    if (checkElementPermission(document?.permissions, 'save')) {
      if (document?.published === true) {
        secondaryButtons.push(
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
      }

      const saveDisabled = isLoading || isSchedulesLoading || isDraftLoading

      if (document?.published === false && checkElementPermission(document?.permissions, 'save')) {
        secondaryButtons.push(
          <Button
            disabled={ saveDisabled }
            key="save-draft"
            loading={ runningTask === SaveTaskType.Publish && (isLoading || isSchedulesLoading) }
            onClick={ async () => {
              await handleSaveClick(SaveTaskType.Publish, () => {
                publishDraft()
              })
            } }
            type="default"
          >
            {t('toolbar.save-and-publish')}
          </Button>
        )
      }

      if (!isNil(document?.draftData)) {
        secondaryButtons.push(
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
              loading={ isDraftDeleteLoading }
              type="default"
            />
          </Dropdown>
        )
      }
    }

    return secondaryButtons
  }

  const getPrimaryButtons = (): ReactElement[] => {
    const primaryButtons: ReactElement[] = []

    const saveDisabled = isLoading || isSchedulesLoading || isDraftDeleteLoading

    if (document?.type === 'folder') {
      primaryButtons.push(
        <Button
          disabled={ saveDisabled }
          loading={ (runningTask === SaveTaskType.Save) && (isLoading || isSchedulesLoading) }
          onClick={ async () => {
            await handleSaveClick(SaveTaskType.Save)
          } }
          type="primary"
        >
          {t('toolbar.save')}
        </Button>
      )

      return primaryButtons
    }

    if (document?.published === true && checkElementPermission(document?.permissions, 'publish')) {
      primaryButtons.push(
        <Button
          disabled={ saveDisabled }
          loading={ (runningTask === SaveTaskType.Publish) && (isLoading || isSchedulesLoading) }
          onClick={ async () => {
            await handleSaveClick(SaveTaskType.Publish)
          } }
          type="primary"
        >
          {t('toolbar.save-and-publish')}
        </Button>
      )
    }

    if (document?.published === false && checkElementPermission(document?.permissions, 'save')) {
      primaryButtons.push(
        <Button
          disabled={ saveDisabled }
          loading={ (runningTask === SaveTaskType.Save) && (isLoading || isSchedulesLoading) }
          onClick={ async () => {
            await handleSaveClick(SaveTaskType.Save)
          } }
          type="primary"
        >
          {t('toolbar.save-draft')}
        </Button>
      )
    }

    return primaryButtons
  }

  const secondaryButtons = getSecondaryButtons()

  const primaryButtons = getPrimaryButtons()

  useHandleKeyBindings(async () => {
    if (document != null && checkElementPermission(document.permissions, 'publish')) {
      await handleSaveClick(SaveTaskType.Publish, () => {
        if (!document.published) {
          publishDraft()
        }
      })
    }
  }, 'publish')

  useHandleKeyBindings(async () => {
    const saveDisabled = isLoading || isSchedulesLoading || isDraftDeleteLoading
    if (!saveDisabled && document != null && checkElementPermission(document.permissions, 'save')) {
      if (document?.type === 'folder') {
        await handleSaveClick(SaveTaskType.Save)
      } else if (document?.published && checkElementPermission(document?.permissions, 'publish')) {
        await handleSaveClick(SaveTaskType.Publish)
      } else if (!document?.published) {
        await handleSaveClick(SaveTaskType.Save)
      }
    }
  }, 'save')

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
      {secondaryButtons.length > 0 && (
        <ButtonGroup
          items={ secondaryButtons }
          noSpacing
        />
      )}
      {primaryButtons.length > 0 && (
        <ButtonGroup
          items={ primaryButtons }
          noSpacing
        />
      )}
    </>
  )
}
