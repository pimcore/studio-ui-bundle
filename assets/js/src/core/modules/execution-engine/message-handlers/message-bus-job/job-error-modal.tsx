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
import { Modal } from '@Pimcore/components/modal/modal'
import { useTranslation } from 'react-i18next'
import { removePhpStackTrace } from '@Pimcore/utils/stack-trace'
import { useSettings } from '@Pimcore/modules/app/settings/hooks/use-settings'
import { isString } from 'lodash'

export interface JobErrorModalProps {
  open: boolean
  onClose: () => void
  messages: string[]
}

export const JobErrorModal = ({ open, onClose, messages }: JobErrorModalProps): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <Modal
      cancelButtonProps={ { style: { display: 'none' } } }
      onCancel={ onClose }
      onOk={ onClose }
      open={ open }
      size='XL'
      title={ t('jobs.job.error-modal.title') }
    >
      <ul>
        { messages.map((message, index) => {
          const text = isString(message) ? message : JSON.stringify(message) ?? ''
          return <li key={ index }>{ text }</li>
        }) }
      </ul>
    </Modal>
  )
}
