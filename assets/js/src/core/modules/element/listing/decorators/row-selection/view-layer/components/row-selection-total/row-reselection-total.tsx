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

import { Checkbox, type ICheckboxProps } from '@Pimcore/components/checkbox/checkbox'
import React from 'react'
import { useRowSelectionOptional } from '../../../context-layer/provider/use-row-selection-optional'
import { useTranslation } from 'react-i18next'

export const RowSelectionTotal = (): React.JSX.Element => {
  const context = useRowSelectionOptional()
  const { t } = useTranslation()

  if (context === undefined) {
    return <></>
  }

  const { selectedRows, setSelectedRows } = context
  let total: number = 0

  if (selectedRows !== undefined) {
    total = Object.keys(selectedRows).length
  }

  const onClick: ICheckboxProps['onClick'] = (e) => {
    e.stopPropagation()

    if (total > 0) {
      setSelectedRows({})
    }
  }

  // @todo translation
  return (
    <>
      {total === 0 && (<></>)}
      {total > 0 && (
        <Checkbox
          checked={ total > 0 }
          onClick={ onClick }
        >
          {t('listing.selection.total', { total })}
        </Checkbox>
      )}
    </>
  )
}
