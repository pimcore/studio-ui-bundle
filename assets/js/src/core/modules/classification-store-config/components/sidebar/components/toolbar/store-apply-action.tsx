/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { ImportModal } from '@Pimcore/components/import-modal/import-modal'
import { useMessage } from '@sdk/components'
import { useAppDispatch } from '@Pimcore/app/store'
import { getStoreApplyUrl } from '@Pimcore/modules/classification-store-config/components/store-editor/store-import-export-actions'
import { api } from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice-enhanced'
import { isAllowed } from '@Pimcore/modules/auth/permission-helper'
import { UserPermission } from '@Pimcore/modules/auth/enums/user-permission'

/** Applies an exported store configuration file without a store being open: it creates the store the file describes. */
export const StoreApplyAction = (): React.JSX.Element => {
  const { t } = useTranslation()
  const messageApi = useMessage()
  const dispatch = useAppDispatch()
  const [isOpen, setIsOpen] = useState(false)

  if (!isAllowed(UserPermission.ClassificationStore)) {
    return <></>
  }

  // The one success report: the modal is told not to add its own generic one.
  const handleSuccess = (): void => {
    void messageApi.success(t('classification-store.import-success'))
    setIsOpen(false)
    // The upload posts straight to the endpoint, so nothing invalidates the store list for it.
    dispatch(api.util.invalidateTags(['Classification Store']))
  }

  return (
    <>
      <IconTextButton
        icon={ { value: 'upload-import' } }
        onClick={ () => { setIsOpen(true) } }
        type="link"
      >
        {t('import')}
      </IconTextButton>

      <ImportModal
        accept='.json,application/json'
        acceptMimeTypes={ ['application/json'] }
        action={ getStoreApplyUrl() }
        onOpenChange={ setIsOpen }
        onUploadSuccess={ handleSuccess }
        open={ isOpen }
        showSuccessMessage={ false }
        title={ t('classification-store.import') }
        uploadButtonLabel={ t('import') }
        validateFile={ (file: File) => file.type === 'application/json' || file.name.endsWith('.json') }
      />
    </>
  )
}
