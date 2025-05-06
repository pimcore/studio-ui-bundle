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

import React, { createContext, useRef, useMemo, useState } from 'react'
import { ModalUpload, type ModalUploadProps } from '../../modal-upload'

type UploadProviderProps = ModalUploadProps & {
  children: React.ReactNode
}

export interface UploadContextProps {
  triggerUpload: (props: ModalUploadProps) => void
}

export const UploadContext = createContext<UploadContextProps | undefined>(undefined)

export const UploadModalProvider: React.FC<UploadProviderProps> = ({ children, ...defaultUploadProps }) => {
  const uploadRef = useRef<HTMLDivElement>(null)
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
          { ...uploadState }
        >
          <span ref={ uploadRef } />
        </ModalUpload>
      </div>
      {children}
    </UploadContext.Provider>
  )
}
