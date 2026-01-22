/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type DynamicTypeAbstract } from '@sdk/modules/element'
import { injectable } from 'inversify'
import { type GDPRProviderTabProps } from '../../components/tab-panel/tab-panel'

@injectable()
export abstract class DynamicTypeAbstractGDPRProvider implements DynamicTypeAbstract {
  abstract readonly id: string

  abstract getTabContent<T>(tabProps: GDPRProviderTabProps<T>): React.JSX.Element
}
