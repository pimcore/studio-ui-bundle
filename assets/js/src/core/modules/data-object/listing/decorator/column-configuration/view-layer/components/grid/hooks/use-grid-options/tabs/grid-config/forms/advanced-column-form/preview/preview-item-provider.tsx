/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { usePreviewMode } from '@Pimcore/components/preview-mode/preview-mode-provider'

/** Adapter: the picked item now lives in the shared preview-mode module */
export const usePreviewItem = (): { item: any, setItem: (item: any) => void } => {
  const { item, setItem } = usePreviewMode()
  return { item, setItem }
}
