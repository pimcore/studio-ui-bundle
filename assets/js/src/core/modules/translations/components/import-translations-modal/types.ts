/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

export interface CsvSettings {
  delimiter: string
  quoteChar: string
  escapeChar: string
  lineTerminator: string
}

export type ModalStep = 'file-select' | 'csv-settings'

export const DEFAULT_CSV_SETTINGS: CsvSettings = {
  delimiter: ',',
  quoteChar: '"',
  escapeChar: '"',
  lineTerminator: '0d0a'
}
