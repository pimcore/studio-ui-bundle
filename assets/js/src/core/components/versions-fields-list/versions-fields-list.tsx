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

import React from 'react'
import { useTranslation } from 'react-i18next'
import { Flex } from '@Pimcore/components/flex/flex'
import { Text } from '@Pimcore/components/text/text'
import { useStyles } from './versions-fields-list.styles'

interface IVersionsFieldsListProps {
  data: any[]
  versionsList: number[]
}

export const VersionsFieldsList = ({ data, versionsList }: IVersionsFieldsListProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()

  return (
    <Flex>
      <Flex
        className={ styles.headerContainer }
        wrap="wrap"
      >
        {versionsList.map((item, index) => (
          <Flex
            className={ styles.headerItem }
            key={ `${index}-${item}` }
          >
            <Text>{t('version.version')} {item}</Text>
          </Flex>
        ))}
      </Flex>
    </Flex>
  )
}
