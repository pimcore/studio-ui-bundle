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
  useEditableDropzones,
  type UseEditableDropzonesReturn,
  type EditableManager
} from '../../../helpers/editable-dropzone-sorting/hooks/use-editable-dropzones'

export interface UseBlockDropzonesProps {
  blockManager: BlockManager
  onMoveBlock: (fromIndex: number, toIndex: number) => void
}

export interface UseBlockDropzonesReturn extends UseEditableDropzonesReturn {
  dragOverlayTitle: string | undefined
}

export const useBlockDropzones = ({
  blockManager,
  onMoveBlock
}: UseBlockDropzonesProps): UseBlockDropzonesReturn => {
  const { t } = useTranslation()

  const sortingResult = useEditableDropzones({
    editableManager: blockManager as EditableManager,
    onMoveItem: onMoveBlock
  })

  const dragOverlayTitle = t('block')

  return {
    ...sortingResult,
    dragOverlayTitle
  }
}
