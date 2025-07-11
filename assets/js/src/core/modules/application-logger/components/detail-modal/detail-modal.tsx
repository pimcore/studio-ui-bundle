/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Form } from '@Pimcore/components/form/form'
import { Input } from '@Pimcore/components/input/input'
import { Modal } from '@Pimcore/components/modal/modal'
import { ModalTitle } from '@Pimcore/components/modal/modal-title/modal-title'
import { TextArea } from '@Pimcore/components/textarea/textarea'
import { ManyToOneRelation, type ManyToOneRelationValueType } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-one-relation/many-to-one-relation'
import { FieldWidthProvider } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/field-width-provider'
import { isNil } from 'lodash'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { type BundleApplicationLoggerLogEntryWithActions } from '../table/table'

interface DetailModalProps {
  data: BundleApplicationLoggerLogEntryWithActions | null
  open: boolean
  setOpen: (open: boolean) => void
}

export const DetailModal = (props: DetailModalProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [form] = Form.useForm()

  if (isNil(props.data)) {
    return <></>
  }

  const closeModel = (): void => {
    props.setOpen(false)
  }

  const formData = {
    date: props.data.date ?? '',
    message: props.data.message ?? '',
    priority: props.data.priority ?? '',
    component: props.data.component ?? '',
    source: props.data.source ?? '',
    fileObject: {
      fullPath: '/Product Data/Body-Styles/2-door roadster',
      id: 6,
      isPublished: true,
      subtype: 'object',
      type: 'object'
    } as ManyToOneRelationValueType
  }

  return (
    <Modal
      onCancel={ closeModel }
      onClose={ closeModel }
      onOk={ closeModel }
      open={ props.open }
      title={ (
        <ModalTitle>
          {t('application-logger.detail-modal.title')}
        </ModalTitle>
      ) }
    >
      <FieldWidthProvider>
        <Form
          form={ form }
          initialValues={ formData }
          layout="vertical"
        >
          <Form.Item
            label={ t('application-logger.columns.timestamp') }
            name="date"
          >
            <Input readOnly />
          </Form.Item>

          <Form.Item
            label={ t('application-logger.columns.message') }
            name="message"
          >
            <TextArea readOnly />
          </Form.Item>

          <Form.Item
            label={ t('application-logger.columns.type') }
            name="priority"
          >
            <Input readOnly />
          </Form.Item>

          <Form.Item
            label={ t('application-logger.columns.component') }
            name="component"
          >
            <Input readOnly />
          </Form.Item>

          <Form.Item
            label={ t('application-logger.columns.source') }
            name="source"
          >
            <Input readOnly />
          </Form.Item>

          {props.data.fileObject !== null && (
            <Form.Item
              label={ t('application-logger.columns.related-object') }
              name={ 'fileObject' }
            >
              <ManyToOneRelation
                assetsAllowed
                dataObjectsAllowed
                documentsAllowed
              />
            </Form.Item>
          )}
        </Form>
      </FieldWidthProvider>
    </Modal>
  )
}
