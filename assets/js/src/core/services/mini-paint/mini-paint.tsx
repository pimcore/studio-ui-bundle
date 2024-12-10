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

import React, { useState } from 'react'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'

export const MiniPaint = (): React.JSX.Element => {
  const { id } = useElementContext()

  const [isLoaded, setIsLoaded] = useState(false)

  const iframeSrc = `/pimcore-studio/api/image-editor?id=${id}`

  const handleIframeLoad = (): void => {
    setIsLoaded(true)
  }

  return (
    <div style={ { width: '100%', height: '100%' } }>
      {!isLoaded && <div>Loading...</div>}
      <iframe
        height={ '100%' }
        onLoad={ handleIframeLoad }
        src={ iframeSrc }
        style={ { display: isLoaded ? 'block' : 'none' } }
        title="MiniPaint editor"
        width={ '100%' }
      />
    </div>
  )
}
