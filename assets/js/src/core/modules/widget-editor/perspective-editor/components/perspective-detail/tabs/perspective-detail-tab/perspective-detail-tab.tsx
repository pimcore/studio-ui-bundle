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
import { Form } from '@Pimcore/components/form/form'
import { FormKit } from '@Pimcore/components/form/form-kit'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Input } from '@Pimcore/components/input/input'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { usePerspectiveEditorContext } from '@Pimcore/modules/widget-editor/perspective-editor/context/hooks/use-perspective-editor-context'
import React from 'react'
import { useTranslation } from 'react-i18next'

export interface PerspectiveFormData {
  name: string
}

interface PerspectiveDetailTabProps {
  id: string | undefined
}

export const PerspectiveDetailTab = ({ id }: PerspectiveDetailTabProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { perspectives } = usePerspectiveEditorContext()
  const perspective = perspectives.find(p => p.id === id)

  if (perspective === undefined) {
    return <></>
  }

  return (
    <FormKit formProps={{
      initialValues: {
        name: perspective.name
      }
    }}>
      <ContentLayout
        renderToolbar={(
          <Toolbar justify="space-between">
            <IconButton
              icon={{ value: 'refresh' }}
              title={t('refresh')}
            />

            <Button
              type='primary'
            >
              {t('save')}
            </Button>
          </Toolbar>
        )}
      >
        <Content>
          <FormKit.Panel>
            <Form.Item
              label="Name"
              name="name"
              required
            >
              <Input
                placeholder="Enter your name"
              />
            </Form.Item>
          </FormKit.Panel>
        </Content>
      </ContentLayout>
    </FormKit>
  )
}
