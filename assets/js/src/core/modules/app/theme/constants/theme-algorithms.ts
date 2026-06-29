/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { theme, type MappingAlgorithm } from 'antd'

/**
 * Ant Design's dark mapping algorithm, exposed through the SDK surface.
 * Bundles must never import from antd directly — use this export when
 * building a dark theme dynamic type (see `PimcoreThemeConfig.algorithm`).
 */
export const darkThemeAlgorithm: MappingAlgorithm = theme.darkAlgorithm

export type { MappingAlgorithm }
