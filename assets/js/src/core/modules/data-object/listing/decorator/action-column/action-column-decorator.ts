/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type AbstractDecoratorProps, type AbstractDecorator } from '@Pimcore/modules/element/listing/decorators/abstract-decorator'
import { withActionColumnConfiguration } from './view-layer/components/grid/hooks/with-action-column-configuration'

export const ActionColumnDecorator: AbstractDecorator = (props) => {
  const { useGridOptions, ...defaultProps } = props

  const newProps: AbstractDecoratorProps = {
    ...defaultProps,
    useGridOptions: withActionColumnConfiguration(useGridOptions)
  }

  return newProps
}
