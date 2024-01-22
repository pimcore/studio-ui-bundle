import { Button } from 'antd'
import React from 'react'

interface ExampleProps {
  value: string
  prefix?: string
}

export const Example = ({ value, prefix }: ExampleProps): React.JSX.Element => {
  return (
    <div>
      <Button type="primary">{prefix} {value}</Button>
    </div>
  )
}
