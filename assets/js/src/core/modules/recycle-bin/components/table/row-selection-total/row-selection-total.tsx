import { Checkbox, ICheckboxProps } from "@Pimcore/components/checkbox/checkbox"
import { Flex } from "@Pimcore/components/flex/flex"
import { useSelectedRowsContext } from "@Pimcore/modules/recycle-bin/context/selected-items-context"
import React from "react"
import { useTranslation } from "react-i18next"

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
          checked={total > 0}
          onClick={onClick}
        >
          {t('listing.selection.total', { total })}
        </Checkbox>
      )}
    </Flex>
  )
}