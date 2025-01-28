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

import { isEqual } from 'lodash'
import { type IVersionsFieldsListProps } from '@Pimcore/components/versions-fields-list/types'

export const getModifiedItems = (dataList: IVersionsFieldsListProps['data'], primaryKey: string, comparisonKey: string): IVersionsFieldsListProps['data'] => {
  return dataList.filter((item) => !isEqual(item[primaryKey], item[comparisonKey]))
}
