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

import React, { useEffect, useState } from 'react'
import { TableGrid } from './components/grid/grid'
import { Box } from '@Pimcore/components/box/box'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Tooltip } from 'antd'
import { useTranslation } from 'react-i18next'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'

export interface TableProps {
  rows: number | null
  cols: number | null
  value?: TableValue | null
  onChange?: (value: TableValue | null) => void
}

export type TableValue = string[][]

export const Table = (props: TableProps): React.JSX.Element => {
  const [value, setValue] = useState<TableValue | null>(props.value ?? null)
  const [key, setKey] = useState<number>(0)
  const { t } = useTranslation()
  const { confirm } = useFormModal()

  const onChange = (value: TableValue | null): void => {
    setValue(value)
  }

  useEffect(() => {
    if (props.onChange !== undefined) {
      props.onChange(value)
    }
  }, [value])

  const emptyValue = (): void => {
    if (value !== null) {
      setValue([])
      setKey(key + 1) // force re-render
    }
  }

  return (
    <>
      <TableGrid
        cols={ props.cols }
        key={ key }
        onChange={ onChange }
        rows={ props.rows }
        value={ value }
      />
      <Box padding="extra-small">
        <Tooltip title={ t('empty') }>
          <IconButton
            icon={ { value: 'trash' } }
            onClick={ () => {
              confirm({
                title: t('empty'),
                content: t('structured-table.empty.confirm'),
                onOk: emptyValue
              })
            } }
            type="default"
          />
        </Tooltip>
      </Box>
    </>
  )
}
