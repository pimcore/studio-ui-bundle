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
import { Modal } from '@Pimcore/components/modal/modal'
import { ModalTitle } from '@Pimcore/components/modal/modal-title/modal-title'

interface LanguageComparisonModalProps {
  open: boolean
  onClose: () => void
}

export const LanguageComparisonModal = ({ open, onClose }: LanguageComparisonModalProps): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <Modal
      footer={ null }
      onCancel={ onClose }
      open={ open }
      size={ 'L' }
      title={ <ModalTitle>{t('language-comparison-modal.title')}</ModalTitle> }
    >
      <div>{/* Content will be implemented in next steps */}</div>
    </Modal>
  )
}
