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
import { type AbstractObjectLayoutDefinition } from '../../dynamic-type-object-layout-abstract'
import { BaseView } from '../../views/base-view'
import { Iframe as BaseIframe, type IframeRef } from '@Pimcore/components/iframe/iframe'
import { Alert, IconTextButton } from '@sdk/components'
import { useTranslation } from 'react-i18next'
import { useLayoutSelection } from '@Pimcore/modules/data-object/editor/toolbar/context-menu/provider/use-layout-selection'
import { useElementContext } from '@sdk/modules/element'

export interface IframeProps extends AbstractObjectLayoutDefinition {
  iframeUrl: string
  width: number
  height: number
}

export const Iframe = (props: IframeProps): React.JSX.Element => {
  const iframeRef = useRef<IframeRef>(null)
  const { t } = useTranslation();
  const { currentLayout } = useLayoutSelection()
  const { id } = useElementContext();
  let iframeUrl: URL | undefined

  try {
    iframeUrl = new URL(props.iframeUrl)
  } catch {
    iframeUrl = undefined
  }

  if (iframeUrl === undefined) {
    return <Alert message={t('invalid-iframe')} type='error' />
  }

  const context = {
    layoutId: currentLayout,
    name: props.name,
    objectId: id,
  }
  
  iframeUrl.searchParams.append('context', JSON.stringify(context));

  const refreshIframe = () => {
    iframeRef.current?.reload()
  }

  return (
    <BaseView
      title={ props.title }
      border={true}
      contentPadding={'none'}
      // width need to be ignored until sunsetting classic ui
      style={{height: props.height}}
      extra={<>
        <IconTextButton
          icon={{ value: 'refresh' }}
          onClick={refreshIframe}
          type='action'
        >
          {t('refresh')}
        </IconTextButton>
      </>}
    >
      <BaseIframe ref={iframeRef} src={iframeUrl.toString()} style={{width: props.width, height: props.height}} />
    </BaseView>
  )
}
