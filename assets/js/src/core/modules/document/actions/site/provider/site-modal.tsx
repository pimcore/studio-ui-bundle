/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { useTranslation } from 'react-i18next'
import { Flex } from 'antd'
import { WindowModal } from '@Pimcore/components/modal/window-modal/window-modal'
import { ElementTag } from '@Pimcore/components/element-tag/element-tag'
import { elementTypes } from '@Pimcore/types/enums/element/element-type'
import { SiteForm, type SiteFormValues } from '../site-form'
import { type SiteModalConfig } from './site-modal-provider'
import { isNonEmptyString } from '@Pimcore/utils/type-utils'
import { type formInstanceType } from '@sdk/components'

interface CurrentModal {
  config: SiteModalConfig
  form: formInstanceType<SiteFormValues>
  isLoading: boolean
  hasUnsavedChanges: boolean
}

interface SiteModalProps {
  modal: CurrentModal
  onClose: () => void
  onSubmit: (values: SiteFormValues) => Promise<void>
  onFormChange: () => void
}

export const SiteModal = ({ modal, onClose, onSubmit, onFormChange }: SiteModalProps): React.JSX.Element => {
  const { t } = useTranslation()

  const handleSubmit = async (): Promise<void> => {
    const values = modal.form.getFieldsValue()
    await onSubmit(values)
  }

  const modalTitle = (
    <Flex
      align="center"
      gap="small"
    >
      <span>{modal.config.title}</span>
      {isNonEmptyString(modal.config.documentPath) && (
        <ElementTag
          elementType={ elementTypes.document }
          id={ modal.config.documentId }
          inline
          path={ modal.config.documentPath }
        />
      )}
    </Flex>
  )

  return (
    <WindowModal
      okButtonProps={ {
        loading: modal.isLoading
      } }
      okText={ t('save') }
      onCancel={ onClose }
      onClose={ onClose }
      onOk={ handleSubmit }
      open
      size="L"
      title={ modalTitle }
    >
      <SiteForm
        form={ modal.form }
        initialValues={ modal.config.initialValues }
        onValuesChange={ onFormChange }
      />
    </WindowModal>
  )
}
