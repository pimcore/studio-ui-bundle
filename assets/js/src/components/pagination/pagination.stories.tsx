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
    total: 182,
    current: 3,
    pageSizeOptions: [5, 25, 55, 80],
    defaultPageSize: 25,
    showSizeChanger: true,
    hideOnSinglePage: true,
    showJumpToPage: true,
    showPageJumperAtOnce: 2,
    showFirstAndLastPageAsIcon: false,
    showTotal: (total: number) => `Total ${total} items`,
    onChange: (currentPage: number, pageSize: number) => { console.log(`Current page: ${currentPage}, Page size: ${pageSize}`) }
  }
}
