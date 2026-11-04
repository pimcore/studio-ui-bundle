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
import { Switch } from '@Pimcore/components/switch/switch'
import { usePreviewMode } from './preview-mode-provider'

export const PreviewModeSwitch = (): React.JSX.Element => {
  const { enabled, setEnabled } = usePreviewMode()
  const { t } = useTranslation()

  return (
    <Switch
      aria-label={ t('preview-mode.switch') }
      checked={ enabled }
      labelRight={ t('preview-mode.switch') }
      onChange={ setEnabled }
      size="small"
    />
  )
}
