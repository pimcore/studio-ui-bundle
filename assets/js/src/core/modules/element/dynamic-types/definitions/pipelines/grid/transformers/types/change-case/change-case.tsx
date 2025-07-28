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
import { DynamicTypePipelineAbstract } from '../../../../dynamic-type-pipeline-abstract'
import { DynamicTypePipelineGridTransformersChangeCaseComponent } from '../../components/change-case/change-case'
import { injectable } from 'inversify'

@injectable()
export class DynamicTypePipelineGridTransformersChangeCase extends DynamicTypePipelineAbstract {
  readonly id = 'caseChange'

  getComponent (): ReactElement {
    return (
      <DynamicTypePipelineGridTransformersChangeCaseComponent />
    )
  }
}
