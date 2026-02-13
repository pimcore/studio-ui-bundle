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
import React from 'react'

export interface SepiaTransformationConfig {
  // No configuration needed
}

@injectable()
export class SepiaTransformationType extends TransformationDynamicTypeAbstract {
  readonly id = 'sepia'

  getName (): string {
    return this.id
  }

  getLabel (): string {
    return 'Sepia'
  }

  getFieldConfig (): FieldConfig[] {
    return [
      this.createFieldConfig('info', 'text', 'Information', {
        defaultValue: 'Nothing to configure',
        props: { readOnly: true, disabled: true, title: 'This transformation applies a sepia effect automatically' }
      })
    ]
  }
}