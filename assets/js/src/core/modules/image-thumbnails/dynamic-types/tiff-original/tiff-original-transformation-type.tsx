/**
 * Pimcore
 *
 * This source file is available under two different licenses:
 * - Pimcore Open Core License (POCL)
 * - Pimcore Commercial License (PCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 * @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
 * @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
 */

import { injectable } from 'inversify'
import { TransformationDynamicTypeAbstract } from '../transformation-dynamic-type-abstract'
import { type FieldConfig } from '../transformation-dynamic-type-interface'

export interface TiffOriginalTransformationConfig {
  // No configuration needed - uses original TIFF without modifications
}

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

  createDefaultConfig(): any {
    return {}
  }
}