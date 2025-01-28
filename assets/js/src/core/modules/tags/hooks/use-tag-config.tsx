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
  type TagGetCollectionApiResponse,
  useTagGetCollectionQuery
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/tags/tags-api-slice-enhanced'

interface UseTagConfigReturn {
  tags: TagGetCollectionApiResponse | undefined
  tagsLoading: boolean
}

export const useTagConfig = (): UseTagConfigReturn => {
  const { data: tags, isLoading: tagsLoading } = useTagGetCollectionQuery({
    page: 1,
    pageSize: 9999
  })

  return {
    tags, tagsLoading
  }
}
