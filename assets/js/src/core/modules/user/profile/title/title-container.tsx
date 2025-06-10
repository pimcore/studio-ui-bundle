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
import { TabTitleContainer, type TabTitleContainerProps } from '@Pimcore/modules/widget-manager/title/tab-title-container'
import {useUser} from "@Pimcore/modules/auth/hooks/use-user";
import {useUserDraft} from "@Pimcore/modules/user/hooks/use-user-draft";

export const TitleContainer = (props: TabTitleContainerProps): React.JSX.Element => {
  const { node } = props
  const user = useUser()
  const { user:currentUser } = useUserDraft(user.id)

  return (
    <TabTitleContainer
      modified={ currentUser?.modified ?? false }
      node={ node }
    />
  )
}
