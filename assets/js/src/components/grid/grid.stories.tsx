import React from 'react'
import { type Meta } from '@storybook/react'
import { Grid } from './grid'
import { createColumnHelper } from '@tanstack/react-table'

const config: Meta = {
  title: 'Pimcore studio/UI/Grid',
  component: Grid,
  parameters: {
    layout: 'centered'
  },

  tags: ['autodocs']
}

export default config

interface User {
  firstname: string
  lastname: string
  age: number
}

const data: User[] = [
  { firstname: 'John', lastname: 'Doe', age: 25 },
  { firstname: 'Jane', lastname: 'Doe', age: 22 }
]

const columnHelper = createColumnHelper<User>()

const columns = [
  columnHelper.accessor('firstname', {}),
  columnHelper.accessor('lastname', {
    cell: info => <b>{info.getValue()}</b>
  }),
  columnHelper.accessor('age', {
    cell: info => <b>{info.getValue()}</b>
  })
]

export const _default = {
  args: {
    data,
    columns
  }
}
