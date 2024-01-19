import React from 'react'

interface ExampleProps {
  value: string
}

export const Example = ({ value }: ExampleProps): React.JSX.Element => {
  return (
    <div>
      <h1>Hello, {value}!</h1>
    </div>
  )
}
