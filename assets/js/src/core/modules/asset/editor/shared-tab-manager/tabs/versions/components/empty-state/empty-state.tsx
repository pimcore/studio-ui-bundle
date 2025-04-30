/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Flex } from '@Pimcore/components/flex/flex'
import { Text } from '@Pimcore/components/text/text'
import { Button } from '@Pimcore/components/button/button'
import { getPrefix } from '@Pimcore/app/api/pimcore/route'
import { saveFileLocal } from '@Pimcore/utils/files'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'

export const EmptyState = ({ id, fileName }: { id?: number, fileName?: string }): React.JSX.Element => {
  const [isLoading, setIsLoading] = useState(false)

  const { t } = useTranslation()

  const handleDownloadVersionAsset = async (): Promise<void> => {
    setIsLoading(true)

    fetch(`${getPrefix()}/versions/${id}/asset/download`)
      .then(async (response) => await response.blob())
      .then((imageBlob) => {
        const imageURL = URL.createObjectURL(imageBlob)

        saveFileLocal(imageURL, fileName)

        setIsLoading(false)
      })
      .catch(() => {
        trackError(new GeneralError('Error downloading version asset'))
        setIsLoading(false)
      })
  }

  return (
    <Flex
      align="center"
      gap="extra-small"
      vertical
    >
      <Text>{t('version.no-preview-available')}</Text>
      <Button
        loading={ isLoading }
        onClick={ handleDownloadVersionAsset }
      >{t('download')}</Button>
    </Flex>
  )
}
