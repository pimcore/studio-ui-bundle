/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext, useMemo, useState } from 'react'
import { isNull } from 'lodash'
import { VideoModal } from '@Pimcore/modules/element/components/video-modal/video-modal'
import { type VideoValue, type VideoType } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/video/video'

export interface VideoModalContextProps {
  openModal: (value?: VideoValue | null, options?: VideoModalOptions) => void
  closeModal: () => void
  isOpen: boolean
}

export interface VideoModalOptions {
  disabled?: boolean
  allowedVideoTypes?: VideoType[]
  onChange?: (value: VideoValue | null) => void
}

export interface VideoModalProviderProps {
  children: React.ReactNode
}

export const VideoModalContext = createContext<VideoModalContextProps | undefined>(undefined)

export const VideoModalProvider: React.FC<VideoModalProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentValue, setCurrentValue] = useState<VideoValue | null>(null)
  const [modalOptions, setModalOptions] = useState<VideoModalOptions>({})

  const openModal = (value?: VideoValue | null, options?: VideoModalOptions): void => {
    setCurrentValue(value ?? null)
    setModalOptions(options ?? {})
    setIsOpen(true)
  }

  const closeModal = (): void => {
    setIsOpen(false)
    setCurrentValue(null)
    setModalOptions({})
  }

  const handleChange = (value: VideoValue | null): void => {
    modalOptions.onChange?.(value)
    closeModal()
  }

  const contextValue = useMemo(() => ({
    openModal,
    closeModal,
    isOpen
  }), [isOpen])

  return (
    <VideoModalContext.Provider value={ contextValue }>
      {children}
      {isOpen && !isNull(currentValue !== undefined) && (
        <VideoModal
          allowedVideoTypes={ modalOptions.allowedVideoTypes }
          disabled={ modalOptions.disabled }
          onCancel={ closeModal }
          onOk={ handleChange }
          open={ isOpen }
          value={ currentValue }
        />
      )}
    </VideoModalContext.Provider>
  )
}
