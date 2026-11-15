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
import { useAppSelector } from '@Pimcore/app/store'
import { TabTitleContainer, type TabTitleContainerProps } from '@Pimcore/modules/widget-manager/title/tab-title-container'
import { selectServiceUsersDirty } from './dirty/service-users-dirty-slice'

/**
 * Tab title of the Service Users widget: carries the "*" and the close confirmation while any service user
 * opened inside the widget has unsaved edits, so closing the whole widget cannot silently drop them.
 */
export const ServiceUsersTitle = (props: TabTitleContainerProps): React.JSX.Element => {
  const dirty = useAppSelector(selectServiceUsersDirty)

  return (
    <TabTitleContainer
      modified={ dirty }
      node={ props.node }
    />
  )
}
