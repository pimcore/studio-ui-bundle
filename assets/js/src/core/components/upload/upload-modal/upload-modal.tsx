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

import { ModalFooter } from '@Pimcore/components/modal/footer/modal-footer'
import { Button } from '@Pimcore/components/button/button'
import { ModalTitle } from '@Pimcore/components/modal/modal-title/modal-title'
import { Box } from '@Pimcore/components/box/box'
import { UploadProgress } from '@Pimcore/components/upload/upload-progress/upload-progress'
import { Modal } from '@Pimcore/components/modal/modal'
import React from 'react'
import { useUploadContext } from '@Pimcore/modules/element/upload/upload-provider'
import { useTranslation } from 'react-i18next'

export const UploadModal = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { isOpen, fileList, setIsOpen } = useUploadContext()

  return (
    <Modal
      closable={ false }
      footer={
        <ModalFooter justify={ 'end' }>
          <Button
            disabled={
              fileList.length > 0 &&
              fileList.some(file => file.status === 'uploading')
            }
            key='cancel'
            onClick={ () => { setIsOpen(false) } }
            type='primary'
          >
            {t('close')}
          </Button>
        </ModalFooter>
      }
      open={ isOpen }
      size='L'
      title={
        <ModalTitle>
          {t('asset.upload')}
        </ModalTitle>
      }
    >
      <Box margin={ { bottom: 'small' } }>
        <UploadProgress
          locale={ { uploading: 'uploading' } }
        />
      </Box>
    </Modal>
  )
}
