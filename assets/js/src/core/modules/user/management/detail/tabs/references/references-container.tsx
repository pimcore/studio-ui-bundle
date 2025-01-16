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

import React from 'react'
import { useTranslation } from 'react-i18next'
import { Table } from '@Pimcore/modules/user/management/detail/tabs/references/components/table/table'
import { Accordion } from '@Pimcore/components/accordion/accordion'
import { useUserDraft } from '@Pimcore/modules/user/hooks/use-user-draft'
import { useUserContext } from '@Pimcore/modules/user/hooks/use-user-context'

const ReferenceContainer = ({ ...props }): React.JSX.Element => {
  const { t } = useTranslation()
  const { id } = useUserContext()
  const { user } = useUserDraft(id)

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
      items={ accordionContent }
      size={ 'small' }
      table
    >

    </Accordion>
  )
}

export { ReferenceContainer }
