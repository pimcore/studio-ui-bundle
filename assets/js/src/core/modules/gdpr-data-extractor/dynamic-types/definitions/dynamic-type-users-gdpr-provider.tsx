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
import { UsersTab, type UsersTabProps } from '../../components/tab-panel/components/users-tab/users-tab'
import { DynamicTypeAbstractGDPRProvider } from './dynamic-type-abstract-gdpr-provider'
import { type GDPRProviderTabProps } from '../../components/tab-panel/tab-panel'

export class DynamicTypeUsersGDPRProvider extends DynamicTypeAbstractGDPRProvider {
  readonly id: string = 'pimcore_users'

  getTabContent<T>(tabProps: GDPRProviderTabProps<T>): React.JSX.Element {
    return <UsersTab { ...(tabProps as unknown as UsersTabProps) } />
  }
}
