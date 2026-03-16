/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect } from 'react'
import { useModalHolder } from '@Pimcore/modules/app/modal-holder/use-modal-holder'
import { BulkExportModal } from './bulk-export-modal'
import { useBulkExportContext } from './context/bulk-export-context'

const MODAL_ID = 'bulk-export-modal'

export const BulkExportModalHolder = (): React.JSX.Element => {
  const { isOpen, close, selectedItems, selectAll, deselectAll, toggleItem, isSelected } = useBulkExportContext()
  const { addModal, removeModal } = useModalHolder()

  useEffect(() => {
    if (isOpen) {
      addModal(
        MODAL_ID,
        <BulkExportModal
          closeModal={ close }
          deselectAll={ deselectAll }
          isSelected={ isSelected }
          onCancel={ close }
          onClose={ close }
          open={ isOpen }
          selectAll={ selectAll }
          selectedItems={ selectedItems }
          toggleItem={ toggleItem }
        />
      )
    } else {
      removeModal(MODAL_ID)
    }
  }, [isOpen, selectedItems, isSelected])

  return <></>
}
