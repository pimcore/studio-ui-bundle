/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { create } from '@Pimcore/components/modal/factory/modal-factory'
import { useUnsavedChanges } from '@Pimcore/modules/field-definitions/components/editor/custom-layout/unsaved-changes-provider'
import { useSettings } from '@Pimcore/modules/field-definitions/components/editor/settings-provider'
import { type FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { Modal, useFormModal } from '@sdk/components'
import { ApiError, trackError } from '@sdk/modules/app'
import React from 'react'
import { useTranslation } from 'react-i18next'

const {
  Provider: CustomLayoutModalProvider,
  useModal: useCustomLayoutModal
} = create({ defaultProps: { children: <></>, size: 'XXL', footer: null, maskClosable: false } })

export { CustomLayoutModalProvider, useCustomLayoutModal }

export const CustomLayoutModal = (): React.JSX.Element => {
  const { t } = useTranslation()
  const settings = useSettings()
  const { open, closeModal } = useCustomLayoutModal()
  const { isModified, setIsModified, saveFnRef } = useUnsavedChanges()
  const modal = useFormModal()

  const handleClose = (): void => {
    if (isModified) {
      modal.confirm({
        type: 'warning',
        title: t('unsaved-changes.title'),
        content: t('unsaved-changes.message'),
        okText: t('save'),
        cancelText: t('discard-changes'),
        onOk: async () => {
          if (saveFnRef.current !== null) {
            try {
              await saveFnRef.current()
            } catch (e) {
              if ((e as Error).message !== 'Validation failed') {
                trackError(new ApiError(e as FetchBaseQueryError))
              }
              return
            }
          }

          setIsModified(false)
          closeModal()
        },
        onCancel: () => {
          setIsModified(false)
          closeModal()
        }
      })
      return
    }

    closeModal()
  }

  return (
    <>
      { open && (
        <Modal
          footer={ null }
          maskClosable={ false }
          onCancel={ handleClose }
          open={ open }
          size={ 'XXL' }
          title={ t('field-definitions.custom-layouts') }
        >
          {settings.customLayouts?.ModalContent}
        </Modal>
      )}
    </>
  )
}
