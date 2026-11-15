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
import { Form } from '@Pimcore/components/form/form'
import { getLanguageExtensions } from '@Pimcore/components/text-editor/detect-language'
import { CodeEditor } from '@Pimcore/components/code-editor'
import { useCommitKeyedListDefault } from '@Pimcore/components/form/controls/keyed-list/hooks/use-commit-keyed-list-default'

export const DynamicTypePipelineGridTransformersTwigOperatorComponent = (): React.JSX.Element => {
  const { t } = useTranslation()

  // an untouched default template must still be part of the saved config (see the hook's docs)
  useCommitKeyedListDefault('template', '{{ value }}')

  return (
    <Form.Item
      label={ t('grid.advanced-column.twigTemplate') }
      name={ 'template' }
    >
      <CodeEditor
        basicSetup={ {
          lineNumbers: true,
          syntaxHighlighting: true,
          searchKeymap: true
        } }
        extensions={ getLanguageExtensions('html') }
        minHeight='200px'
      />
    </Form.Item>
  )
}
