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
import React, { useEffect, useState } from 'react'
import { useGetVersionsQuery, type Version } from '@Pimcore/modules/element/editor/version-api-slice.gen'
import { useGlobalAssetContext } from '@Pimcore/modules/asset/hooks/use-global-asset-context'
import { Button, Dropdown, type MenuProps, Result, Space } from 'antd'
import { useEditMode } from '@Pimcore/components/grid/edit-mode/use-edit-mode'
import { DownOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import i18n from 'i18next'
import { useStyles } from './version-id-cell.styles'

export const VersionIdCell = (props: DefaultCellProps): React.JSX.Element => {
  const { isInEditMode, disableEditMode, fireOnUpdateCellDataEvent } = useEditMode(props)
  const [open, setOpen] = useState<boolean>(false)
  // const selectRef = useRef<RefObject<SelectRef>>(null)
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
    pageSize: 20
  })

  useEffect(() => {
    if (isInEditMode) {
      setOpen(true)
      // selectRef.current?.focus()
    }
  }, [isInEditMode])

  function saveValue (value: string): void {
    fireOnUpdateCellDataEvent(value)
    disableEditMode()
  }

  function getCellContent (): React.JSX.Element {
    if (!isInEditMode) {
      return (
        <div className={ 'pseudo-select' }>
          { props.getValue() !== null
            ? (
              <div className={ 'pseudo-select__content' }>
                <p>{props.row.original.id}</p>
              </div>
              )
            : t('asset.asset-editor-tabs.schedule.select-a-version')
          }
          <DownOutlined />
        </div>
      )
    }

    function onBlur (e: React.FocusEvent<HTMLUListElement, Element>): void {
      saveValue(e.target.id)
    }

    function onKeyDown (e: React.KeyboardEvent<HTMLUListElement>): void {
      console.log('----------------------')
      console.log('onKeyDown')
      console.log(e)
      console.log('----------------------')
      // if (e.key === 'Escape' || e.key === 'Enter') {
      //  disableEditMode()
      // }
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

    let selectOptions: Version[] = []
    if (!isLoading && data !== undefined) {
      selectOptions = data.items
    }

    const ddMenu: MenuProps = {
      onBlur,
      onKeyDown,
      items: selectOptions.map((value: Version) => {
        return {
          id: String(value.id),
          key: String(value.id),
          onClick: () => { saveValue(String(value.id)) },
          label: (
            <div className={ 'version-id__select__label' }>
              <p>{value.id} | {value.user.name ?? 'not found'}</p>
              <p>{formatDate(value.date)}</p>
            </div>
          )
        }
      })
    }

    return (
      <Dropdown
        menu={ ddMenu }
        open={ open }
        overlayClassName={ styles.overlayStyle }
      >
        <Button
          onClick={ (e) => { setOpen(!open) } }
          type={ 'link' }
        >
          <Space>
            {props.getValue() !== null
              ? props.getValue()
              : t('asset.asset-editor-tabs.schedule.select-a-version')
            }
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
    )
  }

  return (
    <>
      {getCellContent()}
    </>
  )
}
