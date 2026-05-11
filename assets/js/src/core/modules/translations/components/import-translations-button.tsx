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
import { IconTextButton } from '@sdk/components'
import { t } from 'i18next'
import { ImportTranslationsModal } from './import-translations-modal/import-translations-modal'

interface ImportTranslationsButtonProps {
  domain: string
  onSuccess: () => void
}

export const ImportTranslationsButton = ({ domain, onSuccess }: ImportTranslationsButtonProps): React.JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  return (
    <>
      <IconTextButton
        icon={ { value: 'import' } }
        onClick={ () => { setIsModalOpen(true) } }
        type="link"
      >
        {t('translations.toolbar.import-merge')}
      </IconTextButton>

      <ImportTranslationsModal
        domain={ domain }
        onCancel={ () => { setIsModalOpen(false) } }
        onSuccess={ () => {
          setIsModalOpen(false)
          onSuccess()
        } }
        open={ isModalOpen }
      />
    </>
  )
}
