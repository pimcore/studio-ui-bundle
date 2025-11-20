/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { withDynamicTypes } from '@Pimcore/modules/data-object/listing/decorator/dynamic-type/context-layer/with-dynamic-types'
import { type AbstractDecorator } from '@Pimcore/modules/element/listing/decorators/abstract-decorator'

export const DynamicTypeDecorator: AbstractDecorator = (props) => {
  const { ContextComponent, ...baseProps } = props

  return {
    ...baseProps,
    ContextComponent: withDynamicTypes(ContextComponent)
  }
}
