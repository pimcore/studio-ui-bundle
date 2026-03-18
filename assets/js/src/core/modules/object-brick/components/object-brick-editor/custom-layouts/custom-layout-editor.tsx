/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo } from 'react'
import { Editor } from '@Pimcore/modules/field-definitions/components/editor'
import { ObjectBrickCustomLayoutGeneralSettingsFormFields } from '@Pimcore/modules/object-brick/components/object-brick-editor/custom-layouts/custom-layout-general-settings-form-fields'
import { useObjectBrickCustomLayoutLayoutAccessor } from '@Pimcore/modules/object-brick/components/object-brick-editor/custom-layouts/editor/use-custom-layout-layout-accessor'
import { useObjectBrickCustomLayoutCollectionQuery } from '@Pimcore/modules/object-brick/components/object-brick-editor/custom-layouts/editor/use-custom-layout-collection-query'
import { useObjectBrickCustomLayoutDetailQuery } from '@Pimcore/modules/object-brick/components/object-brick-editor/custom-layouts/editor/use-custom-layout-detail-query'
import { useObjectBrickCustomLayoutUpdateMutation } from '@Pimcore/modules/object-brick/components/object-brick-editor/custom-layouts/editor/use-custom-layout-update-mutation'
import { CustomLayoutView } from '@Pimcore/modules/field-definitions/components/editor/custom-layout/view'
import { ObjectBrickCustomLayoutLayoutProvider, useObjectBrickCustomLayoutLayout } from '@Pimcore/modules/object-brick/components/object-brick-editor/custom-layouts/object-brick-custom-layout-layout-provider'
import { type ImportExportConfig } from '@Pimcore/modules/field-definitions/components/editor/settings-provider'
import { getPrefix } from '@Pimcore/app/api/pimcore/route'
import { useObjectBrickLayout } from '@Pimcore/modules/object-brick/object-brick-layout-provider'
import { useCurrentConfiguration } from '@Pimcore/modules/field-definitions/components/editor/custom-layout/current-configuration-provider'

export const ObjectBrickCustomLayoutEditor = (): React.JSX.Element => {
  const { configuration } = useCurrentConfiguration()
  const obKey = String(configuration?.id ?? '')

  const customLayoutImportExportConfig = useMemo<ImportExportConfig>(() => ({
    getExportUrl: (id) => `${getPrefix()}/class/object-brick/${obKey}/custom-layout/${id}/export`,
    getImportUrl: (id) => `${getPrefix()}/class/object-brick/${obKey}/custom-layout/${id}/import`,
    successMessageKey: 'custom-layout.import-success'
  }), [obKey])

  return (
    <Editor
      GeneralSettingsFormFields={ ObjectBrickCustomLayoutGeneralSettingsFormFields }
      LayoutProvider={ ObjectBrickCustomLayoutLayoutProvider }
      area={ ['objectbrick', 'custom-layout'] }
      customLayouts={ {
        parent: {
          area: ['objectbrick'],
          useLayout: useObjectBrickLayout
        }
      } }
      importExportConfig={ customLayoutImportExportConfig }
      useDetailGeneralSettingsQuery={ useObjectBrickCustomLayoutDetailQuery }
      useDetailLayoutAccessor={ useObjectBrickCustomLayoutLayoutAccessor }
      useDetailUpdateMutation={ useObjectBrickCustomLayoutUpdateMutation }
      useItemsQuery={ useObjectBrickCustomLayoutCollectionQuery }
      useLayout={ useObjectBrickCustomLayoutLayout }
      view={ <CustomLayoutView /> }
    />
  )
}
