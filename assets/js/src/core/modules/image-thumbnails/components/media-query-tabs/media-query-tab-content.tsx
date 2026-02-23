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
import { MediaQueryTransformationsMultiField } from './media-query-transformations-multi-field'
import type { MediaQuery } from '../../types/media-query.types'
import type { TransformationDynamicTypeInterface } from '../../dynamic-types/transformation-dynamic-type-interface'

interface MediaQueryTabContentProps {
  mediaQuery: MediaQuery
  onTransformationAdd: (type: TransformationDynamicTypeInterface, config: any) => void
  onTransformationRemove: (transformationId: string) => void
  onTransformationUpdate: (transformationId: string, config: any) => void
  onTransformationMoveUp?: (transformationId: string) => void
  onTransformationMoveDown?: (transformationId: string) => void
}

export const MediaQueryTabContent = (props: MediaQueryTabContentProps): React.JSX.Element => {
  return <MediaQueryTransformationsMultiField {...props} />
}