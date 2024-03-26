import { type Meta } from '@storybook/react'
import { Pagination as PaginationComponent } from './pagination'

const config: Meta = {
  title: 'Pimcore studio/UI/Pagination',
  component: PaginationComponent,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default config

export const _default = {
  args: {
    total: 184,
    defaultCurrent: 3,
    pageSizeOptions: [5, 25, 55, 80],
    defaultPageSize: 25,
    showPageSizeChanger: true,
    showTotal: (total: number) => `Total ${total} items`
  }
}
