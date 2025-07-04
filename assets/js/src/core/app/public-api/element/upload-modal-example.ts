/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { getPimcoreStudioApi } from '@Pimcore/app/public-api/helpers/api-helper'

/**
 * Example of how to use the upload modal from within an iframe
 * This can be called from iframe contexts or the parent window
 */
export function openUploadModalExample (): void {
  try {
    const studioApi = getPimcoreStudioApi()

    studioApi.element.openUploadModal({
      targetFolderId: 1, // Target folder ID for uploads
      maxItems: 10,
      multiple: true,
      accept: 'image/*,application/pdf',
      onSuccess: async (assets) => {
        console.log('Upload successful:', assets)
        // Handle successful uploads here
        assets.forEach(asset => {
          console.log(`Uploaded asset: ${asset.id} - ${asset.filename}`)
        })
      },
      onChange: (info) => {
        console.log('Upload progress:', info)
        // Handle upload progress here
      }
    })
  } catch (error) {
    console.error('Failed to open upload modal:', error)
  }
}

/**
 * Example with specific folder path and file restrictions
 */
export function openRestrictedUploadExample (): void {
  try {
    const studioApi = getPimcoreStudioApi()

    studioApi.element.openUploadModal({
      targetFolderPath: '/uploads/images',
      maxItems: 5,
      multiple: true,
      accept: 'image/jpeg,image/png,image/gif',
      onSuccess: async (assets) => {
        console.log('Images uploaded successfully:', assets.length)
        // Process the uploaded images
      },
      onChange: (info) => {
        const { file } = info
        if (file.status === 'done') {
          console.log(`${file.name} uploaded successfully`)
        } else if (file.status === 'error') {
          console.error(`Failed to upload ${file.name}`)
        }
      }
    })
  } catch (error) {
    console.error('Failed to open restricted upload modal:', error)
  }
}
