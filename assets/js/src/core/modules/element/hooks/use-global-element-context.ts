/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type GlobalAssetContext, useGlobalAssetContext } from '@Pimcore/modules/asset/hooks/use-global-asset-context'
import { type GlobalDataObjectContext, useGlobalDataObjectContext } from '@Pimcore/modules/data-object/hooks/use-global-data-object-context'
import { type GlobalDocumentContext, useGlobalDocumentContext } from '@Pimcore/modules/document/hooks/use-global-document-context'
import { useWidgetManager } from '@Pimcore/modules/widget-manager/hooks/use-widget-manager'

export type GlobalElementContext = GlobalAssetContext | GlobalDataObjectContext | GlobalDocumentContext

interface UseGlobalElementContext {
  context: GlobalElementContext | undefined
}

export const useGlobalElementContext = (): UseGlobalElementContext => {
  const { getOpenedMainWidget } = useWidgetManager()

  const { context: assetContext } = useGlobalAssetContext()
  const { context: dataObjectContext } = useGlobalDataObjectContext()
  const { context: documentContext } = useGlobalDocumentContext()

  const openedMainWidgetComponent = getOpenedMainWidget()?.getComponent()

  if (openedMainWidgetComponent === 'asset-editor') {
    return { context: assetContext }
  } else if (openedMainWidgetComponent === 'data-object-editor') {
    return { context: dataObjectContext }
  } else if (openedMainWidgetComponent === 'document-editor') {
    return { context: documentContext }
  } else {
    return { context: undefined }
  }
}
