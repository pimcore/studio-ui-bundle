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
import { Form } from '@Pimcore/components/form/form'
import { Input } from 'antd'

export const WorkflowLogModal = (): React.JSX.Element => {
  const { isModalOpen, closeModal } = useWorkflow()
  const [form] = Form.useForm<FormValues>()

  interface FormValues {
    timeSpent: string
    notes: string
  }

  const onFinish = (values: FormValues): void => {
    console.log('----> formvalues', values)

    closeModal()
  }

  return (
    <Modal
      afterClose={ () => {
        form.resetFields()
        closeModal()
      } }
      footer={ <ModalFooter
        divider>
        <Flex
          align={ 'center' }
          gap={ 'extra-small' }
        >
          <IconTextButton
            icon='close'
            onClick={ () => { closeModal() } }
            type='link'
          >
            Cancel</IconTextButton>
          <Button
            key="submit"
            onClick={ () => { form.submit() } }
            type="primary"
          >Perform Action</Button>
        </Flex>
      </ModalFooter> }
      onCancel={ () => {
        closeModal()
      } }
      open={ isModalOpen }
      size={ 'M' }
      title={ <ModalTitle>Log Time</ModalTitle> }
    >
      <Form
        form={ form }
        layout={ 'vertical' }
        onFinish={ onFinish }
      >
        <Form.Item
          label="Time spent"
          name="timeSpent"
          rules={ [{ required: false, message: '' }] }
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Notes"
          name="notes"
          rules={ [{ required: true, message: 'Please enter your Notes above or Cancel' }] }
        >
          <Input.TextArea rows={ 4 } />
        </Form.Item>
      </Form>
    </Modal>
  )
}
