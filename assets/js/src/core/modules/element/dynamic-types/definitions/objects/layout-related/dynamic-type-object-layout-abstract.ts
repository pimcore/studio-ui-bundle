/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { injectable } from 'inversify'
import { type DynamicTypeAbstract } from '../../../registry/dynamic-type-registry-abstract'
import { type ReactElement } from 'react'
import { type LayoutComponentProps } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/layout-component'

export interface AbstractObjectLayoutDefinition extends LayoutComponentProps {}

@injectable()
export abstract class DynamicTypeObjectLayoutAbstract implements DynamicTypeAbstract {
  abstract readonly id: string

  abstract getObjectLayoutComponent (props: AbstractObjectLayoutDefinition): ReactElement<AbstractObjectLayoutDefinition>
}
