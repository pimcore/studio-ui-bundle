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
import { isNull } from 'lodash'
import { Flex } from '@Pimcore/components/flex/flex'
import { Text } from '@Pimcore/components/text/text'
import { Iframe } from '@Pimcore/components/iframe/iframe'
import useElementResize from '@Pimcore/utils/hooks/use-element-resize'
import { useStyles } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/components/versions-fields-list/versions-fields-list.styles'
import { VERSIONS_CONTENT_VIEW_ID } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/versions-view'

interface IDocumentVersionsViewProps {
  versionsIdList: number[]
  versionUrl: string | null
}

export const DocumentVersionsView = ({ versionsIdList, versionUrl }: IDocumentVersionsViewProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()

  const { height } = useElementResize(VERSIONS_CONTENT_VIEW_ID)

  return (
    <Flex
      style={ { height } }
      vertical
    >
      <Flex
        className={ styles.headerContainer }
        wrap="wrap"
      >
        {versionsIdList.map((versionId, index) => (
          <Flex
            className={ styles.headerItem }
            key={ `${index}-${versionId}` }
          >
            <Text>{t('version.version')} {versionId}</Text>
          </Flex>
        ))}
      </Flex>
      <Flex
        className={ styles.content }
        flex={ 1 }
      >
        {!isNull(versionUrl) && <Iframe src={ versionUrl } />}
      </Flex>
    </Flex>
  )
}
