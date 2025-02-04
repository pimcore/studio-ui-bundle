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

import { get, isEmpty } from 'lodash'

enum DATATYPE_LIST {
  LAYOUT = 'layout',
  DATA = 'data'
}

export const getFormattedDataStructure = ({ layout, versionData }: any): any => {
  const processLayoutData = ({ data, categoryName }: any): any => {
    return data?.flatMap((item: any) => {
      if (item.datatype === DATATYPE_LIST.LAYOUT) {
        return processLayoutData({ data: item?.children, categoryName: item?.name })
      }

      if (item.datatype === DATATYPE_LIST.DATA) {
        const fieldName = item.name
        const fieldValue = get(versionData, fieldName)

        if (!isEmpty(fieldValue)) {
          return [{ categoryName, fieldData: item, fieldValue }]
        }
      }

      return []
    })
  }

  return processLayoutData({ data: layout })
}
