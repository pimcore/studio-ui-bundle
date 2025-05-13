/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { VersionsTabContainer } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/components/versions-container/versions-container'
import React from 'react'
import { ComparisonView } from './comparison-view/comparison-view'
import { SingleView } from './single-view/single-view'

export const AssetVersionsTabContainer = (): React.JSX.Element => {
  return (
    <VersionsTabContainer
      ComparisonViewComponent={ ComparisonView }
      SingleViewComponent={ SingleView }
    />
  )
}
