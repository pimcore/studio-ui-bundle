/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { ManyToOneRelation } from '@Pimcore/components/many-to-one-relation/many-to-one-relation'
import { getLanguageName } from '@Pimcore/utils/language'
import { Card, Form } from '@sdk/components'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface ErrorPageCardProps {
  locale: string
}

export const ErrorPageCard = ({ locale }: ErrorPageCardProps): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <Card
      title={ getLanguageName({ locale }) + ` (${locale})` }
    >
      <Form.Item
        label={ t('system-settings.form.field.default-error-page') }
        name={ ['documents', 'error_pages', 'localized', locale] }
      >
        <ManyToOneRelation
          allowToClearRelation
          documentsAllowed
        />
      </Form.Item>
    </Card>
  )
}
