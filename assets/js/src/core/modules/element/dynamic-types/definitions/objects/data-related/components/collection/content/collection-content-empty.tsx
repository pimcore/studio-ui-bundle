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
import { type CollectionContentBaseProps } from './collection-content'
import { Space } from '@Pimcore/components/space/space'
import { Text } from '@Pimcore/components/text/text'
import { Box } from '@Pimcore/components/box/box'
import { isEmptyValue } from '@Pimcore/utils/type-utils'
import { useTranslation } from 'react-i18next'

interface CollectionEmptyProps extends CollectionContentBaseProps {}

export const CollectionContentEmpty = (props: CollectionEmptyProps): React.JSX.Element => {
  const { addButtonComponent, title, ...baseButtonProps } = props
  const [AddButton, additionalButtonProps] = addButtonComponent
  const { t } = useTranslation()

  const buttonProps = {
    ...baseButtonProps,
    ...additionalButtonProps
  }

  return (
    <Space
      className='w-full'
      direction='vertical'
    >
      <Box>
        <Space>
          { !isEmptyValue(title) && <Text strong>{title}</Text> }
          <AddButton { ...buttonProps } />
        </Space>
      </Box>

      <Box>
        <Text type="secondary">{t('collection.empty')}</Text>
      </Box>
    </Space>
  )
}
