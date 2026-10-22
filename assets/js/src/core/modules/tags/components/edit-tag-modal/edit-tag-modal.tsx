/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Modal } from '@Pimcore/components/modal/modal'
import { ModalFooter } from '@Pimcore/components/modal/footer/modal-footer'
import { Button } from '@Pimcore/components/button/button'
import { Form } from '@Pimcore/components/form/form'
import { Input } from '@Pimcore/components/input/input'
import { Select } from '@Pimcore/components/select/select'
import type { Tag } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/tags/tags-api-slice.gen'
import { buildMoveTargetOptions, matchesMoveTarget } from '@Pimcore/modules/tags/utils/move-target-options'

export interface EditTagFormValues {
  name: string
  parentId: number
}

export interface EditTagModalProps {
  tag: Tag
  tags: Tag[]
  rootTag: Tag
  onCancel: () => void
  onSave: (values: EditTagFormValues) => Promise<void>
}

/**
 * Renaming and moving a tag in one place. Moving by keyboard is otherwise impossible, because the
 * tree offers it through dragging only. Every tag is a possible destination, listed by its full
 * path, so a tag can be moved under any tag rather than only under one that already has children.
 */
export const EditTagModal = ({ tag, tags, rootTag, onCancel, onSave }: EditTagModalProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [form] = Form.useForm<EditTagFormValues>()
  const [saving, setSaving] = useState<boolean>(false)

  const options = useMemo(
    () => buildMoveTargetOptions(tags, rootTag, tag.id),
    [tags, rootTag, tag.id]
  )

  const handleSave = (): void => {
    form.validateFields().then(
      (values) => {
        if (values.name === tag.text && values.parentId === tag.parentId) {
          onCancel()
          return
        }

        setSaving(true)
        void onSave(values).finally(() => { setSaving(false) })
      },
      () => { /* the form shows the validation message itself */ }
    )
  }

  return (
    <Modal
      footer={ (
        <ModalFooter>
          <Button
            key="cancel"
            onClick={ onCancel }
          >
            {t('tag-configuration.cancel')}
          </Button>

          <Button
            key="save"
            loading={ saving }
            onClick={ handleSave }
            type="primary"
          >
            {t('tag-configuration.save')}
          </Button>
        </ModalFooter>
      ) }
      onCancel={ onCancel }
      open
      size="M"
      title={ t('tag-configuration.edit-tag', { name: tag.text }) }
    >
      <Form
        form={ form }
        initialValues={ { name: tag.text, parentId: tag.parentId } }
        layout="vertical"
        onFinish={ handleSave }
      >
        <Form.Item
          label={ t('tag-configuration.name') }
          name="name"
          rules={ [{ required: true, message: t('tag-configuration.name-required') }] }
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={ t('tag-configuration.move-under') }
          name="parentId"
        >
          <Select
            className="w-full"
            filterOption={ matchesMoveTarget }
            options={ options }
            placeholder={ t('tag-configuration.move-search-placeholder') }
            showSearch
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}
