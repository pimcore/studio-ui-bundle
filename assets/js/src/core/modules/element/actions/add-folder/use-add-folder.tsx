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

import { useTranslation } from 'react-i18next'
import {ElementType} from "types/element-type.d";

export interface AddFolderProps {
  elementType: ElementType
}

export type addFolder = (props: AddFolderProps) => void

export interface UseAddFolderProps {
  elementType: ElementType
}

export interface UseAddFolderHookReturn {
  addFolder: addFolder
}

export const useAddFolder = (props: UseAddFolderProps): UseAddFolderHookReturn => {

  const { t } = useTranslation()

  const addFolder = ({ elementType }: AddFolderProps ): void => {
   /* modal.input({
      title: t('element.tree.context-menu.add-folder'),
      label: t('element.tree.context-menu.add-folder.label'),
      rule: {
        required: true,
        message: t('element.tree.context-menu.add-folder.validation')
      },
      onOk: addElementFolder
    })*/
  }

  return {
    addFolder: addFolder
  }
}
