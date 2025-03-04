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

import React, { createContext, type ReactNode, useEffect, useMemo, useState } from 'react'
import { type UploadFile } from 'antd/es/upload/interface'
import { api as assetApi } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { invalidatingTags } from '@Pimcore/app/api/pimcore/tags'
import { useAppDispatch } from '@Pimcore/app/store'
import { UploadProgress } from '@Pimcore/components/upload/upload-progress/upload-progress'
import { Modal } from '@Pimcore/components/modal/modal'
import { ModalTitle } from '@Pimcore/components/modal/modal-title/modal-title'
import { ModalFooter } from '@Pimcore/components/modal/footer/modal-footer'
import { Button } from '@Pimcore/components/button/button'
import { Box } from '@Pimcore/components/box/box'
import { useTranslation } from 'react-i18next'

export interface UploadContextProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  uploadFileList: UploadFile[]
  setUploadFileList: (uploadFileList: UploadFile[]) => void
  uploadingNode: string | null
  setUploadingNode: (nodeId: string | null) => void
  finishUpload: () => void
  displayComponent: React.FC
}

export const UploadContext = createContext<UploadContextProps | undefined>(undefined)

export const UploadProvider = ({ children }: { children: ReactNode }): React.JSX.Element => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [uploadFileList, setUploadFileList] = useState<UploadFile[]>([])
  const [uploadingNode, setUploadingNode] = useState<string | null>(null)

  const finishUpload = (): void => {
    dispatch(
      assetApi.util.invalidateTags(
        invalidatingTags.ASSET_TREE_ID(parseInt(uploadingNode!))
      )
    )
    setUploadFileList([])
    setUploadingNode(null)
  }

  useEffect(() => {
    if (
      uploadFileList.length > 0 &&
      uploadFileList.length ===
      uploadFileList.filter(file => file.status === 'done').length
    ) {
      finishUpload()
      setIsOpen(false)
    }
  }, [uploadFileList])

  const DisplayComponent = (): React.JSX.Element => {
    return (
      <UploadProgress
        items={ uploadFileList }
        locale={ { uploading: 'uploading' } }
        showRemoveIcon={ false }
      />
    )
  }

  const contextValue = useMemo(() => ({
    isOpen,
    setIsOpen,
    uploadFileList,
    setUploadFileList,
    uploadingNode,
    setUploadingNode,
    finishUpload,
    displayComponent: DisplayComponent
  }), [uploadFileList, uploadingNode])

  return (
    <UploadContext.Provider value={ contextValue }>
      <Modal
        closable={ false }
        footer={
          <ModalFooter justify={ 'end' }>
            <Button
              disabled={
                uploadFileList.length > 0 &&
                uploadFileList.some(file => file.status === 'uploading')
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
            items={ uploadFileList }
            locale={ { uploading: 'uploading' } }
          />
        </Box>
      </Modal>

      {children}
    </UploadContext.Provider>
  )
}
