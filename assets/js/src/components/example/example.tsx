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
        <label className={styles.example}>{prefix}</label>

        <Button icon={<Icon name='camera' />} type="primary">{value}</Button>
      </Space>
    </div>
  )
}
