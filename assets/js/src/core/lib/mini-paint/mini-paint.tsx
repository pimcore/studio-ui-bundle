/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useState } from 'react'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import { Spin } from '@Pimcore/components/spin/spin'
import { Flex } from '@Pimcore/components/flex/flex'
import { useStyle } from './mini-paint.styles'

export const MiniPaint = (): React.JSX.Element => {
  const { id } = useElementContext()

  const [isLoaded, setIsLoaded] = useState(false)
  const { styles } = useStyle({ isLoaded })

  const iframeSrc = `/pimcore-studio/api/image-editor?id=${id}`

  const handleIframeLoad = (): void => { setIsLoaded(true) }

  return (
    <Flex
      align="center"
      className={ styles.imageIframeContainer }
      justify="center"
    >
      {!isLoaded && (
        <Spin
          asContainer
          tip='Loading'
        />
      )}
      <iframe
        className={ styles.imageIframe }
        onLoad={ handleIframeLoad }
        src={ iframeSrc }
        title="Image Editor"
      />
    </Flex>
  )
}
