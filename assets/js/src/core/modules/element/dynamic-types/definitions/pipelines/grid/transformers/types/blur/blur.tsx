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
import { DynamicTypePipelineGridTransformersBlurComponent } from '@Pimcore/modules/element/dynamic-types/definitions/pipelines/grid/transformers/components/blur/blur'

@injectable()
export class DynamicTypePipelineGridTransformersBlur extends DynamicTypePipelineAbstract {
  readonly id = 'blur'
  readonly group = 'string'

  getComponent (): ReactElement {
    return (
      <DynamicTypePipelineGridTransformersBlurComponent />
    )
  }
}
