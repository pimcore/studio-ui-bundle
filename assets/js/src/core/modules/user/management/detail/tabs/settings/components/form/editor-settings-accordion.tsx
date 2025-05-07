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
import { Accordion } from '@Pimcore/components/accordion/accordion'
import { useTranslation } from 'react-i18next'
import { LanguageTable } from '@Pimcore/modules/user/management/detail/tabs/settings/components/table/language-table'

interface IEditorSettingsAccordionProps {
  data: any
  viewData: any
  editData: any
  onChange: (data: any) => void
}
const EditorSettingsAccordion = ({ data, viewData, editData, onChange, ...props }: IEditorSettingsAccordionProps): React.JSX.Element => {
  const { t } = useTranslation()

  const content = [
    {
      key: '1',
      title: <>{ t('user-management.editor-settings') }</>,
      children: (
        <LanguageTable
          data={ data }
          editData={ editData }
          onChangeOrder={ (languages) => { onChange(languages) } }
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
export { EditorSettingsAccordion }
