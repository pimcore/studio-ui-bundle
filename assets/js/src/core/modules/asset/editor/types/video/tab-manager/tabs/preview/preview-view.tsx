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
import { useStyle } from './preview-view.styles'
import { PimcoreVideo } from '@Pimcore/components/pimcore-video/pimcore-video'

interface PreviewViewProps {
  src: string
  poster?: string
}

const PreviewView = (props: PreviewViewProps): React.JSX.Element => {
  const { styles } = useStyle()
  const { src, poster } = props

  return (
    <div className={ styles.preview }>
      <PimcoreVideo
        poster={ poster }
        sources={ [{ src }] }
      />
    </div>
  )
}

export { PreviewView }
