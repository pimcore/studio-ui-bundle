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
import { ModalFooter } from '@Pimcore/components/modal/footer/modal-footer'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { Button } from '@Pimcore/components/button/button'
import { Modal } from '@Pimcore/components/modal/modal'
import { Flex } from '@Pimcore/components/flex/flex'
import { ModalTitle } from '@Pimcore/components/modal/modal-title/modal-title'
import { useWorkflow } from '@Pimcore/modules/asset/editor/toolbar/workflow-log-modal/hooks/use-workflow'

export const WorkflowLogModal = (): React.JSX.Element => {
  const { isModalOpen, closeModal } = useWorkflow()

  console.log('----> isModalOpen in Modal', isModalOpen)

  return (
    <Modal
      afterClose={ () => { closeModal() } }
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
            onClick={ () => { closeModal() } }
            type='link'
          >
            Close</IconTextButton>
          <Button
            onClick={ () => {
              alert('changed')
            } }
            type='primary'
          >Save</Button>
        </Flex>
      </ModalFooter> }
      onCancel={ () => {
        closeModal()
      } }
      open={ isModalOpen }
      size={ 'M' }
      title={ <ModalTitle>Log Time</ModalTitle> }
    >
      Content
    </Modal>
  )
}
