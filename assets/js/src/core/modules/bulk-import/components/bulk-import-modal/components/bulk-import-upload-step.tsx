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
import { useTranslation } from 'react-i18next'
import { isNil } from 'lodash'
import { useStyles } from './bulk-import-upload-step.styles'

interface BulkImportUploadStepProps {
  selectedFile: File | null
  onFileSelect: (file: File | null) => void
  isPreparing: boolean
}

export const BulkImportUploadStep = ({ selectedFile, onFileSelect, isPreparing }: BulkImportUploadStepProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()
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
        className={ styles.fileInput }
        disabled={ isPreparing }
        onChange={ handleInputChange }
        ref={ fileInputRef }
        type='file'
      />

      {isNil(selectedFile)
        ? (
          <Flex
            align='center'
            className={ styles.dropZone }
            justify='center'
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
            className={ styles.selectedFileRow }
            gap='small'
          >
            <span className={ styles.fileName }>
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
