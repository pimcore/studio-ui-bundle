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

import React, { useEffect, useState } from 'react'
import { Flex } from '@Pimcore/components/flex/flex'
import { useTranslation } from 'react-i18next'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Tooltip } from '@Pimcore/components/tooltip/tooltip'
import {
  LinkModal
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/link/modal'

export interface LinkValue {
  text: string
  target: string
  parameters: string
  anchor: string
  title: string

}

export interface LinkProps {
  availableSites?: number[] | null
  disabled?: boolean
  domainLabelWidth?: number | null
  width?: number | string | null
  value?: LinkValue | null
  onChange?: (value?: LinkValue | null) => void
}

export const Link = (props: LinkProps): React.JSX.Element => {
  const [value, setValue] = useState<LinkValue | null>(props.value ?? null)
  const { t } = useTranslation()
  const [isModalVisible, setIsModalVisible] = useState(false)

  useEffect(() => {
    if (props.onChange !== undefined) {
      props.onChange(value)
    }
  }, [value])

  const showModal = (): void => {
    setIsModalVisible(true)
  }

  const hideModal = (): void => {
    setIsModalVisible(false)
  }

  return (
    <Flex
      align="center"
      gap="extra-small"
    >
      <div>{value?.text ?? '[' + t('link.not-set') + ']'}</div>

      <Tooltip
        key="edit"
        title={ t('edit') }
      >
        <IconButton
          icon={ { value: 'edit' } }
          onClick={ showModal }
          type="default"
        />
      </Tooltip>

      <LinkModal
        onClose={ hideModal }
        onSave={ setValue }
        open={ isModalVisible }
        value={ value }
      />

    </Flex>
  )
}
