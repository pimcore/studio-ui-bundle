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
import { Tooltip } from 'antd'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { useTranslation } from 'react-i18next'
import { useAlertModal } from '@Pimcore/components/modal/alert-modal/hooks/use-alert-modal'
import { ModalUpload, type ModalUploadProps } from './modal-upload'

export type UploadModalButtonProps = ModalUploadProps & {
  showMaxItemsError?: boolean
}

export const UploadModalButton = (props: UploadModalButtonProps): React.JSX.Element => {
  const { t } = useTranslation()
  const alertModal = useAlertModal()

  if (props.showMaxItemsError === true) {
    return (
      <Tooltip title={ t('upload') }>
        <IconButton
          icon={ { value: 'upload-cloud' } }
          onClick={ () => alertModal.warn({
            content: t('items-limit-reached', { maxItems: props.maxItems ?? 0 })
          }) }
          type="default"
        />
      </Tooltip>
    )
  }

  return (
    <ModalUpload
      { ...props }
      onChange={ (info) => {
        props.onChange?.(info)
      } }
    >
      <Tooltip title={ t('upload') }>
        <IconButton
          icon={ { value: 'upload-cloud' } }
          type="default"
        />
      </Tooltip>
    </ModalUpload>
  )
}
