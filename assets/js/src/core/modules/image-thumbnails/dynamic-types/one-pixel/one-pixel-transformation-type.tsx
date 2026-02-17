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

export interface OnePixelTransformationConfig {
  // No configuration needed - generates a 1x1 pixel transparent image
}

@injectable()
export class OnePixelTransformationType extends TransformationDynamicTypeAbstract {
  readonly id = '1x1_pixel'

  getName (): string {
    return this.id
  }

  getLabel (): string {
    return '1x1 Pixel'
  }

  getFieldConfig (): FieldConfig[] {
    // No configuration fields - this transformation generates a 1x1 pixel image
    return []
  }

  createDefaultConfig(): any {
    return {}
  }
}