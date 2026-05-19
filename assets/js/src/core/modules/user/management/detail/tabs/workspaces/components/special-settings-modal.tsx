/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Modal } from '@Pimcore/components/modal/modal'
import { ModalFooter } from '@Pimcore/components/modal/footer/modal-footer'
import { Button } from '@Pimcore/components/button/button'
import { SpecialSettings } from '@Pimcore/modules/user/management/detail/tabs/workspaces/components/special-settings'

export interface SpecialSettingsValues {
  layouts: string[]
  localizedEdit: string[]
  localizedView: string[]
}

interface ISpecialSettingsModalProps {
  open: boolean
  cpath: string
  initialValues: SpecialSettingsValues
  onCancel: () => void
  onApply: (values: SpecialSettingsValues) => void
}

const SpecialSettingsModal = ({ open, cpath, initialValues, onCancel, onApply }: ISpecialSettingsModalProps): React.JSX.Element => {
  const { t } = useTranslation()
  const pendingChangesRef = useRef<SpecialSettingsValues>({ ...initialValues })

  useEffect(() => {
    if (open) {
      pendingChangesRef.current = { ...initialValues }
    }
  }, [open])

  return (
    <Modal
      footer={
        <ModalFooter>
          <Button
            onClick={ onCancel }
            type={ 'default' }
          >
            {t('button.cancel')}
          </Button>
          <Button
            onClick={ () => {
              onApply(pendingChangesRef.current)
            } }
            type={ 'primary' }
          >
            {t('button.apply')}
          </Button>
        </ModalFooter>
      }
      onCancel={ onCancel }
      open={ open }
      size={ 'L' }
      title={ `${t('user-management.workspaces.additional-settings')} — ${cpath}` }
    >
      <SpecialSettings
        layouts={ initialValues.layouts }
        localizedEdit={ initialValues.localizedEdit }
        localizedView={ initialValues.localizedView }
        onValuesChange={ (changedValues) => {
          pendingChangesRef.current = { ...pendingChangesRef.current, ...changedValues }
        } }
      />
    </Modal>
  )
}

export { SpecialSettingsModal }
