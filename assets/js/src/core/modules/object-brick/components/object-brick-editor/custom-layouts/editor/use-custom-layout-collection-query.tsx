/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useClassCustomLayoutCollectionQuery, useClassObjectBrickClassesQuery } from '@sdk/api/class-definition'
import { type AnyQueryHook } from 'types/react-query'

export const useObjectBrickCustomLayoutCollectionQuery: AnyQueryHook = () => {
  const { data: classesData } = useClassObjectBrickClassesQuery()
  const classIds = classesData?.items.map((item) => item.id).join(',')
  return useClassCustomLayoutCollectionQuery(
    { classIds },
    { skip: classIds === undefined }
  )
}
