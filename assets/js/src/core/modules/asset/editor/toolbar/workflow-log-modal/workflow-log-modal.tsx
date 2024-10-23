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

import React, { useEffect } from 'react'
import { ModalFooter } from '@Pimcore/components/modal/footer/modal-footer'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { Button } from '@Pimcore/components/button/button'
import { Modal } from '@Pimcore/components/modal/modal'
import { Flex } from '@Pimcore/components/flex/flex'
import { ModalTitle } from '@Pimcore/components/modal/modal-title/modal-title'
import { useWorkflow } from '@Pimcore/modules/asset/editor/toolbar/workflow-log-modal/hooks/use-workflow'

export const WorkflowLogModal = (): React.JSX.Element => {
  const { showWorkflowLogModal, setShowWorkflowLogModal } = useWorkflow()

  useEffect(() => {
    console.log('----> showWorkflowLogModal changed here', showWorkflowLogModal
    )
  }, [showWorkflowLogModal])

  return (
    <Modal
      afterClose={ () => { alert('closed') } }
      footer={ <ModalFooter
        divider
        justify={ 'space-between' }
               >
        <Flex
          align={ 'center' }
          gap={ 'extra-small' }
        >
          <IconTextButton
            icon='close'
            onClick={ () => {
              alert('closed')
            } }
            type='link'
          >
            Hi</IconTextButton>
          <Button
            onClick={ () => {
              alert('changed')
            } }
            type='primary'
          >Bye</Button>
        </Flex>
      </ModalFooter> }
      onCancel={ () => {
        setShowWorkflowLogModal(false)
      } }
      open={ showWorkflowLogModal }
      size={ 'M' }
      title={ <ModalTitle>Test</ModalTitle> }
    >
      Content
    </Modal>
  )
}
