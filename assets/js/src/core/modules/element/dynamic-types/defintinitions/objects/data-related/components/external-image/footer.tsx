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
import { Input, Tooltip } from 'antd'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { ButtonGroup } from '@Pimcore/components/button-group/button-group'
import { useTranslation } from 'react-i18next'
import { toCssDimension } from '@Pimcore/utils/css'

interface ExternalImageFooterProps {
  value?: string
  onChange: (value?: string) => void
  inputWidth?: number
  disabled?: boolean
}

export const ExternalImageFooter = (props: ExternalImageFooterProps): React.JSX.Element => {
  const { t } = useTranslation()
  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    props.onChange(e.target.value)
  }

  const emptyValue = (): void => {
    props.onChange(undefined)
  }

  const openUrlDisabled = props.value === '' || props.value === undefined

  const openUrl = (): void => {
    window.open(props.value, '_blank')
  }

  const inputWidth = toCssDimension(props.inputWidth)

  return (
    <Flex
      className="w-full"
      gap="extra-small"
    >
      <Input
        disabled={ props.disabled }
        onChange={ onChange }
        style={ { maxWidth: inputWidth, width: inputWidth } }
        value={ props.value }
      />
      <ButtonGroup
        items={ [
          <Tooltip
            key="external-image-open-url"
            title={ t('open') }
          >
            <IconButton
              disabled={ openUrlDisabled }
              icon={ { value: 'open-folder' } }
              onClick={ openUrl }
            />
          </Tooltip>,
          <Tooltip
            key="external-image-delete"
            title={ t('set-to-null') }
          >
            <IconButton
              disabled={ props.disabled }
              icon={ { value: 'trash' } }
              onClick={ emptyValue }
            />
          </Tooltip>
        ] }
        noSpacing
      />

    </Flex>
  )
}
