/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Checkbox, type ICheckboxProps } from '@Pimcore/components/checkbox/checkbox'
import { Flex } from '@Pimcore/components/flex/flex'
import { useSelectedRowsContext } from '@Pimcore/modules/recycle-bin/context/selected-items-context'
import React from 'react'
import { useTranslation } from 'react-i18next'

export const RowSelectionTotal = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { selectedRows, resetSelectedRows } = useSelectedRowsContext()
  const total = Object.keys(selectedRows).length

  const onClick: ICheckboxProps['onClick'] = (e) => {
    e.stopPropagation()

    if (total > 0) {
      resetSelectedRows()
    }
  }

  return (
    <Flex align="center">
      {total === 0 && (<></>)}
      {total > 0 && (
        <Checkbox
          checked={ total > 0 }
          onClick={ onClick }
        >
          {t('listing.selection.total', { total })}
        </Checkbox>
      )}
    </Flex>
  )
}
