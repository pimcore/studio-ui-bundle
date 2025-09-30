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
import { useDataObjectDraft } from '../../../hooks/use-data-object-draft'
import { DataObjectContext } from '../../../data-object-provider'

import { TAB_EDIT } from '../../types/object/tab-manager/tabs/edit/edit-container'
import { LanguageSelection } from './language-selection'
import { TAB_LISTING } from '../../types/folder/tab-manager/tabs/listing/listing-container'
import { TAB_VARIANTS } from '../../types/variant/tab-manager/tabs/variants/variants-tab-container'

export const ConditionalLanguageSelection = (): React.JSX.Element => {
  const { id } = useContext(DataObjectContext)
  const { activeTab } = useDataObjectDraft(id)

  if ([TAB_EDIT.key, TAB_LISTING.key, TAB_VARIANTS.key].includes(activeTab ?? '')) {
    return <LanguageSelection />
  }

  return <></>
}
