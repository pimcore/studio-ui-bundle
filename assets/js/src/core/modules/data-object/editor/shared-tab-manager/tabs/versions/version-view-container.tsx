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
          ComparisonViewComponent={ComparisonView}
          SingleViewComponent={SingleView}
        />
      </FieldWidthProvider>
    </FieldCollectionProvider>
  )
}