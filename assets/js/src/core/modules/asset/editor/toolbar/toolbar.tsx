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
import { WorkFlowProvider } from '@Pimcore/modules/asset/editor/toolbar/workflow-log-modal/workflow-provider'
import { WorkflowLogModal } from '@Pimcore/modules/asset/editor/toolbar/workflow-log-modal/workflow-log-modal'
import { componentConfig } from '@Pimcore/modules/app/component-registry/component-config'
import { SlotRenderer } from '@Pimcore/modules/app/component-registry/slot-renderer'

export const Toolbar = (): React.JSX.Element => {
  return (
    <ToolbarView>
      <WorkFlowProvider>
        <Flex>
          <SlotRenderer
            slot={ componentConfig.asset.editor.toolbar.slots.left }
          />
        </Flex>
        <Flex
          style={ { height: '32px' } }
          vertical={ false }
        >
          <SlotRenderer
            slot={ componentConfig.asset.editor.toolbar.slots.right }
          />
        </Flex>
        <WorkflowLogModal />
      </WorkFlowProvider>
    </ToolbarView>
  )
}
