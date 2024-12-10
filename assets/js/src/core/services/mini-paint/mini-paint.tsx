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

export const MiniPaint = (): React.JSX.Element => {
  const { id } = useElementContext()

  const iframeSrc = `/pimcore-studio/api/image-editor?id=${id}`

  return (
    <div style={ { width: '100%', height: '100%' } }>
      <iframe
        height={ '100%' }
        src={ iframeSrc }
        title="MiniPaint editor"
        width={ '100%' }
      />
    </div>
  )
}
