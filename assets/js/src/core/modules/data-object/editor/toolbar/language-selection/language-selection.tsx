/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useContext } from 'react'
import { useLanguageSelection } from '@Pimcore/components/language-selection/provider/use-language-selection'
import { PermissionBasedLanguageSelection } from '@Pimcore/modules/element/components/language-selection/permission-based-language-selection'
import { DataObjectContext } from '@Pimcore/modules/data-object/data-object-provider'
import { useDataObjectDraft } from '@Pimcore/modules/data-object/hooks/use-data-object-draft'

export const LanguageSelection = (): React.JSX.Element => {
  const { hasLocalizedFields } = useLanguageSelection()
  const { id } = useContext(DataObjectContext)
  const { editorType } = useDataObjectDraft(id)

  if (hasLocalizedFields || editorType?.name === 'folder') {
    return <PermissionBasedLanguageSelection isNullable={ editorType?.name === 'folder' } />
  }

  return <></>
}
