import React from 'react'

interface ExampleProps {
  value: string
  prefix?: string
}

export const Example = ({ value, prefix }: ExampleProps): React.JSX.Element => {
  return (
    <div>
      <h1>Hello, {prefix} {value}!</h1>
    </div>
  )
}
