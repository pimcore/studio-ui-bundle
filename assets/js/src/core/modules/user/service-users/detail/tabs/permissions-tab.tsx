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
import { Col, Row } from 'antd'
import { Form } from '@Pimcore/components/form/form'
import { Content } from '@Pimcore/components/content/content'
import { PermissionsAccordion } from '@Pimcore/modules/user/management/detail/tabs/settings/components/form/permissions-accordion'
import { TypesAndClassesAccordion } from '@Pimcore/modules/user/management/detail/tabs/settings/components/form/types-classes-accordion'
import { getGroupedPermissions } from '@Pimcore/modules/user/management/detail/tabs/settings/settings-helper'
import { useUserGetAvailablePermissionsQuery } from '@Pimcore/modules/user/user-api-slice-enhanced'
import { type ServiceUserDraft } from '../service-user-draft'
import { mergePermissions, type PermissionFormValues, splitPermissions } from '../../utils/permissions'

interface PermissionsTabProps {
  draft: Pick<ServiceUserDraft, 'permissions' | 'classes' | 'docTypes'>
  onChange: (change: Partial<ServiceUserDraft>) => void
}

type FormValues = PermissionFormValues & Pick<ServiceUserDraft, 'classes' | 'docTypes'>

export const PermissionsTab = ({ draft, onChange }: PermissionsTabProps): React.JSX.Element => {
  const [form] = Form.useForm<FormValues>()
  const { data, isLoading } = useUserGetAvailablePermissionsQuery()
  const permissions = getGroupedPermissions(data?.items ?? [])

  if (isLoading) {
    return <Content loading />
  }

  return (
    <Content padded>
      <Form
        form={ form }
        initialValues={ {
          ...splitPermissions(draft.permissions, permissions),
          classes: draft.classes,
          docTypes: draft.docTypes
        } }
        layout="vertical"
        onValuesChange={ (_changed: Partial<FormValues>, values: FormValues) => {
          onChange({
            permissions: mergePermissions(values),
            classes: values.classes,
            docTypes: values.docTypes
          })
        } }
      >
        <Row gutter={ [10, 10] }>
          <Col span={ 16 }>
            <PermissionsAccordion permissions={ permissions } />
          </Col>
          <Col span={ 16 }>
            <TypesAndClassesAccordion />
          </Col>
        </Row>
      </Form>
    </Content>
  )
}
