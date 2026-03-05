/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { ParametersTab } from '@Pimcore/modules/email/log/components/parameters-tab/parameters-tab'
import { IconButton, Modal, ModalTitle } from '@sdk/components'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface EmailParametersButtonProps extends Omit<React.ComponentProps<typeof IconButton>, 'id' | 'icon'> {
  id: number
}

export const EmailParametersButton = ({ id, onClick, ...iconButtonProps }: EmailParametersButtonProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <>
      <IconButton
        { ...iconButtonProps }
        icon={ { value: 'expand-01' } }
        onClick={ (e) => {
          setIsOpen(true)
          onClick?.(e)
        } }
      />

      <Modal
        onCancel={ () => {
          setIsOpen(false)
        } }
        onOk={ () => {
          setIsOpen(false)
        } }
        open={ isOpen }
        size="L"
        title={ (
          <ModalTitle>
            {t('widget.email-log.tab.parameters')}
          </ModalTitle>
        ) }
      >
        <ParametersTab id={ id } />
      </Modal>
    </>
  )
}
