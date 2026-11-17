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
import { isNil } from 'lodash'
import { Flex } from '@Pimcore/components/flex/flex'
import { Text } from '@Pimcore/components/text/text'
import { useStoreEngine } from '@Pimcore/modules/classification-store-config/hooks/use-store-engine'

interface IStoreEngineIndicatorProps {
  storeId: number
}

const EAV_ENGINE = 'eav'

export const StoreEngineIndicator = ({ storeId }: IStoreEngineIndicatorProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { engine } = useStoreEngine(storeId)

  if (isNil(engine)) {
    return <></>
  }

  const engineName = t('classification-store.engine.' + engine.toLowerCase(), { defaultValue: engine })

  return (
    <Flex
      align="center"
      gap="small"
    >
      <Text strong>{t('classification-store.engine.label', { engine: engineName })}</Text>
      {engine.toLowerCase() === EAV_ENGINE && (
        <Text type="secondary">{t('classification-store.engine.eav-hint')}</Text>
      )}
    </Flex>
  )
}
