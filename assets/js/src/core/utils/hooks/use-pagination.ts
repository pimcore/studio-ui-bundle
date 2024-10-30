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

import {
  useListPage,
  useListPageSize
} from '@Pimcore/modules/asset/editor/types/folder/tab-manager/tabs/list/hooks/use-list'

const usePagination = (): any => {
  // TODO: move logic from useListPage and useListPageSize
  const { page, setPage } = useListPage()
  const { pageSize, setPageSize } = useListPageSize()

  const handlePageChange = (page: number, pageSize: number): void => {
    setPage(page)
    setPageSize(pageSize)
  }

  return {
    page,
    pageSize,
    handlePageChange
  }
}

export default usePagination
