/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useState, useMemo } from 'react'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { Tooltip, Typography } from 'antd'
import { Trans, useTranslation } from 'react-i18next'
import { isObject, isNull, isUndefined } from 'lodash'
import { linter, lintGutter, type Diagnostic } from '@codemirror/lint'
import { Flex } from '@Pimcore/components/flex/flex'
import { Text } from '@Pimcore/components/text/text'
import { Alert } from '@Pimcore/components/alert/alert'
import { CodeEditor } from '@Pimcore/components/code-editor/code-editor'
import type { IApiErrorDetails } from '@Pimcore/modules/app/error-handler/types'
import { Icon } from '../icon/icon'
import { useStyles } from './pql-query-input.styles'

const PQL_DOCUMENTATION_LINK = 'https://pimcore.com/docs/platform/Generic_Data_Index/Searching_For_Data_In_Index/Pimcore_Query_Language/'

interface IPQLQueryInputProps {
  value: string
  handleChange: (value: string) => void
  handleBlur?: () => void
  errorData?: FetchBaseQueryError
  isShowError: boolean
}

export const PQLQueryInput = ({ value, handleChange, handleBlur, errorData, isShowError }: IPQLQueryInputProps): React.JSX.Element => {
  const [isShowTooltip, setIsShowTooltip] = useState<boolean>(false)

  const { t } = useTranslation()
  const { styles } = useStyles()

  const getErrorDetails = (): IApiErrorDetails | null => {
    const data = errorData?.data

    if (!isNull(data) && isObject(data)) {
      return data as IApiErrorDetails
    }

    return null
  }

  const getDescription = (): string => {
    return getErrorDetails()?.message ?? t('error.error_something_generic_went_wrong')
  }

  const pqlErrorExtensions = useMemo(() => {
    if (!isShowError) return []

    const errorDetails = getErrorDetails()

    if (isNull(errorDetails)) return []

    const position = errorDetails?.position
    const message = errorDetails?.message ?? t('error.syntax_error')

    const pqlLinter = linter((): Diagnostic[] => {
      if (isUndefined(position)) return []

      const from = position
      const tokenLength = errorDetails?.token?.length ?? 1
      const to = from + tokenLength

      return [{ from, to, severity: 'error', message }]
    })

    return [lintGutter(), pqlLinter]
  }, [isShowError, errorData])

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

      <div className={ isShowError ? styles.editorError : undefined }>
        <CodeEditor
          extensions={ pqlErrorExtensions }
          lineWrapping
          onBlur={ handleBlur }
          onChange={ handleChange }
          placeholder={ t('component.pql.placeholder') }
          value={ value }
        />
      </div>

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
