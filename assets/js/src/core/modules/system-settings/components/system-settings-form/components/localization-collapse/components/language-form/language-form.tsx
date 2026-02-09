import { Flex } from "@Pimcore/components/flex/flex"
import { Form } from "@Pimcore/components/form/form"
import { useSystemSettingsContext } from "@Pimcore/modules/system-settings/context/hooks/use-system-settings-context"
import { isNil } from "lodash"
import React, { useMemo } from "react"
import { LanguageCard } from "../language-card/language-card"

export const LanguageForm = (): React.JSX.Element => {
  const { form } = useSystemSettingsContext()
  const validLanguages = Form.useWatch(['general', 'valid_languages'], { form, preserve: true })

  const languageCards = useMemo(() => {
    if (isNil(validLanguages)) {
      return []
    }

    return validLanguages.map((locale: string) => (
      <LanguageCard
        key={locale}
        locale={locale}
      />
    ))
  }, [validLanguages])

  return (
    <Flex
      vertical
      gap="extra-small"
    >
      {languageCards}
    </Flex>
  )
}