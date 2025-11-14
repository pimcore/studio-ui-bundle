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
import { ModalFooter } from '@Pimcore/components/modal/footer/modal-footer'
import { Button } from '@Pimcore/components/button/button'
import { Modal } from '@Pimcore/components/modal/modal'
import { Flex } from '@Pimcore/components/flex/flex'
import { ModalTitle } from '@Pimcore/components/modal/modal-title/modal-title'
import { useWorkflow } from '@Pimcore/modules/element/editor/shared-components/workflow/hooks/use-workflow'
import { Form } from '@Pimcore/components/form/form'
import { Input } from 'antd'
import { t } from 'i18next'
import { useSubmitWorkflow } from '@Pimcore/modules/element/editor/shared-components/workflow/hooks/use-submit-workflow'
import { isNull } from 'lodash'
import { isNonEmptyString } from '@Pimcore/utils/type-utils'
import { useWorkflowFieldRenderer } from '@Pimcore/modules/element/editor/shared-components/workflow/hooks/use-workflow-field-renderer'
import { useDateConverter } from '@Pimcore/modules/app/hook/use-date-converter'

export const WorkflowModal = (): React.JSX.Element => {
  const { isModalOpen, closeModal, triggeredWorkflowAction } = useWorkflow()
  const { renderFields } = useWorkflowFieldRenderer()
  const { convertToTimestamp } = useDateConverter()
  const [form] = Form.useForm<FormValues>()

  const { submitWorkflowAction, submissionLoading } = useSubmitWorkflow()

  interface FormValues {
    notes: string
    [key: string]: any
  }

  const additionalFields = triggeredWorkflowAction?.notes?.additionalFields ?? []
  const dynamicFields = renderFields(additionalFields)

  const onFinish = (values: FormValues): void => {
    if (triggeredWorkflowAction === null) return

    const additionalValues: Record<string, any> = {}
    dynamicFields.forEach(field => {
      additionalValues[field.name] = values[field.name] ?? null
      if (field.fieldType === 'date' || field.fieldType === 'datetime') {
        const fieldValue = values[field.name]
        if (isNonEmptyString(fieldValue)) {
          additionalValues[field.name] = convertToTimestamp(fieldValue, true, false)
        }
      }
    })

    submitWorkflowAction(triggeredWorkflowAction, {
      notes: values.notes,
      additional: additionalValues
    })
  }

  return (
    <Modal
      afterClose={ () => {
        form.resetFields()
        closeModal()
      } }
      closable={ !submissionLoading }
      footer={ <ModalFooter
        divider
               >
        <Flex
          align={ 'center' }
          gap={ 'extra-small' }
        >
          <Button
            disabled={ submissionLoading }
            onClick={ () => { closeModal() } }
            type='default'
          >{t('workflow-modal.cancel')}</Button>
          <Button
            key="submit"
            loading={ submissionLoading }
            onClick={ () => { form.submit() } }
            type="primary"
          >{t('workflow-modal.perform-action')}</Button>
        </Flex>
      </ModalFooter> }
      onCancel={ () => {
        closeModal()
      } }
      open={ isModalOpen && !isNull(triggeredWorkflowAction) }
      size={ 'M' }
      title={ <ModalTitle>{!isNull(triggeredWorkflowAction) ? t(triggeredWorkflowAction.label) : ''}</ModalTitle> }
    >
      <Form
        form={ form }
        initialValues={ {
          notes: triggeredWorkflowAction?.notes?.commentPrefill ?? ''
        } }
        layout={ 'vertical' }
        onFinish={ onFinish }
      >
        {dynamicFields.map((field) => (
          <Form.Item
            key={ field.name }
            label={ t(isNonEmptyString(field.title) ? field.title : field.name) }
            name={ field.name }
            rules={ [{ required: field.required, message: t('form.validation.required') }] }
          >
            {field.component}
          </Form.Item>
        ))}

        {triggeredWorkflowAction?.notes?.commentEnabled === true && (
          <Form.Item
            label={ t('workflow-modal.notes') }
            name="notes"
            rules={ [{ required: triggeredWorkflowAction?.notes?.commentRequired ?? false, message: t('workflow-modal.notes-required') }] }
          >
            <Input.TextArea rows={ 4 } />
          </Form.Item>
        )}
      </Form>
    </Modal>
  )
}
