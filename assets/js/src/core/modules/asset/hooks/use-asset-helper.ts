/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type EditorContainerProps } from '../editor/editor-container'
import { getPimcoreStudioApi } from '@Pimcore/app/public-api/helpers/api-helper'

interface OpenAssetWidgetProps {
  config: EditorContainerProps
}

interface UseAssetReturn {
  openAsset: (props: OpenAssetWidgetProps) => void
}

export const useAssetHelper = (): UseAssetReturn => {
  const openAsset = async (props: OpenAssetWidgetProps): Promise<void> => {
    const { config } = props
    const { element } = getPimcoreStudioApi()
    await element.openAsset(config.id)
  }

  return { openAsset }
}
