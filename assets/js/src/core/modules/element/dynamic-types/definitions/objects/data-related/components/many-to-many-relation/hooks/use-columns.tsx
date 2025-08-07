/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import { type ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { isUndefined } from 'lodash'
import { Tooltip } from 'antd'
import type { ManyToManyRelationValueItem } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-many-relation/hooks/use-value'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Box } from '@Pimcore/components/box/box'
import { ButtonGroup } from '@Pimcore/components/button-group/button-group'
import { useDownload } from '@Pimcore/modules/asset/actions/download/use-download'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import { useElementHelper } from '@Pimcore/modules/element/hooks/use-element-helper'
import { type ManyToManyRelationGridProps } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-many-relation/grid'
import { getElementCellConfig } from '../utils/helpers'
import { SanitizeHtml } from '@Pimcore/components/sanitize-html/sanitize-html'
import { Flex } from '@Pimcore/components/flex/flex'
import { LoadingOutlined } from '@ant-design/icons'

interface UseColumnsReturn {
  columns: Array<ColumnDef<any>>
}

interface UseColumnsProps extends ManyToManyRelationGridProps {}

export const useColumns = (props: UseColumnsProps): UseColumnsReturn => {
  const { confirm } = useFormModal()
  const { openElement, mapToElementType } = useElementHelper()
  const { t } = useTranslation()
  const { download } = useDownload()

  const columnHelper = createColumnHelper()
  const renderFullPathCell = (info: any): React.JSX.Element => {
    return (
      <Flex
        align={ 'center' }
        className={ 'p-mini' }
      >
        <SanitizeHtml html={ info.getValue() ?? '' } />
        {info.row.original.loading !== false ? (<LoadingOutlined style={ { marginLeft: 8 } } />) : null}
      </Flex>
    )
  }

  const defaultColumns = [
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
      ...(props.pathFormatterConfig != null ? { cell: renderFullPathCell } : {})
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

  const columns = !isUndefined(props.columnDefinition)
    ? [...props.columnDefinition]
    : defaultColumns

  if (props.enableRowDrag) {
    columns.unshift(
      columnHelper.accessor('rowDragCol', { header: '', size: 40 })
    )
  }

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
                    content: t('delete-confirmation-advanced', {
                      type: t('relation'),
                      value: rowValue.fullPath,
                      interpolation: { escapeValue: false }
                    }),
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

  return {
    columns
  }
}
