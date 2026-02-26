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
import { DynamicTypeAbstract } from '@Pimcore/modules/element/dynamic-types/registry/dynamic-type-registry-abstract'
import { type TransformationDynamicTypeInterface } from './transformation-dynamic-type-interface'
import type { TransformationComponent } from '../types/transformation-component-types'

@injectable()
export abstract class TransformationDynamicTypeAbstract extends DynamicTypeAbstract implements TransformationDynamicTypeInterface {
  abstract readonly id: string

  abstract getName (): string
  abstract getLabel (): string

  getId (): string {
    return this.id
  }

  validateConfig (config: unknown): boolean {
    return true
  }

  async configureTransformation (config: unknown): Promise<unknown | null> {
    return await Promise.resolve(this.createDefaultConfig())
  }

  createDefaultConfig (): unknown {
    return {}
  }

  // All transformation types must provide a React component
  abstract getReactComponent (): TransformationComponent
}
