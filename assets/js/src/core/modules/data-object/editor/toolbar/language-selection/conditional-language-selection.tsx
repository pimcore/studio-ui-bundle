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

import React, { useContext } from 'react'
import { useDataObjectDraft } from '../../../hooks/use-data-object-draft'
import { DataObjectContext } from '../../../data-object-provider'

import { TAB_EDIT } from '../../types/object/tab-manager/tabs/edit/edit-container'
import { LanguageSelection } from './language-selection'

export const ConditionalLanguageSelection = (): React.JSX.Element => {
  const { id } = useContext(DataObjectContext)
  const { activeTab } = useDataObjectDraft(id)

  if (activeTab !== TAB_EDIT.key) {
    return <></>
  }
  return <LanguageSelection />
}
