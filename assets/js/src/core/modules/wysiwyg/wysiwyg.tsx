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
import { type WysiwygProps } from './interface/wysiwyg'
import { useInjection } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'

export const Wysiwyg = (props: WysiwygProps): React.JSX.Element => {
  const WysiwygEditor = useInjection<React.ComponentType<WysiwygProps>>(serviceIds.wysiwyg)

  return (
    <WysiwygEditor
      { ...props }
    />
  )
}

export default Wysiwyg
