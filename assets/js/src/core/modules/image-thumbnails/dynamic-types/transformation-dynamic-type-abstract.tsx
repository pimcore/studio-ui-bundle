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
import type { TransformationComponent } from '../types/transformation-component-types'

@injectable()
export abstract class TransformationDynamicTypeAbstract<TAttributes = any> extends DynamicTypeAbstract {
  abstract readonly id: string

  abstract getLabel (): string

  getId (): string {
    return this.id
  }

  getSummary (config: TAttributes): string {
    return this.getLabel()
  }

  async configureTransformation (defaultConfig?: TAttributes): Promise<TAttributes | null> {
    return await Promise.resolve(defaultConfig ?? this.createDefaultConfig())
  }

  createDefaultConfig (): TAttributes {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return {} as TAttributes
  }

  abstract getReactComponent (): TransformationComponent
}
