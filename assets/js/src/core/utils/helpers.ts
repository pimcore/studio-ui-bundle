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

export function onKeyEnterExecuteClick (e: any): void {
  if (e.key === 'Enter') {
    e.preventDefault()
    e.stopPropagation()
    e.currentTarget.click()
  }
}

export function isSet (par: any): boolean {
  return par !== null && par !== undefined
}

export function formatDate (unix: number): string {
  const date = new Date(unix * 1000)
  return date.toISOString().slice(0, 10)
}

export function formatDateTime (unix: number): string {
  const date = new Date(unix * 1000)
  return date.toISOString().slice(0, 10) + ' ' + date.toTimeString().slice(0, 5)
}
