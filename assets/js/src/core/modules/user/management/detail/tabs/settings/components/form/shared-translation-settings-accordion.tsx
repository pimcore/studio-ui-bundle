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

import React from 'react'
import { Accordion } from '@Pimcore/components/accordion/accordion'
import { useTranslation } from 'react-i18next'
import { LanguageTable } from '@Pimcore/modules/user/management/detail/tabs/settings/components/table/language-table'

interface ISharedTranslationSettingsAccordionProps {
  data: any
  viewData: any
  editData: any
  onChange: (data: any) => void
}
const SharedTranslationSettingsAccordion = ({ data, viewData, editData, onChange, ...props }: ISharedTranslationSettingsAccordionProps): React.JSX.Element => {
  const { t } = useTranslation()

  const content = [
    {
      key: '1',
      title: <>{ t('user-management.shared-translation-settings') }</>,
      children: (
        <LanguageTable
          data={ data }
          editData={ editData }
          onChange={ (languages) => { onChange(languages) } }
          viewData={ viewData }
        />
      )
    }
  ]
  return (
    <Accordion
      activeKey={ '1' }
      bordered
      items={ content }
      size={ 'small' }
      table
    />
  )
}
export { SharedTranslationSettingsAccordion }
