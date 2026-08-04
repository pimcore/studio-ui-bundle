/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type {
  BundleCustomReportsConfigurationTreeNode,
  BundleCustomReportsTreeNodeFolder
} from '@Pimcore/modules/reports/custom-reports-api-slice.gen'

export const isFolder = (item: BundleCustomReportsConfigurationTreeNode | BundleCustomReportsTreeNodeFolder): item is BundleCustomReportsTreeNodeFolder => {
  return 'children' in item && Array.isArray(item.children)
}
