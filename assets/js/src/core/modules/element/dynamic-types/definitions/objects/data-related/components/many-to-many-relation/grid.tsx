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
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-many-relation/hooks/use-value'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Tooltip, Tag, Flex } from 'antd'
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
import { type ElementCellConfig, type ElementInfo } from '../../../../grid-cell/components/element-cell/element-cell'
import { type DefaultCellProps } from '@Pimcore/components/grid/columns/default-cell'
import { mapToElementType } from '@Pimcore/modules/element/utils/element-type'
import { SanitizeHtml } from '@Pimcore/components/sanitize-html/sanitize-html'

interface ManyToManyRelationGridProps {
  value?: ManyToManyRelationValue | null
  deleteItem: (rowIndex: number) => void
  assetInlineDownloadAllowed: boolean
  disabled?: boolean
  inherited?: boolean
  width: number | string | null
  height: number | string | null
  enrichRowData?: (row: ManyToManyRelationValueItem) => ManyToManyRelationValueItem & Record<string, any>
  columnDefinition?: Array<ColumnDef<any>>
  hint?: React.ReactNode | null
  onUpdateCellData?: (event: OnUpdateCellDataEvent) => void
  className?: string
}

export const getElementCellConfig = (disabled?: boolean): ElementCellConfig => {
  return {
    allowedTypes: [],
    getElementInfo: (itemProps: DefaultCellProps): ElementInfo => {
      const element: ManyToManyRelationValueItem = itemProps.row.original as ManyToManyRelationValueItem

      const elementType = mapToElementType(element.type)
      return {
        elementType: elementType ?? undefined,
        id: element.id,
        fullPath: element.fullPath,
        published: element.isPublished ?? undefined,
        disabled
      }
    }
  }
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
            type: 'element',
            autoWidth: true,
            editable: false,
            config: getElementCellConfig(props.inherited === true || props.disabled === true)
          },
          size: 200,
          cell: (info) => {
            return (
              <Flex
                align={ 'center' }
                className={ 'p-mini' }
              >
                <Tag
                  bordered={ false }
                  color="geekblue"
                ><SanitizeHtml html={ info.getValue() ?? '' } /></Tag>
              </Flex>
            )
          }
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
            className={ props.className }
            columns={ columns }
            data={ getDataArray() }
            disabled={ props.disabled === true || props.inherited === true }
            onUpdateCellData={ props.onUpdateCellData }
            resizable
          />
          { props.hint }
        </div>
      </Content>
    </div>
  )
})
