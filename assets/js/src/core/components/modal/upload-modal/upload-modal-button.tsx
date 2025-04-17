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
import { Tooltip } from 'antd'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { useTranslation } from 'react-i18next'
import { useAlertModal } from '@Pimcore/components/modal/alert-modal/hooks/use-alert-modal'
import { Upload, type UploadProps } from './upload'

export interface UploadModalButtonProps extends UploadProps {
  showMaxItemsError?: boolean
}

export const UploadModalButton = (props: UploadModalButtonProps): React.JSX.Element => {
  const { t } = useTranslation()
  const alertModal = useAlertModal()
  // const [isButtonLoading, setIsButtonLoading] = useState(false)

  if (props.showMaxItemsError === true) {
    return (
      <Tooltip title={ t('upload') }>
        <IconButton
          icon={ { value: 'upload-cloud' } }
          onClick={ () => alertModal.warn({
            content: t('items-limit-reached', { maxItems: props.maxItems ?? 0 })
          }) }
          type="default"
        />
      </Tooltip>
    )
  }

  return (
    <Upload
      { ...props }
      onChange={ (info) => {
      //  setIsButtonLoading(false)
        props.onChange?.(info)
      } }
    >
      <Tooltip title={ t('upload') }>
        <IconButton
          icon={ { value: 'upload-cloud' } }
          onClick={ () => {
          //  setIsButtonLoading(true)
          } }
          type="default"
        />
      </Tooltip>
    </Upload>
  )
}
