/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type React from 'react'
import type { Version } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/version-api-slice.gen'

export interface VersionIdentifiers {
  id: number
  count: number
}

export interface VersionComparisonViewProps {
  versionIds: VersionIdentifiers[]
}

export interface SingleVersionViewProps {
  versions: Version[]
  versionId: VersionIdentifiers
  setDetailedVersions: (vIds: VersionIdentifiers[]) => void
}

export interface VersionDetailViewsProps {
  SingleViewComponent: React.ComponentType<SingleVersionViewProps>
  ComparisonViewComponent: React.ComponentType<VersionComparisonViewProps>
}
