/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useEffect } from 'react'
import { uuid } from '@Pimcore/utils/uuid'
import { type DataProperty } from '@Pimcore/modules/element/draft/hooks/use-properties'
import {
  type DataProperty as DataPropertyApi
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/properties/properties-api-slice.gen'
import { usePropertyGetCollectionForElementByTypeAndIdQuery } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/properties/properties-api-slice-enhanced'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import { useElementDraft } from '@Pimcore/modules/element/hooks/use-element-draft'

interface UsePropertiesInitializationOptions {
  skip?: boolean
}

interface UsePropertiesInitializationReturn {
  data: { items?: DataPropertyApi[] } | undefined
  isLoading: boolean
}

export const usePropertiesInitialization = (options?: UsePropertiesInitializationOptions): UsePropertiesInitializationReturn => {
  const { elementType, id } = useElementContext()
  const { element, setProperties } = useElementDraft(id, elementType)

  const { data, isLoading, isFetching } = usePropertyGetCollectionForElementByTypeAndIdQuery({
    elementType,
    id
  }, {
    skip: options?.skip
  })

  const enrichProperties = (apiProperties: DataPropertyApi[]): DataProperty[] => {
    return apiProperties.map((item) => ({
      ...item,
      rowId: uuid()
    }))
  }

  useEffect(() => {
    if (data !== undefined && !isFetching && element?.changes?.properties === undefined && Array.isArray(data.items)) {
      setProperties(enrichProperties(data.items))
    }
  }, [data, element?.changes?.properties, isFetching])

  return { data, isLoading }
}
