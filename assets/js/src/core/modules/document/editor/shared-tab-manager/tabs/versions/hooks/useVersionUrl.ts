/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useEffect, useState } from 'react'
import { isEmpty } from 'lodash'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import { currentDomain } from '@Pimcore/app/config/app-config'
import { useDocumentGetByIdQuery } from '@Pimcore/modules/document/document-api-slice-enhanced'
import { type VersionIdentifiers } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/types/types'

interface IUseVersionUrlProps {
  versionId: VersionIdentifiers['id']
  isSkip?: boolean
}

interface IUseVersionUrlReturn {
  isLoading: boolean
  url: string | null
}

export const useVersionUrl = ({ versionId, isSkip = false }: IUseVersionUrlProps): IUseVersionUrlReturn => {
  const { id } = useElementContext()
  const { data, isLoading } = useDocumentGetByIdQuery({ id }, { skip: isSkip })

  const [versionUrl, setVersionUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!isEmpty(data)) {
      const url = `${currentDomain}${data?.fullPath}?pimcore_version=${versionId}`

      setVersionUrl(url)
    }
  }, [versionId, data])

  return {
    isLoading,
    url: versionUrl
  }
}
