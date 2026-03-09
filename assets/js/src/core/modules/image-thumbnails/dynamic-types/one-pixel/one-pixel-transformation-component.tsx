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

export const OnePixelTransformationComponent: TransformationComponent = () => {
  return (
    <div style={ { padding: '8px 12px' } }>
      {'Just returns a 1x1 pixel GIF base64 encoded, in case you don\'t want to display an image for a certain condition.'}
    </div>
  )
}

OnePixelTransformationComponent.displayName = 'OnePixelTransformationComponent'
