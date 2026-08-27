/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Modal } from '@Pimcore/components/modal/modal'
import { Form } from '@Pimcore/components/form/form'
import trackError, { ApiError, GeneralError } from '@Pimcore/modules/app/error-handler'
import { useDataObjectAddMutation } from '@Pimcore/modules/data-object/data-object-api-slice.gen'
import { type ManyToManyRelationValueItem } from '../../hooks/use-value'
import { CreateObjectForm, type CreateObjectFormValues } from './create-object-form'
import { useCreatableRelationClasses } from './use-creatable-relation-classes'
import { buildCreatedRelationItem } from './utils'

export interface CreateObjectModalProps {
  open: boolean
  setOpen: (open: boolean) => void
  /** Classes the relation accepts, by id or name; empty means every creatable class. */
  allowedClasses?: string[]
  onCreated: (item: ManyToManyRelationValueItem) => void
}

export const CreateObjectModal = ({ open, setOpen, allowedClasses, onCreated }: CreateObjectModalProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const { classes, isLoading } = useCreatableRelationClasses(allowedClasses)
  const [addDataObject, { isLoading: isCreating }] = useDataObjectAddMutation()

  // With a single allowed class the form hides the picker, so seed the value it still submits.
  useEffect(() => {
    if (open && classes.length === 1) {
      form.setFieldValue('classId', classes[0].id)
    }
  }, [open, classes])

  const close = (): void => {
    setOpen(false)
    form.resetFields()
  }

  const onFinish = async (values: CreateObjectFormValues): Promise<void> => {
    const classDefinition = classes.find(({ id }) => id === values.classId)

    if (classDefinition === undefined) {
      trackError(new GeneralError('No creatable class selected for the new related object'))
      return
    }

    try {
      const response = await addDataObject({
        parentId: values.parent.id,
        dataObjectAddParameters: { key: values.key, classId: classDefinition.id, type: 'object' }
      })

      if (response.error !== undefined) {
        trackError(new ApiError(response.error))
        return
      }

      onCreated(buildCreatedRelationItem({
        id: response.data.id,
        key: values.key,
        className: classDefinition.name,
        parentPath: values.parent.fullPath
      }))

      close()
    } catch (error) {
      trackError(new GeneralError('Error creating the related data object'))
    }
  }

  return (
    <Modal
      okButtonProps={ { loading: isCreating } }
      okText={ t('relations.create-object.submit') }
      onCancel={ close }
      onOk={ () => { form.submit() } }
      open={ open }
      title={ t('relations.create-object.title') }
    >
      <CreateObjectForm
        classes={ classes }
        form={ form }
        isLoading={ isLoading }
        onFinish={ onFinish }
      />
    </Modal>
  )
}
