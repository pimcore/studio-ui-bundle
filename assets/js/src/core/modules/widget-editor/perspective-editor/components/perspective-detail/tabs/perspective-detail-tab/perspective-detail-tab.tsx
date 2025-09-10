/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Button } from '@Pimcore/components/button/button'
import { Content } from '@Pimcore/components/content/content'
import { Flex } from '@Pimcore/components/flex/flex'
import { Form } from '@Pimcore/components/form/form'
import { FormKit } from '@Pimcore/components/form/form-kit'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Input } from '@Pimcore/components/input/input'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { type CreatePerspectiveConfig } from '@Pimcore/modules/perspectives/perspectives-slice.gen'
import { usePerspectiveEditorContext } from '@Pimcore/modules/widget-editor/perspective-editor/context/hooks/use-perspective-editor-context'
import { usePerspectiveEditor } from '@Pimcore/modules/widget-editor/perspective-editor/hooks/use-perspective-editor'
import { type FormInstance } from 'antd'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

export interface PerspectiveForm {
  name: string
}

interface PerspectiveDetailTabProps {
  id: string | undefined
}

export const PerspectiveDetailTab = ({ id }: PerspectiveDetailTabProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { perspectives, setPerspectives, setIsLoading, isLoading } = usePerspectiveEditorContext()
  const { updatePerspective, removeWithConfirmation } = usePerspectiveEditor()
  const perspective = perspectives.find(p => p.id === id)
  const [form] = Form.useForm<FormInstance<PerspectiveForm>>()
  const initialValues: PerspectiveForm = {
    name: perspective?.name ?? ''
  }
  const [formData, setFormData] = useState<PerspectiveForm>(initialValues)

  if (perspective === undefined) {
    return <></>
  }

  return (
    <FormKit
      formProps={{
        form,
        initialValues,
        onFinish: async (values: PerspectiveForm) => {
          console.table(values)
          setIsLoading(true)

          await updatePerspective(perspective.id, {
            ...values as CreatePerspectiveConfig
          }, () => {
            setPerspectives((prev) => {
              const updated = prev.map((p) => (p.id === id ? { ...p, ...values } : p))
              return updated
            })
          })
            .finally(() => {
              setIsLoading(false)
            })
        }
      }}
    >
      <Flex
        className='makeTabsGreatAgain'
        justify='space-between'
        vertical
      >
        <Content
          padded
          padding={{
            x: 'small',
            y: 'none'
          }}
        >
          <FormKit.Panel>
            <Form.Item
              label="Name"
              name="name"
              required
            >
              <Input
                onChange={(e) => { setFormData({ ...formData, name: e.target.value }) }}
                placeholder={t('perspective-editor.form.name.placeholder')}
              />
            </Form.Item>
          </FormKit.Panel>
        </Content>

        <Toolbar justify="space-between">
          <div>
            <IconButton
              disabled={isLoading}
              icon={{ value: 'refresh' }}
              onClick={() => {
                form.resetFields()
              }}
              title={t('refresh')}
            />

            <IconButton
              disabled={isLoading}
              icon={{ value: 'trash' }}
              onClick={() => {
                removeWithConfirmation(perspective.id, () => {
                  setPerspectives((prev) => prev.filter((p) => p.id !== perspective.id))
                })
              }}
              title={t('delete')}
            />
          </div>

          <Button
            htmlType='submit'
            loading={isLoading}
            type='primary'
          >
            {t('save')}
          </Button>
        </Toolbar>
      </Flex>
    </FormKit>
  )
}
