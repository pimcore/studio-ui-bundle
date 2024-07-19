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
import { useGetVersionsQuery, type Version } from '@Pimcore/modules/element/editor/version-api-slice.gen'
import { useGlobalAssetContext } from '@Pimcore/modules/asset/hooks/use-global-asset-context'
import { type RefSelectProps, Result, Select } from 'antd'
import { useEditMode } from '@Pimcore/components/grid/edit-mode/use-edit-mode'
import { DownOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import i18n from 'i18next'
import { type SelectProps } from 'rc-select/lib/Select'
import { useStyles } from './version-id-cell.styles'

export const VersionIdCell = (props: DefaultCellProps): React.JSX.Element => {
  const { isInEditMode, disableEditMode, fireOnUpdateCellDataEvent } = useEditMode(props)
  const [open, setOpen] = useState<boolean>(false)
  const selectRef = useRef<RefSelectProps>(null)
  const { context } = useGlobalAssetContext()
  const { t } = useTranslation()
  const { styles } = useStyles()

  if (context === undefined) {
    return <Result title="Missing context" />
  }

  const { data, isLoading } = useGetVersionsQuery({
    elementType: context.type,
    id: context.config.id,
    page: 1,
    pageSize: 9999
  })

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
    let selectOptions: Version[] = []
    if (!isLoading && data !== undefined) {
      selectOptions = data.items
    }

    function getVersionFromId (id: number): Version | null {
      return selectOptions.find((version: Version) => version.id === id) ?? null
    }

    const version = getVersionFromId(props.getValue() as number)
    if (!isInEditMode) {
      return (
        <div className={ 'pseudo-select' }>
          { props.getValue() !== null
            ? (
              <div className={ 'pseudo-select__content' }>
                <p>{version !== null ? version.versionCount : t('asset.asset-editor-tabs.schedule.select-a-version')}</p>
              </div>
              )
            : t('asset.asset-editor-tabs.schedule.select-a-version')
          }
          <DownOutlined />
        </div>
      )
    }

    function onBlur (e: React.FocusEvent<HTMLInputElement>): void {
      saveValue(e.target.id)
    }

    function onKeyDown (e: React.KeyboardEvent<HTMLInputElement>): void {
      if (e.key === 'Escape' || e.key === 'Enter') {
        disableEditMode()
      }
    }

    function formatDate (timestamp: number): string {
      return i18n.format(
        new Date(timestamp * 1000),
        'datetime',
        i18n.language,
        {
          dateStyle: 'short',
          timeStyle: 'short'
        }
      )
    }

    const options: SelectProps['options'] = selectOptions.map((value: Version) => {
      return {
        value: value.id,
        label: (
          <div className={ 'version-id__select__label' }>
            <p>
              <b>{value.versionCount}</b>
              <span className={ 'version-id__select__label__username' }> | {value.user.name ?? 'not found'}</span>
            </p>
            <p>{formatDate(value.date)}</p>
          </div>
        )
      }
    })

    return (
      <Select
        className={ styles.select }
        defaultValue={ version !== null ? version.versionCount : '' }
        onBlur={ onBlur }
        onChange={ saveValue }
        onKeyDown={ onKeyDown }
        open={ open }
        options={ options }
        popupClassName={ styles.overlayStyle }
        popupMatchSelectWidth={ false }
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
