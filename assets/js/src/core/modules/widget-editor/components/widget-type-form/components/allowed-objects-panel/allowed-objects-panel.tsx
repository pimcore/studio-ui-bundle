/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { FormKit } from '@Pimcore/components/form/form-kit'
import { useTranslation } from 'react-i18next'
import React from 'react'
import { useClassDefinitions } from '@Pimcore/modules/data-object/utils/provider/class-defintions/use-class-definitions'
import { Form } from '@Pimcore/components/form/form'
import { useStyles } from './allowed-objects-panel.styles'
import { Switch } from '@Pimcore/components/switch/switch'

export const AllowedObjectsPanel = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { getClassDefinitionsForCurrentUser } = useClassDefinitions()
  const { styles } = useStyles()

  return (
    <FormKit.Panel
      collapsed={ false }
      collapsible
      title={ t('widget-editor.widget-form.allowed-objects.title') }
    >
      <div className={ styles.allowedObjectsGrid }>
        <Form.Group
          name={ 'classes' }
        >
          {getClassDefinitionsForCurrentUser().map(classDefinition => (
            <Form.Item
              key={ classDefinition.id }
              name={ classDefinition.id }
            >
              <Switch
                labelRight={ classDefinition.name }
              />
            </Form.Item>
          ))}
        </Form.Group>
      </div>
    </FormKit.Panel>
  )
}
