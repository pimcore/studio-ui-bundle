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

import type { IEditorTab } from '@Pimcore/modules/element/editor/tab-manager/interface/IEditorTab'
import {
  VersionsTabContainer
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/components/versions-container/versions-container'
import { Icon } from '@Pimcore/components/icon/icon'
import React from 'react'
import {
  ComparisonView
} from '@Pimcore/modules/data-object/editor/shared-tab-manager/tabs/versions/comparison-view/comparison-view'
import { SingleView } from '@Pimcore/modules/data-object/editor/shared-tab-manager/tabs/versions/single-view/single-view'
import { PreviewView } from '@Pimcore/modules/data-object/editor/shared-tab-manager/tabs/preview/preview-view'
import {
  FieldWidthProvider
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/field-width-provider'
import { FieldCollectionProvider } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/field-collection/providers/field-collection-provider'
import { checkElementPermission } from '@Pimcore/modules/element/permissions/permission-helper'

export const TAB_VERSIONS: IEditorTab = {
  key: 'versions',
  label: 'version.label',
  children: (
    <FieldCollectionProvider>
      <FieldWidthProvider>
        <VersionsTabContainer
          ComparisonViewComponent={ ComparisonView }
          SingleViewComponent={ SingleView }
        />
      </FieldWidthProvider>
    </FieldCollectionProvider>
  ),
  icon: <Icon value={ 'history' } />,
  isDetachable: true,
  hidden: (element): boolean => {
    return !checkElementPermission(element.permissions, 'versions')
  }
}

export const TAB_PREVIEW: IEditorTab = {
  key: 'preview',
  label: 'preview.label',
  children: <PreviewView />,
  icon: <Icon value={ 'preview' } />,
  isDetachable: true,
  hidden: (element): boolean => {
    return !(element.hasPreview!)
  }
}
