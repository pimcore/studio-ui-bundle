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

import React, { useState } from 'react'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { Tooltip } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { Flex } from '@Pimcore/components/flex/flex'
import { Text } from '@Pimcore/components/text/text'
import { Alert } from '@Pimcore/components/alert/alert'
import { isObject } from '@Pimcore/utils/type-utils'
import { useStyles } from './pql-query-input.styles'

const PQL_DOCUMENTATION_LINK = 'https://pimcore.com/docs/platform/Generic_Data_Index/Searching_For_Data_In_Index/Pimcore_Query_Language/'

interface IPQLQueryInputProps {
  value: string
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  handleBlur: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  error?: FetchBaseQueryError
  isShowError: boolean
}

export const PQLQueryInput = ({ value, handleChange, handleBlur, error, isShowError }: IPQLQueryInputProps): React.JSX.Element => {
  const [isShowTooltip, setIsShowTooltip] = useState<boolean>(false)

  const { styles } = useStyles()

  const getDescription = (): string => {
    if (error?.data !== null && isObject(error?.data) && 'message' in (error?.data as object)) {
      return (error?.data as { message: string }).message
    }

    return 'Something went wrong.'
  }

  return (
    <Flex
      gap='extra-small'
      vertical
    >
      <Flex gap='mini'>
        <Text>PQL Query</Text>
        <div>
          <Tooltip
            onOpenChange={ () => { setIsShowTooltip(!isShowTooltip) } }
            open={ isShowTooltip }
            title={ (
              <a
                className={ styles.link }
                href={ PQL_DOCUMENTATION_LINK }
                rel="noreferrer"
                target="_blank"
              >
                {PQL_DOCUMENTATION_LINK}
              </a>
                ) }
            trigger="click"
          >
            <QuestionCircleOutlined className={ styles.infoIcon } />
          </Tooltip>
        </div>
      </Flex>
      <TextArea
        allowClear
        onBlur={ handleBlur }
        onChange={ handleChange }
        placeholder='Type your Query'
        style={ { height: '150px' } }
        value={ value }
      />
      {isShowError && (
        <Alert
          banner
          description={ getDescription() }
          showIcon
          type="error"
        />
      )}
    </Flex>
  )
}
