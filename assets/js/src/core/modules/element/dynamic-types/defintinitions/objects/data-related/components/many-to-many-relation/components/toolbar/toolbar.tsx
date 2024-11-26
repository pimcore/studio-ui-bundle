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
import Search from 'antd/es/input/Search'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Tooltip } from 'antd'
import { Box } from '@Pimcore/components/box/box'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import { useTranslation } from 'react-i18next'

export interface ManyToManyRelationToolbarProps {
  empty: () => void
  onSearch: (value: string) => void
  allowClear: boolean
}

export const ManyToManyRelationToolbar = (props: ManyToManyRelationToolbarProps): React.JSX.Element => {
  const { confirm } = useFormModal()
  const { t } = useTranslation()

  return (
    <Box padding="extra-small">
      <Flex
        align="center"
        gap="extra-small"
        justify="space-between"
      >
        <div>
          { props.allowClear && (
            <Tooltip title={ t('empty') }>
              <IconButton
                icon={ { value: 'trash' } }
                onClick={ () => {
                  confirm({
                    title: t('remove'),
                    content: t('relations.remove-all.confirm'),
                    onOk: props.empty
                  })
                } }
                type="default"
              />
            </Tooltip>
          ) }
        </div>
        <div>
          <Search
            onInput={
            (e: React.ChangeEvent<HTMLInputElement>) => {
              props.onSearch(e.target.value)
            } }
            placeholder={ t('search') }
          />
        </div>
      </Flex>
    </Box>
  )
}
