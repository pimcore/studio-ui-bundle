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
import { BulkImportModal } from './bulk-import-modal'
import { useBulkImportContext } from './context/bulk-import-context'

const MODAL_ID = 'bulk-import-modal'

export const BulkImportModalHolder = (): React.JSX.Element => {
  const { isOpen, close, selectedItems, selectAll, deselectAll, toggleItem, isSelected } = useBulkImportContext()
  const { addModal, removeModal } = useModalHolder()

  useEffect(() => {
    if (isOpen) {
      addModal(
        MODAL_ID,
        <BulkImportModal
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
