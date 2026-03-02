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
import { useClassDefinitionCollectionQuery, useClassDefinitionDeleteMutation, useClassDefinitionGetByIdQuery, useClassDefinitionGetLayoutByIdQuery } from '@Pimcore/modules/class-definition/class-definition-slice-enhanced'
import { ClassDefinitionsAddModal } from '@Pimcore/modules/class-definition/components/class-editor/add-modal'
import { ClassDefinitionGeneralSettingsFormFields } from '@Pimcore/modules/class-definition/components/class-editor/general-settings-form-fields'
import { useClassDefinitionUpdate } from '@Pimcore/modules/class-definition/components/class-editor/use-class-definition-update'
import { CustomLayoutEditor } from '@Pimcore/modules/class-definition/components/class-editor/custom-layouts/custom-layout-editor'
import { type ImportExportConfig } from '@Pimcore/modules/field-definitions/components/editor/settings-provider'
import { getPrefix } from '@Pimcore/app/api/pimcore/route'

const classDefinitionImportExportConfig: ImportExportConfig = {
  getExportUrl: (id) => `${getPrefix()}/class/definition/configuration-view/detail/${id}/export`,
  getImportUrl: (id) => `${getPrefix()}/class/definition/configuration-view/detail/${id}/import`
}

export const ClassDefinitionWidget = (): React.JSX.Element => {
  return (
    <Editor
      AddModal={ ClassDefinitionsAddModal }
      GeneralSettingsFormFields={ ClassDefinitionGeneralSettingsFormFields }
      area={ ['class'] }
      customLayouts={ {
        ModalContent: <CustomLayoutEditor />
      } }
      importExportConfig={ classDefinitionImportExportConfig }
      useDetailGeneralSettingsQuery={ useClassDefinitionGetByIdQuery }
      useDetailLayoutQuery={ useClassDefinitionGetLayoutByIdQuery }
      useDetailUpdateMutation={ useClassDefinitionUpdate }
      useItemsDeleteMutation={ useClassDefinitionDeleteMutation }
      useItemsQuery={ useClassDefinitionCollectionQuery }
    />
  )
}
