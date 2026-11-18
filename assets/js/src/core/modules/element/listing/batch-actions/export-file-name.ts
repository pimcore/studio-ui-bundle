/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

export const buildGridExportFileName = (gridName: string, extension: string): string => {
  const timestamp = new Date().toISOString().slice(0, 19).replace('T', '_').replace(/:/g, '-')
  return `${gridName}_${timestamp}.${extension}`
}
