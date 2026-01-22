import { Grid } from "@Pimcore/components/grid/grid"
import { createColumnHelper } from "@tanstack/react-table"
import React from "react"
import { useTranslation } from "react-i18next"
import { GDPRProviderTabProps } from "../../tab-panel"
import { Flex } from "@Pimcore/components/flex/flex"
import { ExportButton } from "../../../export-button/export-button"
import { OpenButton } from "../../../open-button/open-button"
import { DeleteButton } from "../../../delete-button/delete-button"
import { elementTypes } from "@Pimcore/types/enums/element/element-type"

interface AssetRow {
  data: {
    type: string
    id: number
    fullPath: string
    subType: string
    __gdprIsDeletable: boolean
  }
}

type AssetTable = AssetRow['data'] & {
  actions: React.JSX.Element
}

export interface AssetsTabProps extends GDPRProviderTabProps<AssetRow> {
  data: AssetRow[]
}

export const AssetsTab = ({ data, providerKey, ...props }: AssetsTabProps): React.JSX.Element => {
  const { t } = useTranslation()

  const columnHelper = createColumnHelper<AssetTable>()
  const columns = [
    columnHelper.accessor('type', {
      header: t('gdpr-extractor.assets.table.field.type'),
      size: 80
    }),
    columnHelper.accessor('id', {
      header: t('gdpr-extractor.assets.table.field.id'),
      size: 80
    }),
    columnHelper.accessor('fullPath', {
      header: t('gdpr-extractor.assets.table.field.fullPath'),
      meta: {
        editable: false,
        autoWidth: true,
        type: 'element',
        config: {
          allowedTypes: ['asset', 'document', 'object'],
          showPublishedState: true,
          expectsStringValue: true,
          allowTextInput: true
        }
      }
    }),
    columnHelper.accessor('subType', {
      header: t('gdpr-extractor.assets.table.field.subType')
    }),
    columnHelper.accessor('actions', {
      header: t('gdpr-extractor.table.field.actions'),
      size: 100,
      enableSorting: false,
      cell: ({ row }) => {
        const data = row.original

        return (
          <Flex>
            <ExportButton
              id={data.id}
              providerKey={providerKey}
            />

            <OpenButton
              id={data.id}
              elementType={elementTypes.asset}
            />

            <DeleteButton
              id={data.id}
              elementType={elementTypes.asset}
              label={data.fullPath}
              disabled={data.__gdprIsDeletable !== true}
            />
          </Flex>
        )
      }
    })
  ]

  return (
    <Grid
      autoWidth
      columns={columns}
      data={data.map((item) => item.data)}
      enableSorting
      {...props}
    />
  )
}