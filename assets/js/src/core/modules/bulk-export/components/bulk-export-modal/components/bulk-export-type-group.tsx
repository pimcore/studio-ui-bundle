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
import { CollapseItem } from '@Pimcore/components/collapse/collapse'
import { BulkExportItemsTable } from './bulk-export-items-table'
import { type BulkExportAvailableItem } from '@Pimcore/modules/class-definition/class-definition-slice-enhanced'
import { useTranslation } from 'react-i18next'

interface BulkExportTypeGroupProps {
  type: string
  items: BulkExportAvailableItem[]
  toggleItem: (type: string, name: string) => void
  isSelected: (type: string, name: string) => boolean
}

export const BulkExportTypeGroup = ({ type, items, toggleItem, isSelected }: BulkExportTypeGroupProps): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <CollapseItem
      defaultActive
      label={ t(`bulk-export.type.${type}`) }
      theme='default'
    >
      <BulkExportItemsTable
        isSelected={ isSelected }
        items={ items }
        toggleItem={ toggleItem }
      />
    </CollapseItem>
  )
}
