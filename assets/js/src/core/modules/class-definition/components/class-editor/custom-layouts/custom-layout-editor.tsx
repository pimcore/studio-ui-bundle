/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { Editor } from '@Pimcore/modules/field-definitions/components/editor'
import { CustomLayoutAddModal } from '@Pimcore/modules/class-definition/components/class-editor/custom-layouts/editor/add-modal'
import { usePimcoreStudioApiClassCustomLayoutDeleteMutation, usePimcoreStudioApiClassCustomLayoutUpdateMutation } from '@Pimcore/modules/class-definition/class-definition-slice.gen'
import { useCustomLayoutLayoutAccessor } from '@Pimcore/modules/class-definition/components/class-editor/custom-layouts/editor/use-custom-layout-layout-accessor'
import { useDecoratedClassCustomLayoutCollectionQuery } from '@Pimcore/modules/class-definition/components/class-editor/custom-layouts/editor/use-custom-layout-collection-query'
import { useDecoratedCustomLayoutDetailQuery } from '@Pimcore/modules/class-definition/components/class-editor/custom-layouts/editor/use-custom-layout-detail-query'
import { CustomLayoutView } from '@Pimcore/modules/field-definitions/components/editor/custom-layout/view'
import { useLayout } from '@Pimcore/modules/field-definitions/components/editor/items/detail/layout-provider'
import { CustomLayoutLayoutProvider, useCustomLayoutLayout } from '@Pimcore/modules/field-definitions/components/editor/custom-layout/items/detail/layout-provider'

export const CustomLayoutEditor = (): React.JSX.Element => {
  return (
    <Editor
      AddModal={ CustomLayoutAddModal }
      LayoutProvider={ CustomLayoutLayoutProvider }
      area={ ['class', 'custom-layout'] }
      customLayouts={ {
        parent: {
          useLayout
        }
      } }
      useDetailGeneralSettingsQuery={ useDecoratedCustomLayoutDetailQuery }
      useDetailLayoutAccessor={ useCustomLayoutLayoutAccessor }
      useDetailUpdateMutation={ usePimcoreStudioApiClassCustomLayoutUpdateMutation }
      useItemsDeleteMutation={ usePimcoreStudioApiClassCustomLayoutDeleteMutation }
      useItemsQuery={ useDecoratedClassCustomLayoutCollectionQuery }
      useLayout={ useCustomLayoutLayout }
      view={ <CustomLayoutView /> }
    />
  )
}
