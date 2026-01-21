import { Grid } from "@Pimcore/components/grid/grid"
import { GdprDataRow } from "@Pimcore/modules/gdpr-data-extractor/gdpr-data-extractor-slice-enhanced"
import { createColumnHelper } from "@tanstack/react-table"
import React from "react"
import { useTranslation } from "react-i18next"
import { GDPRProviderTabProps } from "../../tab-panel"
import { Flex } from "@Pimcore/components/flex/flex"
import { ExportButton } from "../../../export-button/export-button"
import { OpenButton } from "../../../open-button/open-button"
import { elementTypes } from "@sdk/modules/data-object"
import { DeleteButton } from "../../../delete-button/delete-button"

interface DataObjectRow {
  data: {
    className: string
    fullPath: string
    id: number
    type: string
    __gdprIsDeletable: boolean
  }
}

type DataObjectTable = DataObjectRow['data'] & {
  actions: React.JSX.Element
}

export interface DataObjectsTabProps extends GDPRProviderTabProps<DataObjectRow> {
}

export const DataObjectsTab = ({ data, providerKey, isLoading }: DataObjectsTabProps): React.JSX.Element => {
  const { t } = useTranslation()

  const columnHelper = createColumnHelper<DataObjectTable>()
  const columns = [
    columnHelper.accessor('type', {
      header: t('gdpr-extractor.data-objects.table.field.type'),
      size: 80
    }),
    columnHelper.accessor('id', {
      header: t('gdpr-extractor.data-objects.table.field.id'),
      size: 80
    }),
    columnHelper.accessor('fullPath', {
      header: t('gdpr-extractor.data-objects.table.field.fullPath'),
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
    columnHelper.accessor('className', {
      header: t('gdpr-extractor.data-objects.table.field.className')
    }),
    columnHelper.accessor('actions', {
      header: t('gdpr-extractor.table.field.actions'),
      size: 100,
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
              elementType={elementTypes.dataObject}
            />

            <DeleteButton
              id={data.id}
              elementType={elementTypes.dataObject}
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
      isLoading={isLoading}
      columns={columns}
      data={data.map((item) => item.data)}
    />
  )
}