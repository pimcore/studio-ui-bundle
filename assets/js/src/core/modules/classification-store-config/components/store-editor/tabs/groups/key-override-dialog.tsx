/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert } from '@Pimcore/components/alert/alert'
import { Flex } from '@Pimcore/components/flex/flex'
import { Modal } from '@Pimcore/components/modal/modal'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import {
  type ClassificationStoreConfigurationKeyGroupRelationDetail,
  useClassificationStoreConfigurationKeyGroupRelationCreateMutation
} from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice-enhanced'
import { buildOverride, carriesUnits, clearUnreadable, draftOf, storesUnitMember, type IOverrideDraft } from './key-override'
import { offersNothing, OptionsSection, StatedState } from './key-override-sections'
import { UnitsSection } from './key-override-units-section'

interface IKeyOverrideDialogProps {
  /** The assignment being edited, as it was when the dialog was opened; none while closed. */
  relation: ClassificationStoreConfigurationKeyGroupRelationDetail | undefined
  groupName: string
  onClose: () => void
}

export const KeyOverrideDialog = ({ relation, groupName, onClose }: IKeyOverrideDialogProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [createRelation] = useClassificationStoreConfigurationKeyGroupRelationCreateMutation()
  const [edit, setEdit] = useState<{ relation: ClassificationStoreConfigurationKeyGroupRelationDetail, draft: IOverrideDraft }>()
  const [saving, setSaving] = useState(false)

  // The draft belongs to the assignment it was started from, so a dialog opened on another one
  // starts from that one's stored override.
  const draft = relation === undefined ? undefined : edit?.relation === relation ? edit.draft : draftOf(relation)

  const close = (): void => {
    setEdit(undefined)
    onClose()
  }

  const handleSave = async (): Promise<void> => {
    if (relation === undefined || draft === undefined) return

    setSaving(true)

    // Only the pair and the override: an absent sorter, mandatory or sub group keeps its stored value.
    const response = await createRelation({
      classificationStoreConfigurationKeyGroupRelationCreate: {
        keyId: relation.keyId,
        groupId: relation.groupId,
        definitionOverride: buildOverride(draft)
      }
    })

    setSaving(false)

    if ('error' in response) {
      trackError(new ApiError(response.error!))
      return
    }

    close()
  }

  const keyName = relation?.keyName ?? String(relation?.keyId ?? '')

  return (
    <Modal
      cancelButtonProps={ { disabled: saving } }
      closable={ !saving }
      confirmLoading={ saving }
      destroyOnClose
      limitContentHeight
      maskClosable={ !saving }
      okText={ t('save') }
      onCancel={ () => { if (!saving) close() } }
      onOk={ () => { void handleSave() } }
      open={ relation !== undefined }
      size="L"
      title={ t('classification-store.override.title', { keyName, groupName }) }
    >
      { relation !== undefined && draft !== undefined && (
        <Flex
          gap="large"
          vertical
        >
          { draft.unreadable
            ? (
              <StatedState
                actionLabel={ t('classification-store.override.use-all-options') }
                description={ t('classification-store.override.stored-unreadable') }
                onAction={ () => { setEdit({ relation, draft: clearUnreadable(draft) }) } }
              />
              )
            : offersNothing(relation)
              ? (
                <Alert
                  message={ t('classification-store.override.nothing-to-narrow') }
                  showIcon
                  type="info"
                />
                )
              : (
                <>
                  <OptionsSection
                    draft={ draft }
                    onChange={ (next) => { setEdit({ relation, draft: next }) } }
                    relation={ relation }
                  />
                  { (carriesUnits(relation) || storesUnitMember(relation)) && (
                  <UnitsSection
                    draft={ draft }
                    onChange={ (next) => { setEdit({ relation, draft: next }) } }
                    relation={ relation }
                  />
                  ) }
                </>
                ) }
        </Flex>
      ) }
    </Modal>
  )
}
