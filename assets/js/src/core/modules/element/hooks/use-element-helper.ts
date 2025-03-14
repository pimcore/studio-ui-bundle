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

import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { useAssetHelper } from '@Pimcore/modules/asset/hooks/use-asset-helper'
import { useDataObjectHelper } from '@Pimcore/modules/data-object/hooks/use-data-object-helper'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'
import { mapToElementType as mapType } from '@Pimcore/modules/element/utils/element-type'

interface OpenElementWidgetProps {
  id: number
  type: ElementType
}

interface UseElementReturn {
  openElement: (props: OpenElementWidgetProps) => Promise<void>
  mapToElementType: (elementType: string, silent?: boolean) => ElementType | undefined
}

export const useElementHelper = (): UseElementReturn => {
  const { openAsset } = useAssetHelper()
  const { openDataObject } = useDataObjectHelper()
  async function openElement (props: OpenElementWidgetProps): Promise<void> {
    const elementType = mapToElementType(props.type)
    if (elementType === 'asset') {
      openAsset({
        config: {
          id: props.id
        }
      })
    } else if (elementType === 'data-object') {
      openDataObject({
        config: {
          id: props.id
        }
      })
    } else {
      console.log('Opening ' + elementType + ' is not supported yet.')
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

  return { openElement, mapToElementType }
}
