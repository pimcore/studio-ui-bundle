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
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Content } from '@Pimcore/components/content/content'
import { Flex } from '@Pimcore/components/flex/flex'
import { Form } from '@Pimcore/components/form/form'
import { FormKit } from '@Pimcore/components/form/form-kit'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Input } from '@Pimcore/components/input/input'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { usePerspectiveEditorContext } from '@Pimcore/modules/widget-editor/perspective-editor/context/hooks/use-perspective-editor-context'
import { FormInstance } from 'antd'
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
  const { perspectives } = usePerspectiveEditorContext()
  const perspective = perspectives.find(p => p.id === id)
  const [form] = Form.useForm<FormInstance<PerspectiveForm>>()
  const initialValues: PerspectiveForm = {
    name: perspective?.name || ''
  }
  const [formData, setFormData] = useState<PerspectiveForm>(initialValues)

  if (perspective === undefined) {
    return <></>
  }

  return (
    <div className='h-full'>
      <FormKit
        formProps={{
          form: form,
          initialValues,
          onFinish: (values) => {
            console.table(values)
          }
        }}
      >
        <Flex justify='space-between' vertical>
          <Content style={{ height: '100%' }}>
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
            <IconButton
              icon={{ value: 'refresh' }}
              title={t('refresh')}
              onClick={() => {
                form.resetFields()
              }}
            />

            <Button
              type='primary'
              htmlType='submit'
            >
              {t('save')}
            </Button>
          </Toolbar>
        </Flex>
      </FormKit>
    </div>
  )
}
