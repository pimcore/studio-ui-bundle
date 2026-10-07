/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type ReactNode } from 'react'
import { isString } from 'lodash'
import { useTranslation } from 'react-i18next'
import { Space } from '@Pimcore/components/space/space'
import { Text } from '@Pimcore/components/text/text'
import { Box } from '@Pimcore/components/box/box'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { isEmptyValue } from '@Pimcore/utils/type-utils'
import { translateLabel } from '@Pimcore/utils/translate-label'

export interface ClassificationStoreContentEmptyProps {
  title?: ReactNode
  /** Hides the add button, e.g. when the store is not editable. */
  disallowAdd?: boolean
  onAdd: () => void
}

// Same layout as the empty state of blocks and field collections (see CollectionContentEmpty)
export const ClassificationStoreContentEmpty = ({ title, disallowAdd = false, onAdd }: ClassificationStoreContentEmptyProps): React.JSX.Element => {
  const { t } = useTranslation()
  const translatedTitle = isString(title) ? translateLabel(title) : title

  return (
    <Space
      className='w-full'
      direction='vertical'
    >
      <Box>
        <Space>
          { !isEmptyValue(translatedTitle) && <Text strong>{translatedTitle}</Text> }
          { !disallowAdd && (
            <IconTextButton
              icon={ { value: 'folder-search' } }
              onClick={ onAdd }
            >
              {t('add')}
            </IconTextButton>
          ) }
        </Space>
      </Box>

      <Box>
        <Text type="secondary">{t('collection.empty')}</Text>
      </Box>
    </Space>
  )
}
