/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import React from 'react'
import { useTranslation } from 'react-i18next'
import { Modal } from 'antd'
import { ModalTitle } from '@Pimcore/components/modal/modal-title/modal-title'

export interface BatchEditModalProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export const BatchEditModal = (props: BatchEditModalProps): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <Modal
      onCancel={ () => {
        props.setOpen(false)
      } }
      onOk={ () => {
      } }
      open={ props.open }
      title={ (
        <ModalTitle>{t('batch-edit.modal-title')}</ModalTitle>
            ) }
    >

    </Modal>
  )
}
