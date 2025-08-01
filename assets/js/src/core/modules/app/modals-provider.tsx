/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { UploadModalProvider } from '@Pimcore/components/modal-upload/provider/upload-modal-provider/upload-modal-provider'
import { LinkModalProvider } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/link/provider/link-modal-provider'
import { CropModalProvider } from '../element/components/crop-modal/provider/crop-modal-provider'
import { HotspotMarkersModalProvider } from '../element/components/hotspot-markers-modal/provider/hotspot-markers-modal-provider'
import { VideoModalProvider } from '../element/components/video-modal/provider/video-modal-provider'

export interface ModalsProviderProps {
  children: React.ReactNode
}

/**
 * Centralized provider for all modal-related functionality.
 * Groups together all modal providers to keep the global provider clean.
 */
export const ModalsProvider = ({ children }: ModalsProviderProps): React.JSX.Element => {
  return (
    <UploadModalProvider>
      <LinkModalProvider>
        <CropModalProvider>
          <HotspotMarkersModalProvider>
            <VideoModalProvider>
              {children}
            </VideoModalProvider>
          </HotspotMarkersModalProvider>
        </CropModalProvider>
      </LinkModalProvider>
    </UploadModalProvider>
  )
}
