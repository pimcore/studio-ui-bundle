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
import { isUndefined } from 'lodash'

interface OpenAssetHelperReturn {
  openElementByPathOrId: (value: string | number | undefined) => Promise<void>
  isLoading: boolean
  isFetching: boolean
}

export const openAssetHelper = (): OpenAssetHelperReturn => {
  const [path, setPath] = useState<string>('')
  const [shouldFetch, setShouldFetch] = useState(false)
  const { openElement } = useElementHelper()

  const isPath = (val: unknown): val is string => {
    return typeof val === 'string'
  }

  const { data: element, isLoading, isFetching } = useElementGetIdByPathQuery(
    { elementType: 'asset', elementPath: path },
    { skip: !shouldFetch }
  )

  useEffect(() => {
    if (shouldFetch && !isUndefined(element)) {
      void (async () => {
        try {
          await openElement({ id: element.id, type: 'asset' })
        } catch (error) {
          console.error('Error opening element:', error)
        } finally {
          setShouldFetch(false)
        }
      })()
    }
  }, [element, openElement, shouldFetch])

  const openElementByPathOrId = async (value: string | number | undefined): Promise<void> => {
    try {
      if (typeof value === 'number') {
        await openElement({
          id: value,
          type: 'asset'
        })
      } else if (isPath(value)) {
        setPath(value)
        setShouldFetch(true)
      }
    } catch (error) {
      console.error('Error opening asset:', error)
    }
  }

  return { openElementByPathOrId, isLoading, isFetching }
}
