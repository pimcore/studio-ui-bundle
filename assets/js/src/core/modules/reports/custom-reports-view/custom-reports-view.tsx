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
import { Content } from '@Pimcore/components/content/content'

export const CustomReportsView = (): React.JSX.Element => {
  return (
    <Content
      padded
      padding={ { top: 'extra-small', right: 'extra-small', bottom: 'extra-small', left: 'extra-small' } }
    >
      <div>Custom Reports</div>
    </Content>
  )
}
