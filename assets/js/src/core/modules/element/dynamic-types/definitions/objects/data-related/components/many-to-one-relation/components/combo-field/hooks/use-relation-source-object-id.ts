/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useMemo } from 'react'
import { isNil } from 'lodash'
import { useOptionalElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import {
  useRowSelectionOptional
} from '@Pimcore/modules/element/listing/decorators/row-selection/context-layer/provider/use-row-selection-optional'

/**
 * Resolves the concrete object the format-path endpoint should resolve the field
 * definition against, for each place a relation field is rendered:
 *
 * - grid cell edit modal: `explicitObjectId`, the row being edited;
 * - batch edit: the first selected row — every selected row is an object of the
 *   listed class, which is all the endpoint needs;
 * - object editor: the element context.
 *
 * Inside a listing the element context is the *folder* being listed. The endpoint
 * responds 404 for it ("Object with ID: x not found") because a folder is not a
 * concrete object, so it is only used outside a listing.
 */
export const useRelationSourceObjectId = (explicitObjectId?: number): number | undefined => {
  const elementContext = useOptionalElementContext()
  const rowSelection = useRowSelectionOptional()

  const firstSelectedRowId = useMemo<number | undefined>(() => {
    const selectedRows = rowSelection?.selectedRows

    if (isNil(selectedRows)) {
      return undefined
    }

    const ids = Object.keys(selectedRows).map(Number).filter((id) => !Number.isNaN(id))

    return ids.length > 0 ? ids[0] : undefined
  }, [rowSelection?.selectedRows])

  if (!isNil(explicitObjectId)) {
    return explicitObjectId
  }

  if (!isNil(firstSelectedRowId)) {
    return firstSelectedRowId
  }

  return isNil(rowSelection) ? elementContext?.id : undefined
}
