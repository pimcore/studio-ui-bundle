/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { invalidatingTags } from '@Pimcore/app/api/pimcore/tags'
import { useAppDispatch } from '@Pimcore/app/store'
import { Flex } from '@Pimcore/components/flex/flex'
import { Form } from '@Pimcore/components/form/form'
import { Input } from '@Pimcore/components/input/input'
import { Modal } from '@Pimcore/components/modal/modal'
import { ModalTitle } from '@Pimcore/components/modal/modal-title/modal-title'
import { Select } from '@Pimcore/components/select/select'
import { api } from '@Pimcore/modules/redirects/seo-api-slice-enhanced'
import { useForm } from 'antd/es/form/Form'
import React, { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useBundleSeoRedirectListTypesQuery, useBundleSeoRedirectAddMutation } from '../../seo-api-slice-enhanced'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'
import { type BundleSeoRedirect } from '../../seo-api-slice.gen'
import { isUndefined } from 'lodash'

interface BeginnerRedirectModalProps {
  open: boolean
  setOpen: (open: boolean) => void
  onSuccess?: (redirect: BundleSeoRedirect) => void
}

interface BeginnerRedirectFormValues {
  type: string
  path: string
  target: string
}

export const BeginnerRedirectModal = ({ open, setOpen, onSuccess }: BeginnerRedirectModalProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [form] = useForm()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const [createRedirect] = useBundleSeoRedirectAddMutation()
  const { data: typesData } = useBundleSeoRedirectListTypesQuery()

  const typeOptions = useMemo(() => 
    typesData?.types?.map(type => ({ label: t(type), value: type })) ?? [], 
    [typesData, t]
  )

  const onFinish = async (values: BeginnerRedirectFormValues): Promise<void> => {
    setIsLoading(true)
    
    try {
      const redirectData = {
        type: values.type,
        source: values.path,
        target: values.target
      }
      
      const result = await createRedirect({ bundleSeoRedirectAdd: redirectData })
      
      if ('data' in result) {
        dispatch(
          api.util.invalidateTags(
            invalidatingTags.REDIRECTS()
          )
        )
        
        if (!isUndefined(onSuccess) && !isUndefined(result.data)) {
          onSuccess(result.data)
        }
        
        setOpen(false)
        form.resetFields()
      }
    } catch (error) {
      trackError(new GeneralError('Was not able to create redirect'))
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = (): void => {
    setOpen(false)
    form.resetFields()
  }

  return (
    <Modal
      okButtonProps={{ loading: isLoading }}
      okText={t('redirects.beginner-modal.create')}
      onCancel={handleCancel}
      onOk={() => { form.submit() }}
      open={open}
      size="M"
      title={(
        <ModalTitle iconName="new">
          {t('redirects.beginner-modal.title')}
        </ModalTitle>
      )}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          label={t('redirects.beginner-modal.type')}
          name="type"
          rules={[{ required: true, message: t('redirects.beginner-modal.type') }]}
        >
          <Select
            options={typeOptions}
            placeholder={t('redirects.beginner-modal.type')}
          />
        </Form.Item>

        <Form.Item
          label={t('redirects.beginner-modal.path')}
          name="path"
          rules={[{ required: true, message: t('redirects.beginner-modal.path') }]}
        >
          <Input placeholder={t('redirects.beginner-modal.path')} />
        </Form.Item>

        <Form.Item
          label={t('redirects.beginner-modal.target')}
          name="target"
          rules={[{ required: true, message: t('redirects.beginner-modal.target') }]}
        >
          <Input placeholder={t('redirects.beginner-modal.target')} />
        </Form.Item>
      </Form>
    </Modal>
  )
}
