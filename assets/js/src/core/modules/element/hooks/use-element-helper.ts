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

import { type ElementType } from 'types/element-type.d'
import { useAssetHelper } from '@Pimcore/modules/asset/hooks/use-asset-helper'
import { useDataObjectHelper } from '@Pimcore/modules/data-object/hooks/use-data-object-helper'

interface OpenElementWidgetProps {
  id: number
  type: ElementType
}

interface UseElementReturn {
  openElement: (props: OpenElementWidgetProps) => Promise<void>
  mapToElementType: (elementType: string) => ElementType
}

export const useElementHelper = (): UseElementReturn => {
  const { openAsset } = useAssetHelper()
  const { openDataObject } = useDataObjectHelper()
  async function openElement (props: OpenElementWidgetProps): Promise<void> {
    if (props.type === 'asset') {
      openAsset({
        config: {
          id: props.id
        }
      })
    } else if (props.type === 'data-object') {
      openDataObject({
        config: {
          id: props.id
        }
      })
    } else {
      console.log('Opening ' + props.type + ' is not supported yet.')
    }
  }

  function mapToElementType (elementType: string): ElementType {
    switch (elementType) {
      case 'asset':
        return 'asset'

      case 'document':
        return 'document'

      case 'data-object':
      case 'object':
      case 'dataObject':
        return 'data-object'

      default:
        throw new Error('Unknown element type: ' + elementType)
    }
  }

  return { openElement, mapToElementType }
}
