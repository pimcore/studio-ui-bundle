/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Table } from '@Pimcore/modules/user/management/detail/tabs/references/components/table/table'
import { Pagination } from '@Pimcore/modules/user/management/detail/tabs/references/components/pagination/pagination'
import { Accordion } from '@Pimcore/components/accordion/accordion'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { useUserGetObjectDependenciesQuery } from '@Pimcore/modules/user/user-api-slice-enhanced'
import { useUserManagementContext } from '@Pimcore/modules/user/hooks/use-user-management-context'
import { createTabContentTestId } from '@Pimcore/utils/test-id-generator'

const ReferenceContainer = ({ ...props }): React.JSX.Element => {
  const { t } = useTranslation()
  const { id } = useUserManagementContext()
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(20)

  const { data, isLoading } = useUserGetObjectDependenciesQuery({ id, page, pageSize })

  function onPageChange (page: number, pageSize: number): void {
    setPage(page)
    setPageSize(pageSize)
  }

  const accordionContent = [
    {
      key: '1',
      title: <>{ t('user-management.references.object-dependencies') }</>,
      children: <>
        <Toolbar justify='flex-end'>
          <Pagination
            { ...data }
            isLoading={ isLoading }
            onChange={ onPageChange }
            page={ page }
          />
        </Toolbar>

        <Table
          data={ data?.items ?? [] }
          isLoading={ isLoading }
        />
      </>
    }
  ]

  return (
    <Accordion
      activeKey={ '1' }
      bordered
      collapsible="icon"
      data-testid={ createTabContentTestId(id.toString(), { prefix: 'user-detail-tab', tabKey: 'user-references' }) }
      items={ accordionContent }
      size={ 'small' }
      table
    >

    </Accordion>
  )
}

export { ReferenceContainer }
