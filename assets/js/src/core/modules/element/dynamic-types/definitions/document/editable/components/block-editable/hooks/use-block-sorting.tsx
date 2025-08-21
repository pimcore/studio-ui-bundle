/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useTranslation } from 'react-i18next'
import { type BlockManager } from '../utils/block-manager'
import {
  useEditableDropzoneSorting,
  type UseEditableDropzoneSortingReturn,
  type EditableManager
} from '../../../helpers/editable-dropzone-sorting/hooks/use-editable-dropzone-sorting'

export interface UseBlockSortingProps {
  blockManager: BlockManager
  onMoveBlock: (fromIndex: number, toIndex: number) => void
}

export interface UseBlockSortingReturn extends UseEditableDropzoneSortingReturn {
  dragOverlayTitle: string | undefined
}

export const useBlockSorting = ({
  blockManager,
  onMoveBlock
}: UseBlockSortingProps): UseBlockSortingReturn => {
  const { t } = useTranslation()

  const sortingResult = useEditableDropzoneSorting({
    editableManager: blockManager as EditableManager,
    onMoveItem: onMoveBlock
  })

  const dragOverlayTitle = t('block')

  return {
    ...sortingResult,
    dragOverlayTitle
  }
}
