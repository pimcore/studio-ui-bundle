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

import { Modal, Upload } from 'antd'
import React from 'react'
import { ModalTitle } from '@Pimcore/components/modal/modal-title/modal-title'
import { useTranslation } from 'react-i18next'
import { type UploadFile } from 'antd/es/upload/interface'
import UploadList from 'antd/es/upload/UploadList'
import { Alert } from '@Pimcore/components/alert/alert'
import { Button } from '@Pimcore/components/button/button'
import { Box } from '@Pimcore/components/box/box'
import { Spin } from '@Pimcore/components/spin/spin'
import { Flex } from '@Pimcore/components/flex/flex'
import { Text } from '@Pimcore/components/text/text'

export interface UploadModalProps {
  open: boolean
  fileList: UploadFile[]
  closeModal: () => void
  showProcessing: boolean
  showUploadError: boolean
}

export const UploadModal = (props: UploadModalProps): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <Modal
           // onCancel={ () => { props.setOpen(false) } }
           // onOk={ () => { form.submit() } }
      closable={ false }
      footer={ null }
      open={ props.open }
      title={ (
        <ModalTitle iconName='upload-cloud'>{ t('upload') }</ModalTitle>
            ) }
    >
      <Box margin={ { bottom: 'small' } }>
        <Upload
          openFileDialogOnClick={ false }
        >
          <UploadList
            items={ props.fileList }
            listType="text"
            locale={ { uploading: 'Uploading...' } }
            showRemoveIcon={ false }
          />
        </Upload>
      </Box>

      { props.showProcessing && (
        <Box margin={ { top: 'small' } }>
          <Alert
            message={ (
              <Flex gap="small">
                <Spin
                  size="small"
                />
                <Text type="secondary">{ t('processing')}</Text>
              </Flex>
          ) }
            type="info"
          />

        </Box>
      )}

      { props.showUploadError && (
        <Box margin={ { top: 'extra-small' } }>
          <Alert

            action={
              <Button
                onClick={ props.closeModal }
                size="small"
              >
                { t('ok') }
              </Button>
                  }
            message={ t('upload.assets-items-failed-message') }
            type="warning"
          />
        </Box>
      ) }
    </Modal>
  )
}
