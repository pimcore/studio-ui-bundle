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

import { Button, Space } from 'antd'
import React from 'react'
import { useStyle } from './example.styles'
import { Icon } from '../icon/icon'

interface ExampleProps {
  value: string
  prefix?: string
}

export const Example = ({ value, prefix }: ExampleProps): React.JSX.Element => {
  const { styles } = useStyle()

  return (
    <div>
      <Space>
        <label className={ styles.example }>{prefix}</label>

        <Button
          icon={ <Icon name='camera' /> }
          type="primary"
        >{value}</Button>
      </Space>
    </div>
  )
}
