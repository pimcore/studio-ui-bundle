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
import { getPrefix } from '@Pimcore/app/api/pimcore/route'

export const PreviewView = (): React.JSX.Element => {
  const { id } = useElementContext()

  return (
    <iframe
      height="100%"
      src={ `${getPrefix()}/data-objects/preview/${id}` }
      title={ 'foobar' }
      width="100%"
    />
  )
}
