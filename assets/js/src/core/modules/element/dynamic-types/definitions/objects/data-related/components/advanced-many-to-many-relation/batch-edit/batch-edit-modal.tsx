/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { WindowModal } from '@Pimcore/components/modal/window-modal/window-modal'
import { ModalFooter } from '@Pimcore/components/modal/footer/modal-footer'
import { ModalTitle } from '@Pimcore/components/modal/modal-title/modal-title'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { Button } from '@Pimcore/components/button/button'
import { Flex } from '@Pimcore/components/flex/flex'
import { Select, Input, InputNumber, Checkbox as AntCheckbox, Empty } from 'antd'
import { StackList } from '@Pimcore/components/stack-list/stack-list'
import { type StackListItemProps } from '@Pimcore/components/stack-list/stack-list-item'
import { Header } from '@Pimcore/components/header/header'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { ColumnPicker } from '@Pimcore/components/column-picker/column-picker'
import { type ColumnPickerGroup } from '@Pimcore/components/column-picker/column-picker.types'
import { type RelationColumnDefinition } from '../advanced-many-to-many-relation'
import { type BatchEditApplyEntry } from './use-batch-edit-actions'

interface BatchEditEntry {
  columnKey: string
  value: any
}

export interface BatchEditModalProps {
  columns: RelationColumnDefinition[]
  open: boolean
  setOpen: (open: boolean) => void
  onApply: (entries: BatchEditApplyEntry[]) => void
}

const getDefaultValue = (type: string | undefined): any => {
  const t = type ?? 'text'
  if (t === 'bool' || t === 'columnbool') return false
  if (t === 'number') return null
  if (t === 'multiselect') return []
  return ''
}

export const BatchEditModal = ({ columns, open, setOpen, onApply }: BatchEditModalProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [entries, setEntries] = useState<BatchEditEntry[]>([])
  const [fieldsToAddOpen, setFieldsToAddOpen] = useState(true)

  const availableColumns = columns.filter(
    col => !entries.some(e => e.columnKey === col.key)
  )

  const columnGroups = useMemo((): Array<ColumnPickerGroup<RelationColumnDefinition>> => {
    return [{
      key: 'columns',
      label: t('columns'),
      items: availableColumns.map(col => ({
        key: col.key,
        label: col.label !== undefined ? t(col.label) : col.key,
        meta: col
      }))
    }]
  }, [availableColumns, t])

  const resetModal = (): void => {
    setEntries([])
  }

  const addColumn = (col: RelationColumnDefinition): void => {
    setEntries(prev => [...prev, { columnKey: col.key, value: getDefaultValue(col.type) }])
  }

  const removeEntry = (columnKey: string): void => {
    setEntries(prev => prev.filter(e => e.columnKey !== columnKey))
  }

  const updateEntryValue = (columnKey: string, value: any): void => {
    setEntries(prev => prev.map(e =>
      e.columnKey === columnKey ? { ...e, value } : e
    ))
  }

  const handleApply = (): void => {
    const entriesToApply = entries.filter(e => e.value !== undefined)
    if (entriesToApply.length > 0) {
      onApply(entriesToApply.map(e => ({ columnKey: e.columnKey, value: e.value })))
    }
    resetModal()
    setOpen(false)
  }

  const renderValueEditor = (entry: BatchEditEntry, columnDef: RelationColumnDefinition): React.JSX.Element => {
    const type = columnDef.type ?? 'text'

    if (type === 'bool' || type === 'columnbool') {
      return (
        <AntCheckbox
          checked={ entry.value === true }
          onChange={ (e) => { updateEntryValue(entry.columnKey, e.target.checked) } }
        />
      )
    }

    if (type === 'number') {
      return (
        <InputNumber
          onChange={ (val) => { updateEntryValue(entry.columnKey, val) } }
          placeholder={ t('value') }
          style={ { width: '100%' } }
          value={ entry.value }
        />
      )
    }

    if (type === 'select') {
      const options = columnDef.value?.split(';').map(opt => ({ label: t(opt), value: opt })) ?? []
      return (
        <Select
          onChange={ (val) => { updateEntryValue(entry.columnKey, val) } }
          options={ options }
          placeholder={ t('value') }
          style={ { width: '100%' } }
          value={ entry.value }
        />
      )
    }

    if (type === 'multiselect') {
      const options = columnDef.value?.split(';').map(opt => ({ label: t(opt), value: opt })) ?? []
      return (
        <Select
          mode="multiple"
          onChange={ (val) => { updateEntryValue(entry.columnKey, val) } }
          options={ options }
          placeholder={ t('value') }
          style={ { width: '100%' } }
          value={ entry.value }
        />
      )
    }

    return (
      <Input
        onChange={ (e) => { updateEntryValue(entry.columnKey, e.target.value) } }
        placeholder={ t('value') }
        value={ entry.value }
      />
    )
  }

  const stackListItems: StackListItemProps[] = entries.map((entry) => {
    const columnDef = columns.find(c => c.key === entry.columnKey)
    if (columnDef === undefined) return null

    const label = columnDef.label !== undefined ? t(columnDef.label) : columnDef.key

    return {
      id: entry.columnKey,
      renderRightToolbar: (
        <IconTextButton
          icon={ { value: 'trash' } }
          onClick={ () => { removeEntry(entry.columnKey) } }
          title={ t('delete') }
          type="link"
        />
      ),
      children: (
        <Flex
          align="center"
          gap="small"
          style={ { width: '100%' } }
        >
          <span style={ { minWidth: 120, fontWeight: 500 } }>{label}</span>
          <div style={ { flex: 1 } }>
            {renderValueEditor(entry, columnDef)}
          </div>
        </Flex>
      )
    }
  }).filter(Boolean) as StackListItemProps[]

  return (
    <WindowModal
      afterClose={ resetModal }
      footer={ <ModalFooter
        divider
        justify="space-between"
               >
        <IconTextButton
          icon={ { value: 'new' } }
          onClick={ () => { setFieldsToAddOpen((isOpen) => !isOpen) } }
          type="default"
        >
          {t('listing.add-column')}
        </IconTextButton>

        {entries.length > 0 && (
          <Flex
            align="center"
            gap="extra-small"
          >
            <IconTextButton
              icon={ { value: 'close' } }
              onClick={ resetModal }
              type="link"
            >
              {t('batch-edit.modal-footer.discard-all-changes')}
            </IconTextButton>
            <Button
              onClick={ handleApply }
              type="primary"
            >
              {t('batch-edit.modal-footer.apply-changes')}
            </Button>
          </Flex>
        )}
      </ModalFooter> }
      onCancel={ () => {
        resetModal()
        setOpen(false)
      } }
      open={ open }
      size="L"
      title={ <ModalTitle>{t('batch-edit.modal-title')}</ModalTitle> }
    >
      <Flex
        className="w-full"
        gap="small"
      >
        {fieldsToAddOpen && (
          <div style={ { minWidth: 200 } }>
            <Header
              fullWidth
              title={ t('listing.column-picker.fields-to-add') }
            >
              <Flex
                className="w-full"
                justify="flex-end"
              >
                <IconButton
                  icon={ { value: 'collapse-sidebar', colorToken: 'colorPrimary' } }
                  onClick={ () => { setFieldsToAddOpen(false) } }
                  type="text"
                />
              </Flex>
            </Header>

            <ColumnPicker<RelationColumnDefinition>
              groups={ columnGroups }
              onSelect={ (item) => {
                if (item.meta !== undefined) {
                  addColumn(item.meta)
                }
              } }
            />
          </div>
        )}

        <div style={ { flex: 1, minWidth: 0 } }>
          {entries.length === 0
            ? (
              <Empty description={ t('batch-edit.no-content') } />
              )
            : (
              <StackList items={ stackListItems } />
              )}
        </div>
      </Flex>
    </WindowModal>
  )
}
