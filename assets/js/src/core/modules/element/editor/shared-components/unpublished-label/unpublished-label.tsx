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
import { Text } from '@Pimcore/components/text/text'
import { Flex } from '@Pimcore/components/flex/flex'
import { Icon } from '@Pimcore/components/icon/icon'

export interface UnpublishedLabelProps {
  published?: boolean
}

/**
 * Names the unpublished state of the open element next to its save buttons, with the same "eye-off"
 * icon the tree and the editor tab show. It is a flex item of the toolbar, which spaces it like the
 * buttons; icon and text share the secondary text color, which keeps them subordinate to the buttons.
 */
export const UnpublishedLabel = ({ published }: UnpublishedLabelProps): React.JSX.Element => {
  const { t } = useTranslation()

  if (published !== false) {
    return <></>
  }

  return (
    <Flex
      align='center'
      data-testid='element-editor-unpublished-label'
      gap='mini'
    >
      <Icon
        colorToken='colorTextSecondary'
        options={ { width: 14, height: 14 } }
        value='eye-off'
      />
      <Text type='secondary'>
        {t('element.state.unpublished')}
      </Text>
    </Flex>
  )
}
