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

import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Flex } from '@Pimcore/components/flex/flex'
import { Text } from '@Pimcore/components/text/text'
import { Button } from '@Pimcore/components/button/button'
import { getPrefix } from '@Pimcore/app/api/pimcore/route'
import { saveFileLocal } from '@Pimcore/utils/files'

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
      .catch((err) => {
        console.error(err)

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
