/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { Icon } from '@Pimcore/components/icon/icon'
import { type IEditorTab } from '@Pimcore/modules/element/editor/tab-manager/interface/IEditorTab'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import { ApplicationLoggerContainerInner } from '@Pimcore/modules/application-logger/application-logger-container-inner'
import { FilterProvider } from '@Pimcore/modules/application-logger/components/sidebar/tabs/filter/provider/filter-provider/filter-provider'

export const ObjectApplicationLoggerTab = (): React.JSX.Element => {
  const { id } = useElementContext()

  return (
    <FilterProvider initialRelatedObjectId={ id }>
      <ApplicationLoggerContainerInner />
    </FilterProvider>
  )
}

export const TAB_APPLICATION_LOGGER: IEditorTab = {
  key: 'application-logger',
  label: 'application-logger.label',
  icon: <Icon value="application-logger" />,
  children: <ObjectApplicationLoggerTab />,
  hidden: (element) => !('showAppLoggerTab' in element && element.showAppLoggerTab === true)
}
