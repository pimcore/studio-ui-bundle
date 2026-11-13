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
import { MatchingId } from '@Pimcore/modules/classification-store-config/components/store-editor/tabs/shared/matching-id'
import { useStoreIdentifier } from '@Pimcore/modules/classification-store-config/hooks/use-store-identifier'

interface IStoreIdentifierProps {
  storeId: number
}

export const StoreIdentifier = ({ storeId }: IStoreIdentifierProps): React.JSX.Element => {
  const { t } = useTranslation()
  const identifier = useStoreIdentifier(storeId)

  if (isNil(identifier)) {
    return <></>
  }

  return (
    <Flex
      align="center"
      gap="mini"
    >
      <Text strong>{t('classification-store.columns.matching-id')}</Text>
      <MatchingId identifier={ identifier } />
    </Flex>
  )
}
