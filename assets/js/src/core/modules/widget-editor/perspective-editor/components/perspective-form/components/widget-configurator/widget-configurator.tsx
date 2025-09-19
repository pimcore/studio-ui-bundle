/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Flex } from '@Pimcore/components/flex/flex'
import { WidgetConfigurationCard } from './components/widget-configuraton-card/widget-configuration-card'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Form } from '@Pimcore/components/form/form'

export const WidgetConfigurator = (): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <Flex gap={ 10 }>
      <Form.Item
        name="widgetsLeft"
        style={ { flexGrow: 1 } }
      >
        <WidgetConfigurationCard
          label={ t('perspective-editor.system-widgets.left') }
        />
      </Form.Item>

      <Form.Item
        name="widgetsBottom"
        style={ { flexGrow: 1 } }
      >
        <WidgetConfigurationCard
          allowExpandControl={ false }
          label={ t('perspective-editor.system-widgets.bottom') }
        />
      </Form.Item>

      <Form.Item
        name="widgetsRight"
        style={ { flexGrow: 1 } }
      >
        <WidgetConfigurationCard
          label={ t('perspective-editor.system-widgets.right') }
        />
      </Form.Item>
    </Flex>
  )
}
