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
import { type DynamicTypeAbstract } from '../../registry/dynamic-type-registry-abstract'
import { type ReactElement } from 'react'
import { type AvailableColumn } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider'

@injectable()
export abstract class DynamicTypePipelineAbstract implements DynamicTypeAbstract {
  abstract readonly id: string
  readonly group: string | string[] | null = null

  abstract getComponent (): ReactElement

  isAvailableForSelection (config: Record<string, any>): boolean {
    return true
  }

  /**
   * Seed config for turning an existing, non-advanced grid column into a pipeline item of this type,
   * or `undefined` when this type cannot represent the given column.
   *
   * Implement this to make a column type convertible to an advanced column: the returned value
   * becomes the `config` of a single pipeline item (`{ key: <this.id>, config: <returned value> }`),
   * so it must match the shape the component from {@link getComponent} reads and writes.
   *
   * The `config` argument is the advanced column's config as provided by the backend – the same
   * value {@link isAvailableForSelection} receives. Types that cannot be seeded from an existing
   * column (e.g. static text) keep the default and stay out of the conversion entirely.
   */
  getConversionConfig (column: AvailableColumn, config: Record<string, any>): Record<string, any> | undefined {
    return undefined
  }
}
