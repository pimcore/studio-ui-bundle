/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Content } from '@Pimcore/components/content/content'
import { Flex } from '@Pimcore/components/flex/flex'
import { Icon } from '@Pimcore/components/icon/icon'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useStyles } from './missing-context.styles'

export interface IMissingContextProps {
  description: string
}

export default function MissingContext ({ description }: IMissingContextProps): React.JSX.Element {
  const { t } = useTranslation()
  const { styles } = useStyles()

  return (
    <Content centered>
      <Flex
        align='center'
        className={ styles.container }
        gap={ 'small' }
        vertical
      >
        <Flex
          align='center'
          gap={ 'mini' }
        >
          <Icon value='info-circle' />
          <span>{t('widget.missing-context.title')}</span>
        </Flex>

        <div>
          {description}
        </div>
      </Flex>
    </Content>
  )
}
