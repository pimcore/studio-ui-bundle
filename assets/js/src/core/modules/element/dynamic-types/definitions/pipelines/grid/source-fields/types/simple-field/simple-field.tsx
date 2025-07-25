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
import { injectable } from 'inversify'
import { DynamicTypePipelineGridSourceFieldsSimpleFieldComponent } from '../../components/simple-field/simple-field'

@injectable()
export class DynamicTypePipelineGridSourceFieldsSimpleField extends DynamicTypePipelineAbstract {
  readonly id = 'simpleField'

  getComponent (): ReactElement {
    return (
      <DynamicTypePipelineGridSourceFieldsSimpleFieldComponent />
    )
  }
}
