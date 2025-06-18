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
import { Toolbar as ToolbarView } from '@Pimcore/components/toolbar/toolbar'

import { Flex } from '@Pimcore/components/flex/flex'
import { WorkflowLogModal } from '@Pimcore/modules/asset/editor/toolbar/workflow-log-modal/workflow-log-modal'
import { WorkFlowProvider } from '@Pimcore/modules/asset/editor/toolbar/workflow-log-modal/workflow-provider'
import { componentConfig } from '@Pimcore/modules/app/component-registry/component-config'
import { SlotRenderer } from '@Pimcore/modules/app/component-registry/slot-renderer'

export const Toolbar = (): React.JSX.Element => {
  return (
    <ToolbarView>
      <WorkFlowProvider>
        <Flex>
          <SlotRenderer
            slot={ componentConfig.document.editor.toolbar.slots.left.name }
          />
        </Flex>

        <Flex
          align="center"
          gap={ 'extra-small' }
          style={ { height: '32px' } }
          vertical={ false }
        >
          <SlotRenderer
            slot={ componentConfig.document.editor.toolbar.slots.right.name }
          />
        </Flex>
        <WorkflowLogModal />
      </WorkFlowProvider>
    </ToolbarView>
  )
}
