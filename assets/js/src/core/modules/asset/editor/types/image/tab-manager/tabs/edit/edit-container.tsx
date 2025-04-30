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
import { MiniPaint } from '@Pimcore/lib/mini-paint/mini-paint'

export const EditTabContainer = (): React.JSX.Element => {
  return (
    <Content>
      <MiniPaint />
    </Content>
  )
}
