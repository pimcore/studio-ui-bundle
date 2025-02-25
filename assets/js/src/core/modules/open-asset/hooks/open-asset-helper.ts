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

import { useElementGetIdByPathQuery } from '@Pimcore/modules/element/element-api-slice-enhanced'
import { useEffect, useState } from 'react'
import { useElementHelper } from '@Pimcore/modules/element/hooks/use-element-helper'

interface OpenAssetHelperReturn {
  openElementByPathOrId: (value: string | number | undefined) => Promise<void>
  isLoading: boolean
  isFetching: boolean
}

export const openAssetHelper = (): OpenAssetHelperReturn => {
  const [id, setId] = useState< number | undefined>(undefined)
  const [path, setPath] = useState<string | undefined>(undefined)
  const { openElement } = useElementHelper()

  const isPath = (val: unknown): val is string => {
    return typeof val === 'string'
  }

  const { data: element, isLoading, isFetching } = useElementGetIdByPathQuery(
    { elementType: 'asset', elementPath: path || '' },
    { skip: !path }
  )

  useEffect(() => {
    if (element?.id) {
      await openElement(element.id)
    }
  }, [element, openElement])

  const openElementByPathOrId = async (value: string | number | undefined): Promise<void> => {
    if (typeof value === 'number') {
      await openElement(value)
    } else if (isPath(value)) {
      setPath(value)
    }
  }

  return { openElementByPathOrId, isLoading, isFetching }
}
