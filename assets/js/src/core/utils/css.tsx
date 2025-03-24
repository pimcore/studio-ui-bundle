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

export const toCssDimension = (value?: number | string | null, fallback?: number | string): string | undefined => {
  if (value === null || value === undefined || value === '' || value === 0) {
    if (fallback === undefined) {
      return undefined
    }
    value = fallback
  }

  return typeof value === 'number' ? `${value}px` : value
}
