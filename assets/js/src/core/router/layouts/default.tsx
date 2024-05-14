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
import { Background } from '@Pimcore/components/background/background'
import { TranslationsLoaderContainer } from '@Pimcore/modules/app/translations/translations-loader-container'
import { BaseLayoutView } from '@Pimcore/modules/app/base-layout/base-layout-view'
import { useMiddleware } from '@Pimcore/components/login-form/hooks/use-middleware'

export default function DefaultLayout (): React.JSX.Element {
  useMiddleware()

  return (
    <>
      <Background />
      <TranslationsLoaderContainer>
        <BaseLayoutView />
      </TranslationsLoaderContainer>
    </>
  )
}
