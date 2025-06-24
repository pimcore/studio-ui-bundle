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
import { Form } from '@Pimcore/components/form/form'
import { useUserManagementDraft } from '@Pimcore/modules/user/hooks/use-user-management-draft'
import { useUserManagementContext } from '@Pimcore/modules/user/hooks/use-user-management-context'
import { Content } from '@Pimcore/components/content/content'
import { useUserManagementHelper } from '@Pimcore/modules/user/hooks/use-user-management-helper'
import { KeyBindings } from '@Pimcore/modules/user/management/detail/tabs/key-bindings/key-bindings'

const KeyBindingsContainer = ({ ...props }): React.JSX.Element => {
  const [form] = Form.useForm()
  const { id } = useUserManagementContext()
  const { user, isLoading, updateUserKeyBinding, changeUserInState } = useUserManagementDraft(id)
  const { resetUserKeyBindings, getDefaultKeyBindings } = useUserManagementHelper()

  const handleOnChange = (name: string, code: object): void => {
    updateUserKeyBinding(name, code)
  }

  if (!isLoading) {
    if (user?.keyBindings?.length === 0) {
      getDefaultKeyBindings().then((data) => {
        changeUserInState({ keyBindings: data.items })
      }).catch((error) => {
        console.error('error setting default key bindings', error)
      })
    }
  }

  if (isLoading) {
    return <Content loading></Content>
  }

  return (
    <Form
      form={ form }
      layout="vertical"
    >
      <KeyBindings
        onChange={ handleOnChange }
        onResetKeyBindings={ async () => await resetUserKeyBindings(id) }
        values={ user?.keyBindings }
      />
    </Form>
  )
}

export { KeyBindingsContainer }
