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
import { Flex } from '@Pimcore/components/flex/flex'
import { Icon } from '@Pimcore/components/icon/icon'
import { Tooltip } from '@Pimcore/components/tooltip/tooltip'
import { useDataObjectDraft } from '@Pimcore/modules/data-object/hooks/use-data-object-draft'
import { Text } from '@Pimcore/components/text/text'
import { Box } from '@Pimcore/components/box/box'
import { useTranslation } from 'react-i18next'

export interface DraftIndicatorProps {
  id: number
}

export default function DraftIndicator (props: DraftIndicatorProps): React.JSX.Element {
  const { dataObject } = useDataObjectDraft(props.id)
  const { t } = useTranslation()

  // todo: change this as soon as the regular draft logic is implemented
  if (dataObject?.modified !== true) {
    return <></>
  }
  return (
    <Tooltip
      placement="bottomLeft"
      title={ <>{t('detached-tab.draft-tooltip')}<Box padding={ { top: 'normal' } }>{t('detached-tab.draft-tooltip-addon')}</Box></> }
    >
      <Box padding={ { x: 'extra-small' } }>
        <Flex
          align="flex-start"
          gap="mini"
        >
          <Icon value="draft" />
          <Text>Draft</Text>
        </Flex>
      </Box>
    </Tooltip>
  )
}
