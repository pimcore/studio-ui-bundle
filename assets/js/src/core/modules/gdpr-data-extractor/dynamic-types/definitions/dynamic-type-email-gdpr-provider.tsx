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
import { AssetsTab, type AssetsTabProps } from '../../components/tab-panel/components/assets-tab/assets-tab'
import { DynamicTypeAbstractGDPRProvider } from './dynamic-type-abstract-gdpr-provider'
import { type GDPRProviderTabProps } from '../../components/tab-panel/tab-panel'

export class DynamicTypeEmailsGDPRProvider extends DynamicTypeAbstractGDPRProvider {
  readonly id: string = 'sent_mails'

  getTabContent<T>(tabProps: GDPRProviderTabProps<T>): React.JSX.Element {
    return <>TBI</>
  }
}
