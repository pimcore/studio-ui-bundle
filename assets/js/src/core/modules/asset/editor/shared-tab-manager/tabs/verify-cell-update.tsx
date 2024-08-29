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

export const verifyUpdate = (value: any, keys: string[], columnId: any, primaryColumn: string, showMandatoryModal: () => void, showDuplicatePropertyModal: () => void): boolean => {
  const isStringValue = typeof value === 'string'
  const isStringColumnId = typeof columnId === 'string'

  if (!isStringValue || !isStringColumnId) {
    return true
  }

  const isKeyColumn = columnId === primaryColumn

  if (isKeyColumn) {
    if (value.length < 1) {
      showMandatoryModal()
      return false
    }

    const hasDuplicateKey = keys.includes(value)
    if (hasDuplicateKey) {
      showDuplicatePropertyModal()
      return false
    }
  }

  return true
}
