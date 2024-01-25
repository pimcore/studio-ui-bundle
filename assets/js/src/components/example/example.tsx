import { Button } from 'antd'
import React from 'react'
import { useStyle } from './example.styles'

interface ExampleProps {
  value: string
  prefix?: string
}

export const Example = ({ value, prefix }: ExampleProps): React.JSX.Element => {
  const { styles } = useStyle()

  return (
    <div>
      <label className={styles.example}>{prefix}</label>

      <Button type="primary">{value}</Button>
    </div>
  )
}
