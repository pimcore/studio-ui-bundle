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
import { Button } from '@Pimcore/components/button/button'
import { Modal } from '@Pimcore/components/modal/modal'
import { Flex } from '@Pimcore/components/flex/flex'
import { ModalTitle } from '@Pimcore/components/modal/modal-title/modal-title'
import { useWorkflow } from '@Pimcore/modules/asset/editor/toolbar/workflow-log-modal/hooks/use-workflow'
import { Form } from '@Pimcore/components/form/form'
import { Input } from 'antd'
import { t } from 'i18next'
import { useSubmitWorkflow } from '@Pimcore/modules/asset/editor/toolbar/workflow-log-modal/hooks/use-submit-workflow'

export const WorkflowLogModal = (): React.JSX.Element => {
  const { isModalOpen, closeModal, contextWorkflowDetails } = useWorkflow()
  const [form] = Form.useForm<FormValues>()

  const { submitWorkflowAction } = useSubmitWorkflow(contextWorkflowDetails?.workflowName ?? '')

  interface FormValues {
    timeSpent: string
    notes: string
  }

  const onFinish = (values: FormValues): void => {
    contextWorkflowDetails !== null && submitWorkflowAction(contextWorkflowDetails.action, contextWorkflowDetails.transition, contextWorkflowDetails.workflowName, { notes: values.notes, additional: { timeWorked: values.timeSpent } })
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
          <Button
            onClick={ () => { closeModal() } }
            type='default'
          >{t('workflow-modal.cancel')}</Button>
          <Button
            key="submit"
            onClick={ () => { form.submit() } }
            type="primary"
          >{t('workflow-modal.perform-action')}</Button>
        </Flex>
      </ModalFooter> }
      onCancel={ () => {
        closeModal()
      } }
      open={ isModalOpen && contextWorkflowDetails !== null }
      size={ 'M' }
      title={ <ModalTitle>{t('workflow-modal.log-time')}</ModalTitle> }
    >
      <Form
        form={ form }
        layout={ 'vertical' }
        onFinish={ onFinish }
      >
        <Form.Item
          label={ t('workflow-modal.timeSpent') }
          name="timeSpent"
          rules={ [{ required: true, message: t('workflow-modal.timeSpent-required') }] }
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={ t('workflow-modal.notes') }
          name="notes"
          rules={ [{ required: true, message: t('workflow-modal.notes-required') }] }
        >
          <Input.TextArea rows={ 4 } />
        </Form.Item>
      </Form>
    </Modal>
  )
}
