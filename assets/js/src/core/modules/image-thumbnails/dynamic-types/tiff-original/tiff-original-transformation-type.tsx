/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { injectable } from 'inversify'
import { TransformationDynamicTypeAbstract } from '../transformation-dynamic-type-abstract'
import { type FieldConfig } from '../transformation-dynamic-type-interface'

export type TiffOriginalTransformationConfig = Record<string, never>

@injectable()
export class TiffOriginalTransformationType extends TransformationDynamicTypeAbstract {
  readonly id = 'tifforiginal'

  getName (): string {
    return this.id
  }

  getLabel (): string {
    return 'TIFF Original'
  }

  getFieldConfig (): FieldConfig[] {
    // No configuration fields - this transformation uses the original TIFF file
    return []
  }

  createDefaultConfig (): any {
    return {}
  }
}
