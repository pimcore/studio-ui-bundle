/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import {
  FieldWidthProvider
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/field-width-provider'
import { FieldCollectionProvider } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/field-collection/providers/field-collection-provider'
import React from 'react'
import { VersionsTabContainer } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/components/versions-container/versions-container'
import {
  ComparisonView
} from '@Pimcore/modules/data-object/editor/shared-tab-manager/tabs/versions/comparison-view/comparison-view'
import { SingleView } from '@Pimcore/modules/data-object/editor/shared-tab-manager/tabs/versions/single-view/single-view'

export const VersionViewContainer = (): React.JSX.Element => {
  return (
    <FieldCollectionProvider>
      <FieldWidthProvider>
        <VersionsTabContainer
          ComparisonViewComponent={ ComparisonView }
          SingleViewComponent={ SingleView }
        />
      </FieldWidthProvider>
    </FieldCollectionProvider>
  )
}
