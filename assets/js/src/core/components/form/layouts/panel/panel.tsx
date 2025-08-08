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
import { Panel as CorePanel, type PanelProps as CorePanelProps } from '@Pimcore/components/panel/panel'

export interface FormPanelProps extends Omit<CorePanelProps, 'name'> {
  /**
   * Whether to add form-specific styling optimizations
   */
  formOptimized?: boolean
}

/**
 * Panel component specifically designed for form layouts.
 * Provides structured sections within forms with consistent styling and behavior.
 * 
 * @example
 * ```tsx
 * <Form.Panel title="Personal Information" collapsible>
 *   <Form.Item label="First Name" name="firstName">
 *     <Input />
 *   </Form.Item>
 *   <Form.Item label="Last Name" name="lastName">
 *     <Input />
 *   </Form.Item>
 * </Form.Panel>
 * ```
 */
export const Panel = ({ formOptimized = true, ...props }: FormPanelProps): React.JSX.Element => {
  return (
    <CorePanel
      {...props}
      theme={props.theme ?? 'card-with-highlight'}
    />
  )
}
