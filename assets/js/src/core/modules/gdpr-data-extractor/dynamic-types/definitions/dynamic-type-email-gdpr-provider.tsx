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
import { type GDPRProviderTabProps } from '../../components/tab-panel/tab-panel'
import { DynamicTypeAbstractGDPRProvider } from './dynamic-type-abstract-gdpr-provider'
import { EmailsTab, type EmailsTabProps } from '../../components/tab-panel/components/emails-tab/emails-tab'

export class DynamicTypeEmailsGDPRProvider extends DynamicTypeAbstractGDPRProvider {
  readonly id: string = 'sent_mails'

  getTabContent<T>(tabProps: GDPRProviderTabProps<T>): React.JSX.Element {
    return <EmailsTab { ...tabProps as unknown as EmailsTabProps } />
  }
}
