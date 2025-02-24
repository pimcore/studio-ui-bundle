/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import { useTranslation } from 'react-i18next'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import log from 'eslint-plugin-react/lib/util/log'
import React from 'react'

export const OpenAssetModal = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { input } = useFormModal()

  input({
    title: t('tag-configuration.rename'),
    label: t('tag-configuration.name'),
    rule: {
      required: true,
      message: 'Please enter a tag name'
    },
    okText: t('tag-configuration.save'),
    onOk: () => { log('ok') }
  })

  return <div>test</div>
}
