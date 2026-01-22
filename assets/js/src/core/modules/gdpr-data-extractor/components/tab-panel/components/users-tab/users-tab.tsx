import { Flex } from "@Pimcore/components/flex/flex"
import { Grid } from "@Pimcore/components/grid/grid"
import { createColumnHelper } from "@tanstack/react-table"
import React from "react"
import { useTranslation } from "react-i18next"
import { ExportButton } from "../../../export-button/export-button"
import { GDPRProviderTabProps } from "../../tab-panel"
import { DeleteButton } from "./components/delete-button/delete-button"

interface UserRow {
  data: {
    id: number
    name: string
    firstname: string
    lastname: string
    email: string
    __gdprIsDeletable: boolean
  }
}

type UserTable = UserRow['data'] & {
  actions: React.JSX.Element
}

export interface UsersTabProps extends GDPRProviderTabProps<UserRow> {
  data: UserRow[]
}

export const UsersTab = ({ data, isLoading, providerKey, refresh }: UsersTabProps): React.JSX.Element => {
  const { t } = useTranslation()

  const columnHelper = createColumnHelper<UserTable>()
  const columns = [
    columnHelper.accessor('id', {
      header: t('gdpr-extractor.users.table.field.id'),
      size: 80
    }),
    columnHelper.accessor('name', {
      header: t('gdpr-extractor.users.table.field.name'),
    }),
    columnHelper.accessor('firstname', {
      header: t('gdpr-extractor.users.table.field.firstname'),
    }),
    columnHelper.accessor('lastname', {
      header: t('gdpr-extractor.users.table.field.lastname'),
    }),
    columnHelper.accessor('email', {
      header: t('gdpr-extractor.users.table.field.email'),
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

            <DeleteButton
              id={data.id}
              label={data.firstname + ' ' + data.lastname}
              disabled={data.__gdprIsDeletable !== true}
              onFinish={refresh}
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
      isLoading={isLoading}
      data={data.map((item) => item.data)}
    />
  )
}