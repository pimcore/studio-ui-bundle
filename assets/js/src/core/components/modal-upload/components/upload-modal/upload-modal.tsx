/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Modal, Upload } from 'antd'
import type { UploadFile } from 'antd/es/upload/interface'
import React from 'react'
import { ModalTitle } from '@Pimcore/components/modal/modal-title/modal-title'
import { useTranslation } from 'react-i18next'
import UploadList from 'antd/es/upload/UploadList'
import { Alert } from '@Pimcore/components/alert/alert'
import { Button } from '@Pimcore/components/button/button'
import { Box } from '@Pimcore/components/box/box'
import { Spin } from '@Pimcore/components/spin/spin'
import { Flex } from '@Pimcore/components/flex/flex'
import { Text } from '@Pimcore/components/text/text'
import { Progress } from '@Pimcore/components/progress/progress'
import { Tooltip } from '@Pimcore/components/tooltip/tooltip'
import { isNil } from 'lodash'

export interface UploadModalProps {
  open: boolean
  fileList: UploadFile[]
  closeModal: () => void
  showProcessing: boolean
  showUploadError: boolean
}

export const UploadModal = (props: UploadModalProps): React.JSX.Element => {
  const { t } = useTranslation()

  const totalProgress = React.useMemo(() => {
    if (isNil(props.fileList) || props.fileList.length === 0) {
      return 0
    }
    const totalPercent = props.fileList.reduce((sum, file) => {
      const fileProgress = file.status === 'error' ? 100 : (file.percent ?? 0)
      return sum + fileProgress
    }, 0)
    return Math.round(totalPercent / props.fileList.length) // Average progress
  }, [props.fileList])

  return (
    <Modal
      closable={ false }
      footer={ null }
      open={ props.open }
      title={ (
        <ModalTitle iconName='upload-cloud'>{ t('upload') }</ModalTitle>
            ) }
    >

      {/* Total Progress */}
      {props.fileList.length > 1 && !props.showProcessing && (
        <Box margin={ { top: 'small' } }>
          <Progress
            percent={ totalProgress }
            status="active"
          />
        </Box>
      )}

      { props.showProcessing && (
        <Box margin={ { top: 'normal' } }>
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

      <Box margin={ { bottom: 'small' } }>
        <Upload openFileDialogOnClick={ false }>
          <UploadList
            itemRender={ (originNode, file) => {
              const errorMessage =
              file.error?.status === 413
                ? t('upload.error.file-too-large') // Custom translation key for HTTP 413
                : !isNil(file.error)
                    ? t('upload.error.generic') // Custom translation key for other errors
                    : undefined

              const clonedNode = React.cloneElement(originNode, {
                title: !isNil(errorMessage) ? null : originNode.props.title // Disable the default tooltip
              })

              return (
                <Tooltip title={ !isNil(file.error) ? errorMessage : undefined }>
                  {clonedNode}
                </Tooltip>
              )
            } }
            items={ props.fileList }
            listType="text"
            locale={ { uploading: 'Uploading...' } }
            showRemoveIcon={ false }
          />
        </Upload>
      </Box>

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
