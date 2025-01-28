/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
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
