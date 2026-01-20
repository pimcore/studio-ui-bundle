/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDocumentDraft } from '@Pimcore/modules/document/hooks/use-document-draft'
import { useDocumentPreviewUrlProcessor } from '@Pimcore/modules/document/hooks/use-document-url-processor'
import useElementVisible from '@Pimcore/utils/hooks/use-element-visible'
import { Iframe, type IframeRef } from '@Pimcore/components/iframe/iframe'
import { isNil } from 'lodash'
import {ContentLayout} from "@Pimcore/components/content-layout/content-layout";
import {Toolbar} from "@Pimcore/components/toolbar/toolbar";
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { Compact } from '@Pimcore/components/compact/compact'

interface DocumentPreviewProps {
  id: number
}

export const DocumentPreview = ({ id }: DocumentPreviewProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [refreshKey, setRefreshKey] = useState<number>(Date.now())
  const { document } = useDocumentDraft(id)
  const iframeRef = React.useRef<IframeRef>(null)
  const isVisible = useElementVisible(iframeRef.current?.getElementRef(), true)

  useEffect(() => {
    if (isVisible) {
      setRefreshKey(Date.now())
    }
  }, [document?.draftData?.modificationDate, isVisible])

  const previewUrl = useDocumentPreviewUrlProcessor(id, document?.fullPath ?? '', refreshKey)
    console.log('previewUrl', previewUrl);
    if (previewUrl === '' || isNil(document)) {
    return <div>{t('preview.label')}</div>
  }

  return (
      <ContentLayout
          renderToolbar={  (
                  <Toolbar
                      justify="start"
                      theme='secondary'
                  >
                    <Compact>
                        <IconTextButton
                            icon={ { value: 'monitor' } }
                            onClick={ () => {
                                console.log('set iframe size');
                            } }
                            >
                            { t('preview.desktop') }
                        </IconTextButton>
                        <IconTextButton
                            icon={ { value: 'tablet' } }
                            onClick={ () => {
                                console.log('set iframe size');
                            } }
                        >
                            { t('preview.tablet') }
                        </IconTextButton>
                        <IconTextButton
                            icon={ { value: 'phone' } }
                            onClick={ () => {
                                console.log('set iframe size');
                            } }
                        >
                            { t('preview.phone') }
                        </IconTextButton>
                        <IconTextButton
                            icon={ { value: 'phone-horizontal' } }
                            onClick={ () => {
                                console.log('set iframe size');
                            } }
                        >
                            { t('preview.phone-horizontal') }
                        </IconTextButton>
                    </Compact>
                  </Toolbar>
              )
          }
      >
        <Iframe
            ref={ iframeRef }
            src={ previewUrl }
            title={ `${t('preview.label')}-${id}` }
        />
      </ContentLayout>

  )
}
