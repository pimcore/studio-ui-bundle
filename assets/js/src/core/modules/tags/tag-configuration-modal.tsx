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
import { ModalFooter } from '@Pimcore/components/modal/footer/modal-footer'
import { Button } from '@Pimcore/components/button/button'
import { t } from 'i18next'
import { Modal } from '@Pimcore/components/modal/modal'
import { ModalTitle } from '@Pimcore/components/modal/modal-title/modal-title'
import { TextArea } from '@Pimcore/components/textarea/textarea'
import { Select } from '@Pimcore/components/select/select'
export interface TagConfigurationModalProps {
  tagConfigModalOpen: boolean
  setTagConfigModalOpen: (showBatchEditModal: boolean) => void
}

export const TagConfigurationModal = ({
  tagConfigModalOpen,
  setTagConfigModalOpen
}: TagConfigurationModalProps): React.JSX.Element => {
  return (
    <Modal
      afterClose={ () => {
        setTagConfigModalOpen(false)
      } }
      footer={ <ModalFooter
        divider
        justify={ 'space-between' }
               >
        <Button
          onClick={ () => {
            close()
          } }
          type='primary'
        >close</Button>
      </ModalFooter> }
      onCancel={ () => {
        setTagConfigModalOpen(false)
      } }
      open={ tagConfigModalOpen }
      size={ 'M' }
      title={ <ModalTitle>{t('tag-configuration.rename&move')}</ModalTitle> }
    >
      <TextArea />
      <Select />
    </Modal>
  )
}
