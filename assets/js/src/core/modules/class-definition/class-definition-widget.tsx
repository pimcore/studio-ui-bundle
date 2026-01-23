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
import { useClassDefinitionUpdate } from '@Pimcore/modules/class-definition/components/class-editor/use-class-definition-update'
import { CustomLayoutEditor } from '@Pimcore/modules/class-definition/components/class-editor/custom-layouts/custom-layout-editor'

export const ClassDefinitionWidget = (): React.JSX.Element => {
  return (
    <Editor
      AddModal={ ClassDefinitionsAddModal }
      area={ ['class'] }
      customLayouts={ {
        ModalContent: <CustomLayoutEditor />
      } }
      useDetailGeneralSettingsQuery={ useClassDefinitionGetByIdQuery }
      useDetailLayoutQuery={ useClassDefinitionGetLayoutByIdQuery }
      useDetailUpdateMutation={ useClassDefinitionUpdate }
      useItemsDeleteMutation={ useClassDefinitionDeleteMutation }
      useItemsQuery={ useClassDefinitionCollectionQuery }
    />
  )
}
