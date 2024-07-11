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

import { formatDateTime } from '@Pimcore/utils/date-time'

const formatMap: any = {
  dimensions: (data: any): string => {
    return data.width + ' x ' + data.height
  },
  creationDate: (timestamp: number): string => {
    return formatDateTime({ timestamp, dateStyle: 'short', timeStyle: 'medium' })
  },
  modificationDate: (timestamp: number): string => {
    return formatDateTime({ timestamp, dateStyle: 'short', timeStyle: 'medium' })
  },
  fileSize: (data: number): string => {
    return (data / 1000) + ' KB'
  }
}
export const formatVersionData = (key: string, data: any): string => {
  return formatMap[key] as boolean ? formatMap[key](data) : data.toString()
}
