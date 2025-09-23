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
import { useTranslation } from 'react-i18next'
import { WidgetConfigurator } from '../widget-configurator/widget-configurator'
import { Flex } from '@Pimcore/components/flex/flex'

export const SpecificPanel = (): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <Flex
      gap={4}
      vertical
    >
      <p>{t('perspective-editor.form.general.widget-congfiguration')}</p>

      <WidgetConfigurator />
    </Flex>
  )
}
