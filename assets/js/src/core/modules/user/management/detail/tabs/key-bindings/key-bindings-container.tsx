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
import { createTabContentTestId } from '@Pimcore/utils/test-id-generator'
import { useMergedKeyBindings } from '@Pimcore/modules/user/hooks/use-merged-keybindings'

const KeyBindingsContainer = (): React.JSX.Element => {
  const [form] = Form.useForm()
  const { id } = useUserManagementContext()
  const { user, updateUserKeyBinding } = useUserManagementDraft(id)
  const { resetUserKeyBindings } = useUserManagementHelper()
  const { mergedKeyBindings, isLoading: isMergingKeyBindings } = useMergedKeyBindings(user?.keyBindings, id)

  const handleOnChange = (name: string, code: object): void => {
    updateUserKeyBinding(name, code)
  }

  if (isMergingKeyBindings) {
    return <Content loading></Content>
  }

  return (
    <Form
      data-testid={ createTabContentTestId(id.toString(), { prefix: 'user-detail-tab', tabKey: 'key-bindings' }) }
      form={ form }
      layout="vertical"
    >
      <KeyBindings
        onChange={ handleOnChange }
        onResetKeyBindings={ async () => await resetUserKeyBindings(id) }
        values={ mergedKeyBindings }
      />
    </Form>
  )
}

export { KeyBindingsContainer }
