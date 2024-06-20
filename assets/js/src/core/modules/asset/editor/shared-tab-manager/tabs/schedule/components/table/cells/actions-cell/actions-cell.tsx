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

import type { DefaultCellProps } from '@Pimcore/components/grid/columns/default-cell'
import React, { useEffect, useRef, useState } from 'react'
import { type RefSelectProps, Select } from 'antd'
import { useEditMode } from '@Pimcore/components/grid/edit-mode/use-edit-mode'
import { useTranslation } from 'react-i18next'
import { DownOutlined } from '@ant-design/icons'

export const ActionsCell = (props: DefaultCellProps): React.JSX.Element => {
  const { isInEditMode, disableEditMode, fireOnUpdateCellDataEvent } = useEditMode(props)
  const [open, setOpen] = useState<boolean>(false)
  const selectRef = useRef<RefSelectProps>(null)
  const { t } = useTranslation()

  useEffect(() => {
    if (isInEditMode) {
      setOpen(true)
      selectRef.current?.focus()
    }
  }, [isInEditMode])

  function saveValue (value: string): void {
    fireOnUpdateCellDataEvent(value)
    disableEditMode()
  }

  function getCellContent (): React.JSX.Element {
    const selectOptions = [
      {
        value: 'delete',
        label: t('asset.asset-editor-tabs.schedule.version.delete')
      },
      {
        value: 'publish',
        label: t('asset.asset-editor-tabs.schedule.version.publish')
      }
    ]

    if (!isInEditMode) {
      return (
        <div className={ 'pseudo-select' }>
          { props.getValue() !== null
            ? t(`asset.asset-editor-tabs.schedule.version.${props.getValue()}`)
            : t('asset.asset-editor-tabs.schedule.select-an-action')
          }
          <DownOutlined />
        </div>
      )
    }

    function onBlur (e: React.FocusEvent<HTMLInputElement>): void {
      saveValue(e.target.value)
    }

    function onKeyDown (e: React.KeyboardEvent<HTMLInputElement>): void {
      if (e.key === 'Escape' || e.key === 'Enter') {
        disableEditMode()
      }
    }

    return (
      <Select
        defaultValue={ props.getValue() }
        onBlur={ onBlur }
        onChange={ saveValue }
        onKeyDown={ onKeyDown }
        open={ open }
        options={ selectOptions }
        ref={ selectRef }
      />
    )
  }

  return (
    <>
      {getCellContent()}
    </>
  )
}
