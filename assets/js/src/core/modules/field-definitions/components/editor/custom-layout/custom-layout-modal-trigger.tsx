/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useCustomLayoutModal } from '@Pimcore/modules/field-definitions/components/editor/custom-layout/custom-layout-modal'
import { IconTextButton } from '@sdk/components'
import React from 'react'
import { useTranslation } from 'react-i18next'

export const CustomLayoutModalTrigger = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { openModal } = useCustomLayoutModal()

  return (
    <IconTextButton
      icon={ { value: 'new-something' } }
      onClick={ openModal }
      type="link"
    >
      {t('field-definitions.custom-layouts')}
    </IconTextButton>
  )
}
