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

export const verifyUpdate = (value: any, columnId: any, primaryColumn: string, hasDuplicate: boolean, showMandatoryModal: () => void, showDuplicateModal: () => void): boolean => {
  const isKeyColumn = columnId === primaryColumn

  if (isKeyColumn) {
    if (value === '') {
      showMandatoryModal()
      return false
    }
  }

  if (hasDuplicate) {
    showDuplicateModal()
    return false
  }

  return true
}
