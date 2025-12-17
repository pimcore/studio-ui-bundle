/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type ReactElement } from 'react'
import { injectable } from 'inversify'
import { DynamicTypePipelineAbstract } from '../../../../dynamic-type-pipeline-abstract'
import { DynamicTypePipelineGridTransformersTwigOperatorComponent } from '@Pimcore/modules/element/dynamic-types/definitions/pipelines/grid/transformers/components/twig-operator/twig-operator'

@injectable()
export class DynamicTypePipelineGridTransformersTwigOperator extends DynamicTypePipelineAbstract {
  readonly id = 'twigOperator'
  readonly group = 'other'

  getComponent (): ReactElement {
    return (
      <DynamicTypePipelineGridTransformersTwigOperatorComponent />
    )
  }
}
