/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { useTranslation } from 'react-i18next'
import { Table } from '@Pimcore/modules/user/management/detail/tabs/references/components/table/table'
import { Accordion } from '@Pimcore/components/accordion/accordion'
import { useUserManagementDraft } from '@Pimcore/modules/user/hooks/use-user-management-draft'
import { useUserManagementContext } from '@Pimcore/modules/user/hooks/use-user-management-context'
import { createTabContentTestId } from '@Pimcore/utils/test-id-generator'

const ReferenceContainer = ({ ...props }): React.JSX.Element => {
  const { t } = useTranslation()
  const { id } = useUserManagementContext()
  const { user } = useUserManagementDraft(id)

  const accordionContent = [
    {
      key: '1',
      title: <>{ t('user-management.references.documents') }</>,
      children: <Table
        data={ user?.objectDependencies?.dependencies ?? [] }
        isLoading={ false }
                />
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
