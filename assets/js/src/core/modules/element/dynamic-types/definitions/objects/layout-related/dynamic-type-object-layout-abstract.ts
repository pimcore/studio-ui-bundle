/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
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
