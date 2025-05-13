/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext, useRef, useMemo, useState } from 'react'
import { ModalUpload, type ModalUploadProps } from '../../modal-upload'
import { type UploadRef } from 'antd/es/upload/Upload'

type UploadProviderProps = ModalUploadProps & {
  children: React.ReactNode
}

export interface UploadContextProps {
  triggerUpload: (props: ModalUploadProps) => void
}

export const UploadContext = createContext<UploadContextProps | undefined>(undefined)

export const UploadModalProvider: React.FC<UploadProviderProps> = ({ children, ...defaultUploadProps }) => {
  const uploadRef = useRef<HTMLDivElement>(null)
  const uploadRef2 = useRef<UploadRef>(null)
  const [uploadState, setUploadState] = useState<ModalUploadProps>({
    ...defaultUploadProps
  })

  const triggerUpload = (props: ModalUploadProps): void => {
    setUploadState({ ...defaultUploadProps, ...props })
    setTimeout(() => uploadRef.current?.click(), 0)
  }

  const contextValue = useMemo(() => ({ triggerUpload }), [defaultUploadProps])

  return (
    <UploadContext.Provider value={ contextValue }>
      <div style={ { display: 'none' } }>
        <ModalUpload
          uploadRef={ uploadRef2 }
          { ...uploadState }
        >
          <span ref={ uploadRef } />
        </ModalUpload>
      </div>
      {children}
    </UploadContext.Provider>
  )
}
