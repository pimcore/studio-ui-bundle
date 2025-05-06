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
import { Upload, type UploadProps } from '../../upload'

type UploadProviderProps = UploadProps & {
  children: React.ReactNode
}

export interface UploadContextProps {
  triggerUpload: (props: UploadProps) => void
}

export const UploadContext = createContext<UploadContextProps | undefined>(undefined)

export const UploadProvider: React.FC<UploadProviderProps> = ({ children, ...defaultUploadProps }) => {
  const uploadRef = useRef<HTMLDivElement>(null)
  const [uploadState, setUploadState] = useState<UploadProps>({
    ...defaultUploadProps
  })

  const triggerUpload = (props: UploadProps): void => {
    setUploadState({ ...defaultUploadProps, ...props })
    setTimeout(() => uploadRef.current?.click(), 0)
  }

  const contextValue = useMemo(() => ({ triggerUpload }), [defaultUploadProps])

  return (
    <UploadContext.Provider value={ contextValue }>
      <div style={ { display: 'none' } }>
        <Upload
          { ...uploadState }
        >
          <span ref={ uploadRef } />
        </Upload>
      </div>
      {children}
    </UploadContext.Provider>
  )
}
