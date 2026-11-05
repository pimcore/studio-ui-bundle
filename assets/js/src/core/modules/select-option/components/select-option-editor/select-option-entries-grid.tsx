/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Box, ButtonGroup, CsvImportButton, IconButton, OperationalGrid, Space } from '@sdk/components'
import { type ColumnDef, createColumnHelper } from '@tanstack/react-table'
import React, { useContext, useMemo } from 'react'
import { isUndefined } from 'lodash'
import { useTranslation } from 'react-i18next'
import type { SelectOptionData } from '@Pimcore/modules/class-definition/class-definition-slice.gen'
import { Grid } from '@Pimcore/components/grid/grid'
import { GridContext } from '@Pimcore/components/grid/grid-context'
import { useStyle as useDefaultCellStyle } from '@Pimcore/components/grid/columns/default-cell.styles'
import { type FormItemAnnotation } from '@Pimcore/components/form/annotations/form-annotations-provider'
import { AnnotationTag } from '@Pimcore/components/form/item/with-annotation'
import { useStyles as useAnnotationStyles } from '@Pimcore/components/form/item/with-annotation.styles'
import { useStyles } from './select-option-entries-grid.styles'

export interface SelectOptionEntriesGridProps {
  value?: SelectOptionData[]
  onChange?: (value: SelectOptionData[]) => void
  /** rows read, nothing edits, moves or adds; a review mounts the grid this way */
  readOnly?: boolean
  /** what a change does to a row, keyed by the option's value; only read-only grids show it */
  annotations?: Record<string, FormItemAnnotation>
}

const columnHelper = createColumnHelper<SelectOptionData>()

const useColumns = (value: SelectOptionData[], onChange?: (value: SelectOptionData[]) => void): Array<ColumnDef<SelectOptionData, any>> => {
  const { t } = useTranslation()

  return useMemo(() => [
    columnHelper.accessor('label', {
      header: t('select-option.entries.display-name'),
      meta: { editable: true }
    }),
    columnHelper.accessor('value', {
      header: t('select-option.entries.value'),
      meta: { editable: true }
    }),
    columnHelper.accessor('name', {
      header: t('select-option.entries.name'),
      meta: { editable: true }
    }),
    columnHelper.display({
      header: t('select-option.entries.action'),
      cell: (info) => (
        <Box padding="mini">
          <ButtonGroup
            items={ [
              <IconButton
                disabled={ info.row.index === 0 }
                icon={ { value: 'chevron-up' } }
                key="move-up"
                onClick={ () => {
                  const idx = info.row.index
                  if (idx > 0) {
                    const newValue = [...value]
                    const temp = newValue[idx - 1]
                    newValue[idx - 1] = newValue[idx]
                    newValue[idx] = temp
                    onChange?.(newValue)
                  }
                } }
                size="small"
                tooltip={ { title: t('select-option.entries.move-up') } }
                type="link"
              />,
              <IconButton
                disabled={ info.row.index === value.length - 1 }
                icon={ { value: 'chevron-down' } }
                key="move-down"
                onClick={ () => {
                  const idx = info.row.index
                  if (idx < value.length - 1) {
                    const newValue = [...value]
                    const temp = newValue[idx + 1]
                    newValue[idx + 1] = newValue[idx]
                    newValue[idx] = temp
                    onChange?.(newValue)
                  }
                } }
                size="small"
                tooltip={ { title: t('select-option.entries.move-down') } }
                type="link"
              />,
              <IconButton
                icon={ { value: 'trash' } }
                key="delete"
                onClick={ () => {
                  const newValue = [...value]
                  newValue.splice(info.row.index, 1)
                  onChange?.(newValue)
                } }
                size="small"
                tooltip={ { title: t('delete') } }
                type="link"
              />
            ] }
            noSpacing
          />
        </Box>
      ),
      id: 'actions',
      size: 120
    })
  ], [value, onChange])
}

/** a custom cell drawn in the default cell's own chrome, so it pads and centres like every other */
const ReadOnlyCell = ({ children }: { children: React.ReactNode }): React.JSX.Element => {
  const { size } = useContext(GridContext)
  const { styles } = useDefaultCellStyle({ size })

  return (
    <div className={ styles['default-cell'] }>
      <div className="default-cell__content default-cell__content--padded">{ children }</div>
    </div>
  )
}

// option values are user data: 'constructor' or '__proto__' must not resolve through the prototype
const annotationFor = (annotations: Record<string, FormItemAnnotation> | undefined, value: string): FormItemAnnotation | undefined =>
  !isUndefined(annotations) && Object.hasOwn(annotations, value) ? annotations[value] : undefined

const useReadOnlyColumns = (annotations: Record<string, FormItemAnnotation> | undefined): Array<ColumnDef<SelectOptionData, any>> => {
  const { t } = useTranslation()
  const { styles } = useStyles()
  const { styles: annotationStyles } = useAnnotationStyles()

  return useMemo(() => {
    // a removed row is still a row: struck through, so the reader sees what goes
    const text = (info: { getValue: () => string | undefined, row: { original: SelectOptionData } }): React.JSX.Element => (
      <ReadOnlyCell>
        <span className={ annotationFor(annotations, info.row.original.value)?.status === 'removed' ? styles.removed : undefined }>
          { info.getValue() ?? '' }
        </span>
      </ReadOnlyCell>
    )
    const columns: Array<ColumnDef<SelectOptionData, any>> = [
      columnHelper.accessor('label', { header: t('select-option.entries.display-name'), cell: text }),
      columnHelper.accessor('value', { header: t('select-option.entries.value'), cell: text }),
      columnHelper.accessor('name', { header: t('select-option.entries.name'), cell: text })
    ]
    if (!isUndefined(annotations)) {
      columns.push(columnHelper.display({
        id: 'annotation',
        header: '',
        size: 110,
        cell: (info) => {
          const annotation = annotationFor(annotations, info.row.original.value)
          return (
            <ReadOnlyCell>
              { isUndefined(annotation)
                ? null
                : (
                  <AnnotationTag
                    className={ annotationStyles.tag }
                    status={ annotation.status }
                  />
                  ) }
            </ReadOnlyCell>
          )
        }
      }))
    }
    return columns
  }, [annotations, styles, annotationStyles, t])
}

const ReadOnlyEntriesGrid = ({ value, annotations }: { value: SelectOptionData[], annotations?: Record<string, FormItemAnnotation> }): React.JSX.Element => {
  const columns = useReadOnlyColumns(annotations)

  return (
    <Grid
      columns={ columns }
      data={ value }
      enableMultipleRowSelection={ false }
      resizable={ false }
      setRowId={ (row, index) => `row-${row.value}-${index}` }
    />
  )
}

export const SelectOptionEntriesGrid = ({ value = [], onChange, readOnly = false, annotations }: SelectOptionEntriesGridProps): React.JSX.Element => {
  const { t } = useTranslation()

  const columns = useColumns(value, onChange)

  if (readOnly) {
    return (
      <ReadOnlyEntriesGrid
        annotations={ annotations }
        value={ value }
      />
    )
  }

  return (
    <OperationalGrid
      columns={ columns }
      enableSorting={ false }
      onChange={ onChange as (value: any[]) => void }
      setRowId={ (row, index) => `row-${row.value}-${index}` }
      value={ value }
    >
      <Space
        direction="vertical"
        size="small"
        style={ { width: '100%' } }
      >
        <OperationalGrid.Grid />

        <OperationalGrid.Operations>
          {(operations) => {
            return (
              <Space>
                <IconButton
                  icon={ { value: 'new-something' } }
                  onClick={ () => {
                    operations.addRow({
                      label: '',
                      value: '',
                      name: ''
                    })
                  } }
                  tooltip={ { title: t('add') } }
                  type="default"
                />
                <CsvImportButton />
              </Space>
            )
          }}
        </OperationalGrid.Operations>
      </Space>
    </OperationalGrid>
  )
}
