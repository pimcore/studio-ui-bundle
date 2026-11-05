/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useItems } from '@Pimcore/modules/field-definitions/components/editor/items/provider'
import { useRefresh } from '@Pimcore/modules/field-definitions/components/editor/items/detail/refresh-provider'
import { type ImportExportConfig, useSettings } from '@Pimcore/modules/field-definitions/components/editor/settings-provider'
import { ButtonGroup, Dropdown, type DropdownMenuProps, Icon, IconTextButton, useMessage } from '@sdk/components'
import { ImportModal } from '@Pimcore/components/import-modal/import-modal'
import { downloadFile } from '@Pimcore/modules/app/utils/download'
import trackError, { ApiError, GeneralError, isApiErrorData } from '@Pimcore/modules/app/error-handler'
import { isNil } from 'lodash'
import React, { useState } from 'react'
import { useAppDispatch } from '@Pimcore/app/store'
import { useTranslation } from 'react-i18next'

const defaultValidateFile = (file: File): boolean => {
  return file.type === 'application/json' || file.name.endsWith('.json')
}

const EXPORT_ACTION = 'export'
const IMPORT_ACTION = 'import'

// RFC 6266: `filename*` carries charset'language'percent-encoded-value, `filename` is either a
// quoted string — which may contain a semicolon — or an unquoted token ending at the next one.
//
// The charset and language classes exclude whitespace so that neither can claim a space the
// `\s*` in front of it could also claim. With the overlap, a header ending after `filename*=`
// gave the engine every way of splitting its trailing spaces between the two, each retried
// against the mandatory `'`, which is quadratic in the length of the header.
const CONTENT_DISPOSITION_EXTENDED = /filename\*\s*=\s*[^';\s]*'[^';\s]*'([^;\s]+)/i
const CONTENT_DISPOSITION_QUOTED = /filename\s*=\s*"((?:[^"\\]|\\.)*)"/i
const CONTENT_DISPOSITION_BARE = /filename\s*=\s*([^;"]+)/i

/** The percent-decoded value, or nothing when the header's encoding is malformed. */
const percentDecoded = (value: string): string | undefined => {
  try {
    return decodeURIComponent(value)
  } catch {
    return undefined
  }
}

/** A name a download can be saved under: its last path segment, or nothing when that is unusable. */
const saveableFilename = (value: string | undefined): string | undefined => {
  if (isNil(value)) {
    return undefined
  }

  const name = value.trim().split(/[/\\]/).pop()?.trim() ?? ''

  return name === '' || name === '.' || name === '..' ? undefined : name
}

/**
 * The name the response asks to be saved under, read per RFC 6266: the extended `filename*`
 * form wins over the plain one wherever each appears in the header, its percent-encoding is
 * decoded, and a quoted name keeps any semicolon that sits inside the quotes. Undefined when
 * the header names nothing a file can be saved under, so the caller's own name is used.
 */
const parseContentDispositionFilename = (header: string): string | undefined => {
  const extended = CONTENT_DISPOSITION_EXTENDED.exec(header)
  const quoted = CONTENT_DISPOSITION_QUOTED.exec(header)
  const bare = CONTENT_DISPOSITION_BARE.exec(header)

  const candidates = [
    isNil(extended) ? undefined : percentDecoded(extended[1]),
    isNil(quoted) ? undefined : quoted[1].replace(/\\(.)/g, '$1'),
    isNil(bare) ? undefined : bare[1]
  ]

  return candidates.map(saveableFilename).find((name) => !isNil(name))
}

/** the name the response asks for, or a deterministic one when it names none */
const getExportFilename = (response: Response, itemId: number | string): string => {
  return parseContentDispositionFilename(response.headers.get('content-disposition') ?? '') ??
    `export-${String(itemId)}.json`
}

/** The refusal the response carries, or the status-carrying message a body that is not JSON gets. */
const getExportRefusal = async (response: Response): Promise<ApiError> => {
  const body = await response.text()

  try {
    return new ApiError({ data: JSON.parse(body) })
  } catch (error) {
    return new ApiError({
      status: 'PARSING_ERROR',
      originalStatus: response.status,
      data: body,
      error: String(error)
    })
  }
}

/** trackError re-throws a GeneralError by design, and a click handler has nothing to catch it. */
const reportExportFailure = (error: any): void => {
  try {
    trackError(isApiErrorData(error) ? new ApiError(error) : new GeneralError(error?.message as string))
  } catch {
    // The error surface has already been shown.
  }
}

/** an action a surface adds beside export and import — rendered the same way they are */
export interface ImportExportExtraAction {
  key: string
  icon: string
  label: string
  inFlight?: boolean
  onClick: () => void
}

export interface ImportExportActionsViewProps {
  config: ImportExportConfig
  itemId: number | string | undefined
  /** called after a successful import, before the configured invalidation is dispatched */
  onImported?: () => void
  /** render both actions as buttons instead of putting them behind the 'More' dropdown */
  inline?: boolean
  /** further actions of the owning surface, shown after export and import */
  extraActions?: ImportExportExtraAction[]
}

/**
 * The export and import actions themselves, free of the field-definitions Editor contexts so
 * that a configuration screen which is not an Editor can render them too.
 */
export const ImportExportActionsView = ({
  config,
  itemId,
  onImported,
  inline = false,
  extraActions = []
}: ImportExportActionsViewProps): React.JSX.Element => {
  const { t } = useTranslation()
  const messageApi = useMessage()
  const dispatch = useAppDispatch()

  const [isImportModalOpen, setIsImportModalOpen] = useState(false)
  const [isExporting, setIsExporting] = useState(false)

  const {
    getExportUrl,
    getImportUrl,
    validateFile = defaultValidateFile,
    acceptFileTypes = '.json,application/json',
    acceptMimeTypes = ['application/json'],
    successMessageKey = 'class-definition.import-success',
    importModalTitleKey = 'class-definition.import',
    getImportInvalidation
  } = config

  const handleExport = async (): Promise<void> => {
    if (isNil(itemId) || isExporting) {
      return
    }

    setIsExporting(true)

    try {
      const response = await fetch(getExportUrl(itemId))

      if (!response.ok) {
        trackError(await getExportRefusal(response))

        return
      }

      downloadFile(getExportFilename(response, itemId), await response.blob())
    } catch (error: any) {
      reportExportFailure(error)
    } finally {
      setIsExporting(false)
    }
  }

  // The one success report: the modal is told not to add its own generic one.
  const handleImportSuccess = (): void => {
    void messageApi.success(t(successMessageKey))
    setIsImportModalOpen(false)
    onImported?.()

    // The upload posts straight to the import URL, so nothing invalidates the cache for it.
    if (!isNil(getImportInvalidation) && !isNil(itemId)) {
      dispatch(getImportInvalidation(itemId))
    }
  }

  const uploadUrl = !isNil(itemId)
    ? getImportUrl(itemId)
    : ''

  // The import's own in-flight state is the modal's: it disables its upload while it posts.
  const actions: ImportExportExtraAction[] = [
    {
      key: EXPORT_ACTION,
      icon: EXPORT_ACTION,
      label: t(EXPORT_ACTION),
      inFlight: isExporting,
      onClick: () => { void handleExport() }
    },
    {
      key: IMPORT_ACTION,
      icon: 'upload-import',
      label: t(IMPORT_ACTION),
      inFlight: false,
      onClick: () => { setIsImportModalOpen(true) }
    },
    ...extraActions
  ]

  const menuItems: DropdownMenuProps['items'] = actions.map(({ key, icon, label, inFlight, onClick }) => ({
    key,
    disabled: inFlight === true,
    icon: <Icon value={ icon } />,
    label,
    onClick
  }))

  return (
    <>
      {inline
        ? (
          <ButtonGroup
            items={ actions.map(({ key, icon, label, inFlight, onClick }) => (
              <IconTextButton
                disabled={ inFlight === true }
                icon={ { value: icon } }
                key={ key }
                loading={ inFlight === true }
                onClick={ onClick }
                type="link"
              >
                {label}
              </IconTextButton>
            )) }
          />
          )
        : (
          <Dropdown menu={ { items: menuItems } }>
            <IconTextButton
              icon={ { value: 'chevron-down' } }
              iconPlacement='right'
              type='link'
            >
              {t('toolbar.more')}
            </IconTextButton>
          </Dropdown>
          )}

      <ImportModal
        accept={ acceptFileTypes }
        acceptMimeTypes={ acceptMimeTypes }
        action={ uploadUrl }
        onOpenChange={ setIsImportModalOpen }
        onUploadSuccess={ handleImportSuccess }
        open={ isImportModalOpen }
        showSuccessMessage={ false }
        title={ t(importModalTitleKey) }
        uploadButtonLabel={ t(IMPORT_ACTION) }
        validateFile={ validateFile }
      />
    </>
  )
}

export const ImportExportActions = (): React.JSX.Element => {
  const { activeConfiguration } = useItems()
  const { importExportConfig } = useSettings()
  const { refreshLayout } = useRefresh()

  if (isNil(importExportConfig)) {
    return <></>
  }

  return (
    <ImportExportActionsView
      config={ importExportConfig }
      itemId={ activeConfiguration?.id }
      onImported={ () => { void refreshLayout() } }
    />
  )
}
