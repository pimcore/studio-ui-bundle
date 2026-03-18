/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useRef } from 'react'
import { Button } from '@Pimcore/components/button/button'
import { Flex } from '@Pimcore/components/flex/flex'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { theme } from 'antd'
import { useTranslation } from 'react-i18next'
import { isNil } from 'lodash'

interface BulkImportUploadStepProps {
  selectedFile: File | null
  onFileSelect: (file: File | null) => void
  isPreparing: boolean
}

export const BulkImportUploadStep = ({ selectedFile, onFileSelect, isPreparing }: BulkImportUploadStepProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { token } = theme.useToken()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleBrowseClick = (): void => {
    fileInputRef.current?.click()
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0]
    if (!isNil(file)) {
      onFileSelect(file)
    }
  }

  const handleRemoveFile = (): void => {
    onFileSelect(null)
    if (!isNil(fileInputRef.current)) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <Flex
      gap='small'
      vertical
    >
      <input
        accept='.json,application/json'
        aria-label={ t('bulk-import.browse-files') }
        disabled={ isPreparing }
        onChange={ handleInputChange }
        ref={ fileInputRef }
        style={ { display: 'none' } }
        type='file'
      />

      {isNil(selectedFile)
        ? (
          <Flex
            align='center'
            justify='center'
            style={ { minHeight: 120, border: `1px dashed ${token.colorBorder}`, borderRadius: token.borderRadius, cursor: 'pointer' } }
          >
            <IconTextButton
              icon={ { value: 'upload-import' } }
              onClick={ handleBrowseClick }
              type='dashed'
            >
              {t('bulk-import.browse-files')}
            </IconTextButton>
          </Flex>
          )
        : (
          <Flex
            align='center'
            gap='small'
            style={ { padding: `${token.paddingXS}px`, border: `1px solid ${token.colorBorder}`, borderRadius: token.borderRadius } }
          >
            <span style={ { flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }>
              {selectedFile.name}
            </span>
            <Button
              disabled={ isPreparing }
              onClick={ handleRemoveFile }
              size='small'
              type='text'
            >
              {t('bulk-import.remove-file')}
            </Button>
          </Flex>
          )}
    </Flex>
  )
}
