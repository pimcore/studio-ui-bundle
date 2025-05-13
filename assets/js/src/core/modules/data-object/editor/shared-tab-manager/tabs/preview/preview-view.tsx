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
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import { DataObjectPreview } from '@Pimcore/components/data-object-preview/data-object-preview'

export const PreviewView = (): React.JSX.Element => {
  const { id } = useElementContext()

  return (
    <DataObjectPreview id={ id } />
  )
}
