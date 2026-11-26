/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useCallback, useRef, useState } from 'react'
import { DndUploadZone } from '../../tree/dnd-upload/dnd-upload-zone'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import { useAssetGetByIdQuery } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { checkElementPermission } from '@Pimcore/modules/element/permissions/permission-helper'
import { useTreePermission } from '@Pimcore/components/element-tree/provider/tree-permission-provider/use-tree-permission'
import { TreePermission } from '@Pimcore/modules/perspectives/enums/tree-permission'
import { useStyles } from './listing-drop-zone.styles'

export interface ListingDropZoneProps {
  children: React.ReactNode
  onUploaded?: () => void
}

const carriesFiles = (e: React.DragEvent): boolean => Array.from(e.dataTransfer?.types ?? []).includes('Files')

export const ListingDropZone = ({ children, onUploaded }: ListingDropZoneProps): React.JSX.Element => {
  const { id } = useElementContext()
  const { currentData: data } = useAssetGetByIdQuery({ id })
  const { isTreeActionAllowed } = useTreePermission()
  const { styles } = useStyles()
  const [fileDrag, setFileDrag] = useState(false)
  const depth = useRef(0)

  const onDragEnter = useCallback((e: React.DragEvent): void => {
    if (!carriesFiles(e)) return
    depth.current += 1
    setFileDrag(true)
  }, [])

  const onDragLeave = useCallback((e: React.DragEvent): void => {
    if (!carriesFiles(e)) return
    depth.current = Math.max(0, depth.current - 1)
    if (depth.current === 0) setFileDrag(false)
  }, [])

  const reset = useCallback((): void => {
    depth.current = 0
    setFileDrag(false)
  }, [])

  const allowed = data !== undefined && checkElementPermission(data.permissions, 'create') && isTreeActionAllowed(TreePermission.AddUpload)

  if (!allowed) {
    return <>{children}</>
  }

  return (
    <div
      className={ styles.dropArea }
      data-file-drag={ fileDrag ? '' : undefined }
      data-testid="listing-drop-area"
      onDragEnter={ onDragEnter }
      onDragLeave={ onDragLeave }
      onDropCapture={ reset }
    >
      <DndUploadZone
        targetFolderId={ id }
        onUploaded={ onUploaded }
        targetPath={ data.fullPath ?? '' }
      >
        {children}
      </DndUploadZone>
    </div>
  )
}
