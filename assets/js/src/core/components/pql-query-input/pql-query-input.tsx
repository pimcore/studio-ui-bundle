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
import { Tooltip, Typography } from 'antd'
import { Trans } from 'react-i18next'
import { isObject } from 'lodash'
import { TextArea } from '@Pimcore/components/textarea/textarea'
import { Flex } from '@Pimcore/components/flex/flex'
import { Text } from '@Pimcore/components/text/text'
import { Alert } from '@Pimcore/components/alert/alert'
import { useStyles } from './pql-query-input.styles'
import { Icon } from '../icon/icon'

const PQL_DOCUMENTATION_LINK = 'https://pimcore.com/docs/platform/Generic_Data_Index/Searching_For_Data_In_Index/Pimcore_Query_Language/'

interface IPQLQueryInputProps {
  value: string
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  handleBlur: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  errorData?: FetchBaseQueryError
  isShowError: boolean
}

export const PQLQueryInput = ({ value, handleChange, handleBlur, errorData, isShowError }: IPQLQueryInputProps): React.JSX.Element => {
  const [isShowTooltip, setIsShowTooltip] = useState<boolean>(false)

  const { styles } = useStyles()

  const getDescription = (): string => {
    const error = errorData?.data

    if (error !== null && isObject(error) && 'message' in error) {
      return (error as { message: string }).message
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
            overlayClassName={ styles.tooltip }
            title={ (
              <Typography className={ styles.text }>
                <Trans
                  components={ {
                    anchorPQL: (
                    // eslint-disable-next-line jsx-a11y/anchor-has-content
                      <a
                        className={ styles.link }
                        href={ PQL_DOCUMENTATION_LINK }
                        rel="noopener noreferrer"
                        target="_blank"
                      />)
                  } }
                  i18nKey="component.pql.description"
                />
              </Typography>
            ) }
            trigger="click"
          >
            <Icon
              className={ styles.infoIcon }
              options={ { width: 12, height: 12 } }
              value='help-circle'
            />
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
