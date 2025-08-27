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
import { Button, ModalFooter } from '@sdk/components'
import { t } from 'i18next'

interface TranslationErrorModalsProps {
  MandatoryModal: React.ComponentType<{
    footer: React.ReactNode
    title: string
    children: React.ReactNode
  }>
  closeMandatoryModal: () => void
}

export const TranslationErrorModals = ({
  MandatoryModal,
  closeMandatoryModal
}: TranslationErrorModalsProps): React.JSX.Element => {
  return (
    <MandatoryModal
      footer={
        <ModalFooter>
          <Button
            onClick={ closeMandatoryModal }
            type='primary'
          >
            {t('button.ok')}
          </Button>
        </ModalFooter>
      }
      title={ t('translations.add-translation-mandatory-field-missing.title') }
    >
      {t('translations.add-translation-mandatory-field-missing.error')}
    </MandatoryModal>
  )
}
