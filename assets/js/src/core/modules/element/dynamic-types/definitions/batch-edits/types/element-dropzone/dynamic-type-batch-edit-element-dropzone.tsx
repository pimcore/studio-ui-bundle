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
import { type DynamicTypeBatchEditAbstract } from '@Pimcore/modules/element/dynamic-types/definitions/batch-edits/dynamic-type-batch-edit-abstract'
import {
  DynamicTypeBatchEditElementDropzoneComponent,
  type DynamicTypeBatchEditElementDropzoneProps
} from '@Pimcore/modules/element/dynamic-types/definitions/batch-edits/components/element-dropzone/dynamic-type-batch-edit-element-dropzone-component'

@injectable()
export class DynamicTypeBatchEditElementDropzone implements DynamicTypeBatchEditAbstract {
  id = 'element_dropzone'

  getBatchEditComponent (props: DynamicTypeBatchEditElementDropzoneProps): ReactElement<DynamicTypeBatchEditElementDropzoneProps> {
    return (
      <DynamicTypeBatchEditElementDropzoneComponent { ...props } />
    )
  }
}
