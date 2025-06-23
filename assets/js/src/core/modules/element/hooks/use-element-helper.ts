/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'
import { useAssetHelper } from '@Pimcore/modules/asset/hooks/use-asset-helper'
import { type SaveTaskType } from '@Pimcore/modules/data-object/actions/save/use-save'
import { useDataObjectHelper } from '@Pimcore/modules/data-object/hooks/use-data-object-helper'
import { useDocumentHelper } from '@Pimcore/modules/document/hooks/use-document-helper'
import { mapToElementType as mapType } from '@Pimcore/modules/element/utils/element-type'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'

interface OpenElementWidgetProps {
  id: number
  type: ElementType
}

interface UseElementReturn {
  openElement: (props: OpenElementWidgetProps) => Promise<void>
  mapToElementType: (elementType: string, silent?: boolean) => ElementType | undefined
  executeElementTask: (elementType: ElementType, id: number, task: SaveTaskType, onFinish?: () => void) => void
}

export const useElementHelper = (): UseElementReturn => {
  const { openAsset } = useAssetHelper()
  const { openDataObject, executeDataObjectTask } = useDataObjectHelper()
  const { openDocument, executeDocumentTask } = useDocumentHelper()

  async function openElement (props: OpenElementWidgetProps): Promise<void> {
    const elementType = mapToElementType(props.type)
    if (elementType === 'asset') {
      openAsset({
        config: {
          id: props.id
        }
      })
    } else if (elementType === 'data-object') {
      void openDataObject({
        config: {
          id: props.id
        }
      })
    } else if (elementType === 'document') {
      void openDocument({
        config: {
          id: props.id
        }
      })
    }
  }

  function mapToElementType (elementType: string, silent?: boolean): ElementType | undefined {
    const targetType = mapType(elementType)

    if (targetType === null && silent !== true) {
      trackError(new GeneralError(`Unknown element type: ${elementType}`))
      return undefined
    }

    return targetType ?? undefined
  }

  const executeElementTask = (elementType: ElementType, id: number, task: SaveTaskType, onFinish?: () => void): void => {
    if (elementType === 'data-object') {
      void executeDataObjectTask(id, task, onFinish)
      return
    }

    if (elementType === 'document') {
      void executeDocumentTask(id, task, onFinish)
      return
    }

    console.log('not implemented for elementType: ' + elementType)
  }

  return { openElement, mapToElementType, executeElementTask }
}
