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
import { type IEditorTab } from '@Pimcore/modules/element/editor/tab-manager/interface/IEditorTab'
import { Icon } from '@Pimcore/components/icon/icon'

export const EditContainer = (): React.JSX.Element => {
  return <>Edit</>
}

export const TAB_EDIT: IEditorTab = {
  key: 'edit',
  label: 'Edit',
  children: <EditContainer />,
  icon: <Icon name={ 'edit' } />,
  isDetachable: true
}
