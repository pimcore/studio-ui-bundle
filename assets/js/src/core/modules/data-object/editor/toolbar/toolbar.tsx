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
            slot={ componentConfig.dataObject.editor.toolbar.slots.left }
          />
        </Flex>

        <Flex
          align="center"
          gap={ 'extra-small' }
          style={ { height: '32px' } }
          vertical={ false }
        >
          <SlotRenderer
            slot={ componentConfig.dataObject.editor.toolbar.slots.right }
          />
        </Flex>
        <WorkflowLogModal />
      </WorkFlowProvider>
    </ToolbarView>
  )
}
