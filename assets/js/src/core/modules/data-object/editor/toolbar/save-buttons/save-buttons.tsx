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
import { Spin } from '@Pimcore/components/spin/spin'
import { Tooltip } from '@Pimcore/components/tooltip/tooltip'
import { UnpublishedLabel } from '@Pimcore/modules/element/editor/shared-components/unpublished-label/unpublished-label'
import { useDeleteDraft } from '@Pimcore/modules/element/actions/delete-draft/use-delete-draft'
import { SaveTaskType } from '@Pimcore/modules/data-object/actions/save/use-save'
import { DataObjectContext } from '@Pimcore/modules/data-object/data-object-provider'
import { useDataObjectDraft } from '@Pimcore/modules/data-object/hooks/use-data-object-draft'
import { checkElementPermission } from '@Pimcore/modules/element/permissions/permission-helper'
import { isNil } from 'lodash'
import React, { type ReactElement, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { useHandleKeyBindings } from '@Pimcore/modules/app/hook/use-handle-keybindings'

import { useDataObjectEditorSave } from './use-data-object-editor-save'

export const EditorToolbarSaveButtons = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { id } = useContext(DataObjectContext)
  const { dataObject, publishDraft } = useDataObjectDraft(id)
  const { save: handleSaveClick, isLoading, isAutoSaveLoading, runningTask, savedTask } = useDataObjectEditorSave()
  const { deleteDraft, isLoading: isDraftDeleteLoading, buttonText: deleteDraftButtonText } = useDeleteDraft('data-object')
  const isAutoSaved = dataObject?.draftData?.isAutoSave === true

  const getSecondaryButtons = (): ReactElement[] => {
    if (dataObject?.type === 'folder') {
      return []
    }
    const secondaryButtons: ReactElement[] = []
    const isDraftLoading = (runningTask === SaveTaskType.Version && isLoading) || isDraftDeleteLoading

    if (checkElementPermission(dataObject?.permissions, 'save')) {
      if (dataObject?.published === true) {
        secondaryButtons.push(
          <Button
            disabled={ isLoading || isDraftLoading }
            key="save-draft"
            loading={ runningTask === SaveTaskType.Version && isLoading }
            onClick={ async () => {
              await handleSaveClick(SaveTaskType.Version)
            } }
            success={ savedTask === SaveTaskType.Version }
            type="default"
          >
            {t('toolbar.save-draft')}
          </Button>
        )
      }

      if (dataObject?.published === false && checkElementPermission(dataObject?.permissions, 'save')) {
        secondaryButtons.push(
          <Button
            disabled={ isLoading || isDraftLoading }
            key="save-draft"
            loading={ (runningTask === SaveTaskType.Save) && isLoading }
            onClick={ async () => {
              await handleSaveClick(SaveTaskType.Save)
            } }
            success={ savedTask === SaveTaskType.Save }
            type="default"
          >
            {t('toolbar.save-draft')}
          </Button>
        )
      }

      if (!isNil(dataObject?.draftData)) {
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
              aria-label={ t('more-actions') }
              disabled={ isLoading || isDraftLoading }
              icon={ { value: 'chevron-down' } }
              loading={ isDraftDeleteLoading }
              tooltip={ { title: t('more-actions') } }
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

    const saveDisabled = isLoading || isDraftDeleteLoading

    if (dataObject?.type === 'folder') {
      primaryButtons.push(
        <Button
          disabled={ saveDisabled }
          loading={ (runningTask === SaveTaskType.Save) && isLoading }
          onClick={ async () => {
            await handleSaveClick(SaveTaskType.Save)
          } }
          success={ savedTask === SaveTaskType.Save }
          type="primary"
        >
          {t('toolbar.save')}
        </Button>
      )

      return primaryButtons
    }

    // Save & Publish is always on the RIGHT with primary styling
    if (checkElementPermission(dataObject?.permissions, 'publish')) {
      primaryButtons.push(
        <Button
          disabled={ saveDisabled }
          loading={ (runningTask === SaveTaskType.Publish) && isLoading }
          onClick={ async () => {
            await handleSaveClick(SaveTaskType.Publish, () => {
              if (dataObject?.published === false) {
                publishDraft()
              }
            })
          } }
          success={ savedTask === SaveTaskType.Publish }
          type="primary"
        >
          {t('toolbar.save-and-publish')}
        </Button>
      )
    }

    return primaryButtons
  }

  const secondaryButtons = getSecondaryButtons()

  const primaryButtons = getPrimaryButtons()

  useHandleKeyBindings(async () => {
    if (dataObject != null && checkElementPermission(dataObject.permissions, 'publish')) {
      await handleSaveClick(SaveTaskType.Publish, () => {
        if (!dataObject.published) {
          publishDraft()
        }
      })
    }
  }, 'publish')

  useHandleKeyBindings(async () => {
    const saveDisabled = isLoading || isDraftDeleteLoading
    if (!saveDisabled && dataObject != null && checkElementPermission(dataObject.permissions, 'save')) {
      if (dataObject?.type === 'folder') {
        await handleSaveClick(SaveTaskType.Save)
      } else if (dataObject?.published && checkElementPermission(dataObject?.permissions, 'publish')) {
        await handleSaveClick(SaveTaskType.Publish)
      } else if (!dataObject?.published) {
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
      <UnpublishedLabel published={ dataObject?.published } />
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
