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
import { Card } from 'antd'

export const HelloWorldContainer = (): React.JSX.Element => {
  return (
    <Card title="Hello World">
      <p>Hello World Content - This is a dummy panel for the document editor sidebar!</p>
    </Card>
  )
}
