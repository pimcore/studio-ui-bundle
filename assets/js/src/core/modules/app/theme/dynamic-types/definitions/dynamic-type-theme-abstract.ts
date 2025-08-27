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
import { type DynamicTypeAbstract } from '@Pimcore/modules/element/dynamic-types/registry/dynamic-type-registry-abstract'
import { type MappingAlgorithm } from 'antd'

export interface PimcoreThemeConfig {
  token?: Record<string, unknown>
  components?: Record<string, unknown>
  algorithm?: MappingAlgorithm | MappingAlgorithm[]
}

@injectable()
export abstract class DynamicTypeThemeAbstract implements DynamicTypeAbstract {
  abstract readonly id: string
  extends?: string[]

  abstract getThemeConfig (): PimcoreThemeConfig
}
