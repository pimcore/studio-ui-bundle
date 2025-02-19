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

import React, { forwardRef, type MutableRefObject, type ReactElement } from 'react'
import { isUndefined } from 'lodash'
import { useDroppable } from '@Pimcore/components/drag-and-drop/hooks/use-droppable'
import { Grid } from '@Pimcore/components/grid/grid'
import { type ColumnDef, createColumnHelper } from '@tanstack/react-table'

import {
  type ManyToManyRelationValue,
  type ManyToManyRelationValueItem
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/many-to-many-relation/hooks/use-value'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Tooltip } from 'antd'
import { Trans, useTranslation } from 'react-i18next'
import { useElementHelper } from '@Pimcore/modules/element/hooks/use-element-helper'
import { ButtonGroup } from '@Pimcore/components/button-group/button-group'
import { Box } from '@Pimcore/components/box/box'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import cn from 'classnames'
import { useDownload } from '@Pimcore/modules/asset/actions/download/use-download'
import { toCssDimension } from '@Pimcore/utils/css'
import { Content } from '@Pimcore/components/content/content'
import { type OnUpdateCellDataEvent } from '@Pimcore/types/components/types'

interface ManyToManyRelationGridProps {
  value?: ManyToManyRelationValue | null
  deleteItem: (rowIndex: number) => void
  assetInlineDownloadAllowed: boolean
  disabled?: boolean
  width: number | string | null
  height: number | string | null
  enrichRowData?: (row: ManyToManyRelationValueItem) => ManyToManyRelationValueItem & Record<string, any>
  columnDefinition?: Array<ColumnDef<any>>
  hint?: React.ReactNode | null
  onUpdateCellData?: (event: OnUpdateCellDataEvent) => void
}

export const ManyToManyRelationGrid = forwardRef(function ManyToManyRelationGrid (props: ManyToManyRelationGridProps, ref: MutableRefObject<HTMLDivElement>): React.JSX.Element {
  const { getStateClasses } = useDroppable()
  const { confirm } = useFormModal()
  const { openElement, mapToElementType } = useElementHelper()
  const { t } = useTranslation()
  const { download } = useDownload()

  const columnHelper = createColumnHelper()
  const columns = props.columnDefinition !== undefined
    ? [...props.columnDefinition]
    : [
        columnHelper.accessor('id', {
          header: t('relations.id'),
          size: 80
        }),
        columnHelper.accessor('fullPath', {
          header: t('relations.reference'),
          meta: {
            autoWidth: true
          },
          size: 200
        }),
        columnHelper.accessor('type', {
          header: t('relations.type'),
          meta: {
            type: 'translate'
          },
          size: 150
        }),
        columnHelper.accessor('subtype', {
          header: t('relations.subtype'),
          meta: {
            type: 'translate'
          },
          size: 150
        })
      ]

  columns.push(

    columnHelper.accessor('actions', {
      header: t('actions'),
      size: 110,
      cell: (info) => {
        const rowIndex = info.row.index
        const rowValue = info.row.original as ManyToManyRelationValueItem

        const buttons: ReactElement[] = []
        buttons.push(
          <Tooltip
            key="open"
            title={ t('open') }
          >
            <IconButton
              icon={ { value: 'open-folder' } }
              onClick={ async () => {
                const typeValue = mapToElementType(rowValue.type)

                !isUndefined(typeValue) && await openElement({
                  type: typeValue,
                  id: rowValue.id
                })
              } }
              type="link"
            />
          </Tooltip>
        )

        if (props.assetInlineDownloadAllowed && rowValue.type === 'asset') {
          buttons.push(
            <Tooltip
              key="download"
              title={ t('download') }
            >
              <IconButton
                aria-label={ t('aria.asset.image-sidebar.tab.details.download-thumbnail') }
                icon={ { value: 'download' } }
                onClick={ () => {
                  download(
                    rowValue.id.toString()
                  )
                } }
                type="link"
              />
            </Tooltip>
          )
        }

        if (props.disabled !== true) {
          buttons.push(
            <Tooltip
              key="remove"
              title={ t('remove') }
            >
              <IconButton
                icon={ { value: 'trash' } }
                onClick={ () => {
                  confirm({
                    title: t('remove'),
                    content: <Trans
                      i18nKey={ 'delete-confirmation-advanced' }
                      shouldUnescape
                      values={ {
                        type: t('relation'),
                        value: rowValue.fullPath
                      } }
                             />,
                    onOk: () => {
                      props.deleteItem(rowIndex)
                    }
                  })
                } }
                type="link"
              />
            </Tooltip>
          )
        }

        return (
          <Box padding="mini">
            <ButtonGroup
              items={ buttons }
              noSpacing
            />
          </Box>
        )
      }
    })
  )

  const getDataArray = (): ManyToManyRelationValue => {
    const result = props.value ?? []
    return result.map((item: ManyToManyRelationValueItem) => {
      const elementType = mapToElementType(item.type)
      const resultRow = { ...item, type: elementType ?? '' }

      if (props.enrichRowData !== undefined) {
        return props.enrichRowData(resultRow)
      }

      return resultRow
    })
  }

  return (
    <div
      className={ cn(...getStateClasses()) }
      ref={ ref }
    >
      <Content
        style={ {
          width: toCssDimension(props.width),
          height: toCssDimension(props.height)
        } }
      >
        <div
          style={ {
            maxWidth: 'calc(100% - 2px)'
          } }
        >
          <Grid
            autoWidth
            columns={ columns }
            data={ getDataArray() }
            disabled={ props.disabled }
            onUpdateCellData={ props.onUpdateCellData }
            resizable
          />
          { props.hint }
        </div>
      </Content>
    </div>
  )
})
