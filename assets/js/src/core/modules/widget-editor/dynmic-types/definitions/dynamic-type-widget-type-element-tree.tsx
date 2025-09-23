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
import { ElementTreeWidgetTypeForm } from '../../components/widget-type-form/element-tree-widget-type-form'
import { DynamicTypeWidgetTypeAbstract } from './dynamic-type-widget-type-abstract'

export class DynamicTypeWidgetTypeElementTree extends DynamicTypeWidgetTypeAbstract {
  readonly id = 'element_tree'
  name = 'element_tree'
  group = 'system-widgets'
  icon = 'tree'

  form(): React.JSX.Element {
    return <ElementTreeWidgetTypeForm />
  }
}
