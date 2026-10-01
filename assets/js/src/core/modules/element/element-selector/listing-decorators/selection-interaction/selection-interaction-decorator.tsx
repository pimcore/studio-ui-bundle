/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type AbstractDecoratorWithRequiredConfig } from '@Pimcore/modules/element/listing/decorators/abstract-decorator'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { withSelectionInteraction } from './view-layer/with-selection-interaction'

export interface ISelectionInteractionConfig {
  elementType: ElementType
}

export type ISelectionInteractionDecorator = AbstractDecoratorWithRequiredConfig<ISelectionInteractionConfig>

export type ISelectionInteractionDecoratorProps = Parameters<ISelectionInteractionDecorator>[0]

export const SelectionInteractionDecorator: ISelectionInteractionDecorator = (props, config) => {
  const { useGridOptions, ...baseProps } = props

  const newProps = {
    ...baseProps,
    useGridOptions: withSelectionInteraction(useGridOptions, config)
  }

  return newProps
}
