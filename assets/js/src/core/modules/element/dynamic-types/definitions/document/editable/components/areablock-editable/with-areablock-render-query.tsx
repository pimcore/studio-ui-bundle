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
import { AreablockEditable, type AreablockEditableProps } from './areablock-editable'
import { useLazyDocumentPageSnippetAreaBlockRenderQuery } from '@Pimcore/modules/document/document-api-slice-enhanced'

export const WithAreablockRenderQuery = (props: Omit<AreablockEditableProps, 'renderTrigger'>): React.JSX.Element => {
  const [renderTrigger] = useLazyDocumentPageSnippetAreaBlockRenderQuery()

  return (
    <AreablockEditable
      { ...props }
      renderTrigger={ renderTrigger }
    />
  )
}
