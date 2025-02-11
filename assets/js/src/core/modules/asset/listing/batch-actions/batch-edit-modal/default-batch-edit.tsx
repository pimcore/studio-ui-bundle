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
