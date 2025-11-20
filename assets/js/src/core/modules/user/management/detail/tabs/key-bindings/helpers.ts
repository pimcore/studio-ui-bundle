/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

const getKeyName = (key: number): string => {
  let name = ''

  if (key >= 112 && key <= 123) {
    name = 'F' + (key - 111)
  } else if (key === 32) {
    name = 'Space'
  } else {
    name = String.fromCharCode(key)
  }

  return name
}

export const renderKeyCombination = (keyBinding: any): string => {
  return `${keyBinding.ctrl !== false ? 'Ctrl + ' : ''}${keyBinding.alt !== false ? 'Alt + ' : ''}${keyBinding.shift !== false ? 'Shift + ' : ''}${getKeyName(keyBinding.key as number)}`
}
