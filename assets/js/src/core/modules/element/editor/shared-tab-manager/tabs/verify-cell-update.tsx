/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
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
