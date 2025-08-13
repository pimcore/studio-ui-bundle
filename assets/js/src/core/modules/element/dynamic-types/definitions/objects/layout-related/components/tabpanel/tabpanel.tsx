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
import { type AbstractObjectLayoutDefinition } from '../../dynamic-type-object-layout-abstract'
import { ObjectTabpanel } from './object-tabpanel'
import { type ITabsProps } from '@Pimcore/components/tabs/tabs'

export interface TabpanelProps extends AbstractObjectLayoutDefinition {
  title?: string
  border?: boolean
  collapsible?: boolean
  collapsed?: boolean
  children: AbstractObjectLayoutDefinition[]
  tabPosition?: ITabsProps['tabPosition']
  hasStickyHeader?: boolean
}

export const Tabpanel = (props: TabpanelProps): React.JSX.Element => {
  return <ObjectTabpanel { ...props } />
}
