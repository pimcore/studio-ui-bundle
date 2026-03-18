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
import { CustomLayoutGeneralSettingsFormFields } from '@Pimcore/modules/class-definition/components/class-editor/custom-layouts/custom-layout-general-settings-form-fields'
import { useCustomLayoutLayoutAccessor } from '@Pimcore/modules/class-definition/components/class-editor/custom-layouts/editor/use-custom-layout-layout-accessor'
import { useDecoratedClassCustomLayoutCollectionQuery } from '@Pimcore/modules/class-definition/components/class-editor/custom-layouts/editor/use-custom-layout-collection-query'
import { useDecoratedCustomLayoutDetailQuery } from '@Pimcore/modules/class-definition/components/class-editor/custom-layouts/editor/use-custom-layout-detail-query'
import { useCustomLayoutUpdateMutation } from '@Pimcore/modules/class-definition/components/class-editor/custom-layouts/editor/use-custom-layout-update-mutation'
import { useCustomLayoutDeleteMutation } from '@Pimcore/modules/class-definition/components/class-editor/custom-layouts/editor/use-custom-layout-delete-mutation'
import { CustomLayoutView } from '@Pimcore/modules/field-definitions/components/editor/custom-layout/view'
import { useLayout } from '@Pimcore/modules/field-definitions/components/editor/items/detail/layout-provider'
import { CustomLayoutLayoutProvider, useCustomLayoutLayout } from '@Pimcore/modules/field-definitions/components/editor/custom-layout/items/detail/layout-provider'
import { type ImportExportConfig } from '@Pimcore/modules/field-definitions/components/editor/settings-provider'
import { getPrefix } from '@Pimcore/app/api/pimcore/route'

const customLayoutImportExportConfig: ImportExportConfig = {
  getExportUrl: (id) => `${getPrefix()}/class/custom-layout/export/${id}`,
  getImportUrl: (id) => `${getPrefix()}/class/custom-layout/import/${id}`,
  successMessageKey: 'custom-layout.import-success'
}

export const CustomLayoutEditor = (): React.JSX.Element => {
  return (
    <Editor
      AddModal={ CustomLayoutAddModal }
      GeneralSettingsFormFields={ CustomLayoutGeneralSettingsFormFields }
      LayoutProvider={ CustomLayoutLayoutProvider }
      area={ ['class', 'custom-layout'] }
      customLayouts={ {
        parent: {
          area: ['class'],
          useLayout
        }
      } }
      importExportConfig={ customLayoutImportExportConfig }
      useDetailGeneralSettingsQuery={ useDecoratedCustomLayoutDetailQuery }
      useDetailLayoutAccessor={ useCustomLayoutLayoutAccessor }
      useDetailUpdateMutation={ useCustomLayoutUpdateMutation }
      useItemsDeleteMutation={ useCustomLayoutDeleteMutation }
      useItemsQuery={ useDecoratedClassCustomLayoutCollectionQuery }
      useLayout={ useCustomLayoutLayout }
      view={ <CustomLayoutView /> }
    />
  )
}
