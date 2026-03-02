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
import { Form } from '@Pimcore/components/form/form'
import { useSystemSettingsContext } from '@Pimcore/modules/system-settings/context/hooks/use-system-settings-context'
import { isNil } from 'lodash'
import React, { useMemo } from 'react'
import { LanguageCard } from '../language-card/language-card'

export const LanguageForm = (): React.JSX.Element => {
  const { form } = useSystemSettingsContext()
  const validLanguages = Form.useWatch(['general', 'valid_languages'], { form, preserve: true })

  const languageCards = useMemo(() => {
    if (isNil(validLanguages)) {
      return []
    }

    return validLanguages.map((locale: string) => (
      <LanguageCard
        key={ locale }
        locale={ locale }
      />
    ))
  }, [validLanguages])

  return (
    <Flex
      gap="extra-small"
      vertical
    >
      {languageCards}
    </Flex>
  )
}
