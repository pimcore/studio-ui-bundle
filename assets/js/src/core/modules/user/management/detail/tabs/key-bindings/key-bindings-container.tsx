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
import { useUserDraft } from '@Pimcore/modules/user/hooks/use-user-draft'
import { useUserContext } from '@Pimcore/modules/user/hooks/use-user-context'
import { Content } from '@Pimcore/components/content/content'
import { useUserHelper } from '@Pimcore/modules/user/hooks/use-user-helper'
import {KeyBindings} from "@Pimcore/modules/user/management/detail/tabs/key-bindings/key-bindings";

const KeyBindingsContainer = ({ ...props }): React.JSX.Element => {
  const [form] = Form.useForm()
  const { id } = useUserContext()
  const { user, isLoading, updateUserKeyBinding, changeUserInState } = useUserDraft(id)
  const { resetUserKeyBindings, getDefaultKeyBindings } = useUserHelper()

  const handleOnChange = (name: string, code: object, combination: string, updateInState: boolean = true): void => {
      form.setFieldsValue({
        [name]: combination
      })

    if (updateInState) {
      updateUserKeyBinding(name, code)
    }
  }

  const [defaultValues, setDefaultValues] = React.useState<any>(user?.keyBindings)

  if (!isLoading) {
    if (user?.keyBindings?.length === 0) {
      getDefaultKeyBindings().then((data) => {
        setDefaultValues(data.items)
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
      <KeyBindings values={defaultValues} onResetKeyBindings={async () => await resetUserKeyBindings(id)} onChange={handleOnChange} />
    </Form>
  )
}

export { KeyBindingsContainer }
