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
import type { TransformationComponent } from '../../types/transformation-component-types'

export const TiffOriginalTransformationComponent: TransformationComponent = () => {
  return (
    <div style={ { padding: '8px 12px' } }>
      {'Use original TIFF when source format is a TIFF Image -> do not modify it.'}
    </div>
  )
}

TiffOriginalTransformationComponent.displayName = 'TiffOriginalTransformationComponent'
