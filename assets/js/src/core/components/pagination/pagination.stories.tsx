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

import { type Meta } from '@storybook/react'
import { Pagination as PaginationComponent } from './pagination'

const config: Meta = {
  title: 'Components/__refactor__/Pagination',
  component: PaginationComponent,
  argTypes: {
    total: {
      control: false
    }
  },
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default config

export const _default = {
  args: {
    total: 182,
    current: 2,
    pageSizeOptions: [5, 25, 55, 80],
    defaultPageSize: 25,
    showSizeChanger: true,
    hideOnSinglePage: true,
    amountOfVisiblePages: 4,
    showTotal: (total: number) => `Total ${total} items`,
    onChange: (currentPage: number, pageSize: number) => { console.log(`Current page: ${currentPage}, Page size: ${pageSize}`) }
  }
}
