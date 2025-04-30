/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { useDynamicTypeResolver } from '@Pimcore/modules/element/dynamic-types/resolver/hooks/use-dynamic-type-resolver'
import { type BatchEdit } from './batch-edit-provider'

export interface DefaultBatchEditProps {
  batchEdit: BatchEdit
}

export const DefaultBatchEdit = ({ batchEdit }: DefaultBatchEditProps): React.JSX.Element => {
  const { frontendType, type } = batchEdit

  const { getComponentRenderer } = useDynamicTypeResolver()
  const { ComponentRenderer } = getComponentRenderer({ dynamicTypeIds: [type, frontendType!], target: 'BATCH_EDIT' })

  if (ComponentRenderer === null) {
    return <>Dynamic Field Filter not supported</>
  }

  return (
    <>
      { ComponentRenderer({ batchEdit }) }
    </>
  )
}
