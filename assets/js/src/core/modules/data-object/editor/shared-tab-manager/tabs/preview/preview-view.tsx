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
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import { DataObjectPreview } from '@Pimcore/components/data-object-preview/data-object-preview'

export const PreviewView = (): React.JSX.Element => {
  const { id } = useElementContext()

  return (
    <DataObjectPreview id={ id } />
  )
}
